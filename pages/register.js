import React from 'react'
import {Flex, Heading, Input, Button} from "@chakra-ui/react"

export default function Register() {
    const formBackground = useColorModeValue("gray.100", "gray.700");
    return (
        <Flex height="100vh" align="center" justifyContent="center">
          <Flex direction="column" backgroundColor={formBackground} p={12} rouded={6}>
              <Heading mb={6}>Register</Heading>
              <Input placeholder="demo@demo.cl" variant="flushed" mb={3} type="email" />
              <Input placeholder="********" variant="flushed" mb={6} type="passsword" />
              <Input placeholder="********" variant="flushed" mb={6} type="passsword" />
            <Button colorScheme="teal">Login</Button>
        </Flex>
    </Flex>
    )
}
