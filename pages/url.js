import React from "react";
import Link from "next/link";
import {
  Flex,
  Heading,
  Input,
  Button,
  useColorMode,
  useColorModeValue,
  ColorModeScript,
  EmailIcon,
  Menu,
  MenuButton,
  HamburgerIcon,
  IconButton,
  MenuList,
  MenuItem,
  AddIcon,
  ExternalLinkIcon,
  RepeatIcon,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";

export default function Login() {
  const formBackground = useColorModeValue("gray.100", "gray.700");
  return (
    <Flex
      height="100vh"
      align="center"
      justifyContent="center"
      direction="column"
    >
      <Flex>
      

      <Link href="/">   
        <Button rounded={"full"} ml={3} px={6} mb={6}> Home </Button>
      </Link> 


        
        <Button rounded={"full"} ml={3} px={6} mb={6}> Logout </Button>

        <Button
                colorScheme={'green'}
                bg={'green.400'}
                rounded={'full'}
                ml={3}
                px={6}
                _hover={{
                  bg: 'green.500',
                }}>
                Add URL
              </Button>
      
      </Flex>

      <Flex
        direction="column"
        backgroundColor={formBackground}
        p={12}
        rouded={6}
        mb={2}
        w="80%"
      >
        <Heading mb={6}>Add URL</Heading>
        <Input
          placeholder="https://www.facebook.com/"
          variant="flushed"
          mb={3}
          type="text"
        />
        <Button colorScheme="teal">Save</Button>
      </Flex>

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
              <Th>DELETE</Th>
              <Th>CLICK</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td>
                <Button
                  leftIcon={<DeleteIcon />}
                  backgroundColor="red.300"
                  variant="solid"
                ></Button>
              </Td>
              <Td>0</Td>
            </Tr>
          </Tbody>
        </Table>
      </Flex>
    </Flex>
  );
}
