import {
  Flex,
  Input,
  Button,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "../../hooks/useAuth";
import { changePassword } from "../../api/user";

export default function index({ setShowCPasssword }) {
  const formBackground = useColorModeValue("gray.100", "gray.600");
  const { auth } = useAuth();
  const toast = useToast();
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData, { resetForm }) => {
      if (formData.mypassword !== formData.repeatedPassword) {
        toast({
          title: "the passwords are different",
          status: "error",
          position: "top-left",
          isClosable: true,
          duration: 1000,
        });
        resetForm({ values: "" });
        return null;
      }

      const response = await changePassword(formData.mypassword, auth.idUser);
      if (!response.success) {
        toast({
          title: response.error,
          status: "error",
          position: "top-left",
          isClosable: true,
          duration: 1000,
        });
        return null;
      } else {
        toast({
          title: `The password has been changed correctly`,
          status: "success",
          position: "top-left",
          isClosable: true,
          duration: 1000,
        });
      }
      resetForm({ values: "" });
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
      w="90%"
      align="center"
      justifyContent="center"
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
            isInvalid={formik.errors.mypassword}
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
            isInvalid={formik.errors.repeatedPassword}
            value={formik.values.repeatedPassword}
            name="repeatedPassword"
          />

          <Button colorScheme="teal" type="submit">
            Change your password
          </Button>
        </form>
      </Flex>
    </Flex>
  );
}

function initialValues() {
  return {
    mypassword: "",
    repeatedPassword: "",
  };
}

function validationSchema() {
  return {
    mypassword: Yup.string().required(true).min(8),
    repeatedPassword: Yup.string().required(true).min(8),
  };
}
