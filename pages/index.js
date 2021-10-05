import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import theme from "./theme"
import React, { useState, useEffect } from "react";

import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Flex
} from '@chakra-ui/react';
import Link from "next/link";
import useAuth from "../hooks/useAuth";

export default function Home() {
  const { logout, auth, setReloadUser } = useAuth();
  const [user, setUser] = useState(undefined);
  return ( 
    <>
      <Head>
        <title>myslink: url shortener</title>
        <meta name="description" content="url shortener" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Register your URL <br />
            <Text as={'span'} color={'green.400'}>
            myslink.xyz
            </Text>
          </Heading>
          <Text color={'gray.500'}>
              With this app you can shorten your URLs, You can cooperate in github in this link.  <Link href="https://github.com/falconsoft3d/myslink.xyz">github.com/falconsoft3d/myslink.xyz</Link>
          </Text>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>

            <Flex>

       


            {!auth && (
              <>
            <Link href="/login">  
              <Button
                colorScheme={'green'}
                bg={'green.400'}
                rounded={'full'}
                px={6}
                _hover={{
                  bg: 'green.500',
                }}>
                Login
              </Button>
            </Link>

            
            
            

            
              <Link href="/register">
                <Button
                  colorScheme={'green'}
                  bg={'green.200'}
                  rounded={'full'}
                  ml={3}
                  px={6}
                  _hover={{
                    bg: 'green.100',
                  }}>
                  Register
                </Button>
              </Link>
           
           </>
            ) }
            
        {auth  && (
          <>
            <Link href="/dashboard">
            <Button 
              rounded={'full'}
              ml={3}
              px={6}
              colorScheme={"green"}
              bg={"green.400"}
              >
               Urls
            </Button>
            </Link> 
            
            <Button rounded={"full"} ml={3} px={6} mb={6} onClick={logout} >
            {" "}
            Logout{" "}
          </Button>

           </> 
            )}
            
            </Flex>  
            <Flex>  
              <Text color={'gray.500'} mr={2}>Marlon Falcon Hernández</Text>
              <Link href="http://www.marlonfalcon.com"> 
                  <a>www.marlonfalcon.com</a>  
              </Link>
            </Flex>

            <Flex>
              <Image src="/qr.png"  width="100" height="100" />
            </Flex>  
          </Stack>
        </Stack>
      </Container>
    </>
    )
  }
