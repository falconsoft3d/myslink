import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Flex,
  Heading,
  useToast,
  Input,
  Button,
  useColorMode,
  useColorModeValue,
  Link as LinkChakara,
  IconButton,
  Spinner,
  Tooltip,
  CustomCard
} from "@chakra-ui/react";
import { DeleteIcon, MoonIcon } from "@chakra-ui/icons";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { getMyUrlFromApi, deleteUrl, addUrl } from "../api/url";
import { map } from "lodash";
import { useFormik } from "formik";
import * as Yup from "yup";
import ChangePassword from "../components/ChangePassword";
import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";

export default function Dashboard() {
  const router = useRouter();
  const { logout, auth, setReloadUser } = useAuth();
  const [user, setUser] = useState(undefined);

  const toast = useToast();
  const [myUrls, setMyUrls] = useState([]);
  const [updateUrl, setUpdateUrl] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showCPasssword, setShowCPasssword] = useState(false);
  const { toggleColorMode } = useColorMode();


  if (!auth) {
    router.push("/");
    return null;
  }
  
  useEffect(() => {
    (async () => {
      const response = await getMyUrlFromApi(auth.idUser);
      setMyUrls(response);
      setUpdateUrl(false);
    })();
  }, [updateUrl,auth.idUser]);

  const formBackground = useColorModeValue("gray.100", "gray.700");


  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData, { resetForm }) => {
      formData.userId = auth.idUser
      const response = await addUrl(formData);
      if (!response.success) {
        toast({
          title: "Error",
          status: "error",
          position: "top-left",
          isClosable: true,
          duration: 1000,
        });
      } else {
        toast({
          title: `Has been created successfully`,
          status: "success",
          position: "top-left",
          isClosable: true,
          duration: 1000,
        });
        setUpdateUrl(true);
        resetForm({ values: "" });
      }
      setShowAdd(false);
    },
  });


  
  

  const DeteleItem = async (id) => {
    await deleteUrl(id);
    setUpdateUrl(true);
  };

  const FunShowCPasssword = () => {
    setShowCPasssword(!showCPasssword);
  };

  const FshowAdd = () => {
    setShowAdd(!showAdd);
  };

  const FUpdate = () => {
    setUpdateUrl(true);
  };



  

  

  return (
    <Flex align="center" justifyContent="center" direction="column" mt={10}>
      <Flex>
        <Link href="/" passHref>
          <Button rounded={"full"} ml={3} px={6} mb={6}>
            {" "}
            Home{" "}
          </Button>
        </Link>

        <Button
          onClick={() => FUpdate()}
          rounded={"full"}
          ml={3}
          px={6}
          _hover={{
            bg: "green.500",
          }}
        >
          UPDATE
        </Button>

        <Button
          onClick={() => FunShowCPasssword()}
          rounded={"full"}
          ml={3}
          px={6}
          _hover={{
            bg: "green.500",
          }}
        >
          CHANGE PASSWORD
        </Button>

        <IconButton
          ml={3}
          px={6}
          _hover={{
            bg: "green.500",
          }}
          onClick={toggleColorMode}
          icon={<MoonIcon />}
        />

        <Button
          onClick={() => FshowAdd()}
          colorScheme={"green"}
          bg={"green.400"}
          rounded={"full"}
          ml={3}
          px={6}
          _hover={{
            bg: "green.500",
          }}
        >
          Add URL
        </Button>

      </Flex>
    
      {showCPasssword && <ChangePassword setShowCPasssword={setShowCPasssword}/> }


      {showAdd && (
        <>
          <Flex
            direction="column"
            backgroundColor={formBackground}
            p={12}
            rouded={6}
            mb={2}
            w="90%"
          >
            <Heading mb={6}>Add URL</Heading>
            <form onSubmit={formik.handleSubmit}>
              <Input
                placeholder="https://www.marlonfalcon.com/"
                variant="flushed"
                mb={3}
                type="text"
                // required
                onChange={formik.handleChange}
                value={formik.values.url}
                isInvalid={formik.errors.url}
                name="url"

              />


              <Button colorScheme="teal" type="submit">
                Save
              </Button>
            </form>
          </Flex>
        </>
      )}

      <Flex height="10" backgroundColor="gray.500" w="90%" align="center" justifyContent="center"> <strong>Links:</strong> {myUrls.length} </Flex>
      <Flex
        direction="column"
        backgroundColor={formBackground}
        p={12}
        rouded={6}
        w="90%"
      >
        
        {!myUrls ? <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            /> : null}

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th width={10} >URL</Th>
              <Th>Short URL</Th>
              <Th>CLICK</Th>
              <Th>DELETE</Th>
            </Tr>
          </Thead>
          <Tbody>
            {map(myUrls, (item) => (
              <Tr key={item._id}>
                <Td width={10}  className="td200">
                  <LinkChakara href={item.url}  color="teal.500" className="linkm">{item.url}</LinkChakara>
                </Td>
                <Td>
             
                  <LinkChakara color="teal.500" 
                  
                  onClick={() => {navigator.clipboard.writeText( process.env.URL_SERVER + "/" + item.shortened  )}}
                   className="linkm" target='_blank'>
        
                    {item.shortened}
               
                  </LinkChakara>
                </Td>
                <Td>{item.clicks}</Td>
                <Td>
                  <Button
                    onClick={() => DeteleItem(item._id)}
                    leftIcon={<DeleteIcon />}
                    backgroundColor="red.300"
                    variant="solid"
                  ></Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        
                
      </Flex>
      
      <Flex mt={10}>
        <LinkChakara href="http://www.myslink.xyz" color="teal.500" className="linkm">www.myslink.xyz</LinkChakara>
      </Flex>
    </Flex>
  );
}

function initialValues() {
  return {
    url: "",
  };
}

function validationSchema() {
  return {
    url: Yup.string().required(true).url(),
  };
}
