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
} from "@chakra-ui/react";
import { DeleteIcon, MoonIcon } from "@chakra-ui/icons";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { getMyUrlFromApi, deleteUrl, addUrl } from "../api/url";
import { map } from "lodash";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Dashboard() {
  const toast = useToast();
  const [myUrls, setMyUrls] = useState([]);
  const [updateUrl, setUpdateUrl] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const { toggleColorMode } = useColorMode();

  useEffect(() => {
    (async () => {
      const response = await getMyUrlFromApi(6);
      setMyUrls(response || []);
      setUpdateUrl(false);
    })();
  }, [updateUrl]);

  const DeteleItem = async (id) => {
    await deleteUrl(id);
    setUpdateUrl(true);
  };

  const FshowAdd = () => {
    setShowAdd(!showAdd);
  };

  const FUpdate = () => {
    setUpdateUrl(true);
  };



  const formBackground = useColorModeValue("gray.100", "gray.700");

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData, { resetForm }) => {
      const response = await addUrl(formData);
      if (!response) {
        toast({
          title: `Error at create url`,
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

  return (
    <Flex align="center" justifyContent="center" direction="column" mt={10}>
      <Flex>
        <Link href="/">
          <Button rounded={"full"} ml={3} px={6} mb={6}>
            {" "}
            Home{" "}
          </Button>
        </Link>

        <Button rounded={"full"} ml={3} px={6} mb={6}>
          {" "}
          Logout{" "}
        </Button>

        

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
          rounded={"full"}
          ml={3}
          px={6}
          _hover={{
            bg: "green.500",
          }}
          leftIcon={<MoonIcon />}
        >
          Mode
        </Button>

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

      {showAdd && (
        <>
          <Flex
            direction="column"
            backgroundColor={formBackground}
            p={12}
            rouded={6}
            mb={2}
            w="80%"
          >
            <Heading mb={6}>Add URL</Heading>
            <form onSubmit={formik.handleSubmit}>
              <Input
                placeholder="https://www.facebook.com/"
                variant="flushed"
                mb={3}
                type="text"
                required
                onChange={formik.handleChange}
                // error={formik.errors.url}
                value={formik.values.url}
                name="url"
              />
              <Button colorScheme="teal" type="submit">
                Save
              </Button>
            </form>
          </Flex>
        </>
      )}

      <Flex
        direction="column"
        backgroundColor={formBackground}
        p={12}
        rouded={6}
        w="80%"
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>URL</Th>
              <Th>Short URL</Th>
              <Th>CLICK</Th>
              <Th>DELETE</Th>
            </Tr>
          </Thead>
          <Tbody>
            {map(myUrls, (item) => (
              <Tr key={item._id}>
                <Td>
                  <Link href={item.url}>{item.url}</Link>
                </Td>
                <Td>
                  <Link href={`http://localhost:3000/${item.shortened}`}>
                    {item.shortened}
                  </Link>
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
    </Flex>
  );
}

function initialValues() {
  return {
    getMyUrlFromApi: "",
  };
}

function validationSchema() {
  return {
    url: Yup.string().required(true),
  };
}
