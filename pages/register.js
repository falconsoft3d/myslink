import React from "react";
import Link from "next/link";
import {
  Flex,
  Heading,
  useToast,
  Input,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { addUser } from "../api/user";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from 'next/router'

export default function Register() {
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const toast = useToast();
  const router = useRouter();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData, { resetForm }) => {
      if (formData.userPassword !== formData.userRepeatPassword) {
        toast({
          title: `The password are not the same`,
          status: "error",
          position: "top-left",
          isClosable: true,
          duration: 1000,
        });
      } else {
        const response = await addUser(formData);
        if (!response) {
          toast({
            title: `Error at create user`,
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
          router.push("/dashboard");
        }
      }

      resetForm({ values: "" });
    },
  });

  return (
    <Flex height="100vh" align="center" justifyContent="center">
      <form onSubmit={formik.handleSubmit}>
        <Flex
          direction="column"
          backgroundColor={formBackground}
          p={12}
          rouded={6}
        >
          <Heading mb={6}>Register</Heading>

          <Input
            placeholder="demo@demo.cl"
            variant="flushed"
            mb={3}
            type="email"
            onChange={formik.handleChange}
            value={formik.values.userEmail}
            name="userEmail"
          />
          <Input
            placeholder="********"
            variant="flushed"
            mb={6}
            type="password"
            onChange={formik.handleChange}
            value={formik.values.userPassword}
            name="userPassword"
          />
          <Input
            placeholder="********"
            variant="flushed"
            mb={6}
            type="password"
            onChange={formik.handleChange}
            value={formik.values.userRepeatPassword}
            name="userRepeatPassword"
          />
          <Button colorScheme="teal" type="submit">
            Register
          </Button>

          <Flex align="center" justifyContent="center" mt={2}>
            <Link href="/">Home</Link> / <Link href="/login">Login</Link>
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
}

function initialValues() {
  return {
    userEmail: "",
    userPassword: "",
    userRepeatPassword: "",
  };
}

function validationSchema() {
  return {
    userEmail: Yup.string().required(true),
    userPassword: Yup.string().required(true),
    userRepeatPassword: Yup.string().required(true),
  };
}
