import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Flex,
  Input,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function index({setShowCPasssword}) {
    const formBackground = useColorModeValue("gray.100", "gray.600");

    const formik = useFormik({
      initialValues: initialValues(),
      validationSchema: Yup.object(validationSchema()),
      onSubmit: async (formData, { resetForm }) => {
        // alert("1")
        // const response = await changePassword(formData);
        // if (!response) {
        //   toast({
        //     title: `Error at create url`,
        //     status: "error",
        //     position: "top-left",
        //     isClosable: true,
        //     duration: 1000,
        //   });
        // } else {
        //   toast({
        //     title: `Has been created successfully`,
        //     status: "success",
        //     position: "top-left",
        //     isClosable: true,
        //     duration: 1000,
        //   });
        //   setUpdateUrl(true);
        //   
        // }
        // resetForm({ values: "" });
        setShowCPasssword(false);
      },
    });

    return (
        <Flex
            direction="column"
            backgroundColor={formBackground}
            p={12}
            rouded={6}
            mb={2}
            w="80%"
            align="center" justifyContent="center"
            
          >
            <Flex w="50%" flexDirection="column">
            <form onSubmit={formik.handleSubmit}>
                  <Input
                      placeholder="*****"
                      variant="flushed"
                      mb={3}
                      type="password"
                      required
                      onChange={formik.handleChange}
                      // error={formik.errors.password2}
                      value={formik.values.mypassword}
                      name="mypassword"
                    />

                      <Input
                      placeholder="*****"
                      variant="flushed"
                      mb={3}
                      type="password"
                      required
                      onChange={formik.handleChange}
                      // error={formik.errors.password2}
                      value={formik.values.repeatedPassword}
                      name="repeatedPassword"
                    />

                    <Button colorScheme="teal" type="submit">
                      Change your password
                    </Button>
              </form>
            </Flex>
          </Flex>
    )
}

function initialValues() {
  return {
    mypassword: "",
    repeatedPassword: "",
  };
}

function validationSchema() {
  return {
    mypassword: Yup.string().required(true),
    repeatedPassword: Yup.string().required(true),
  };
}
