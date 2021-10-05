import '../styles/globals.css'
import { ChakraProvider, extendTheme, useToast } from "@chakra-ui/react"
import theme from "./theme"
import AuthContext from '../context/AuthContext';
import jstDecode from 'jwt-decode';
import { setToken, getToken, removeToken } from "../api/token";
import React, {useState, useEffect, useMemo} from 'react';
import { useRouter  } from "next/router"

function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState(undefined);
  const [reloadUser, setReloadUser] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    const token = getToken();
    if(token) {
      setAuth( {
        token,
        idUser: jstDecode(token).id
      });
    } else {
      setAuth(null);
    }
    setReloadUser(false);
  }, [reloadUser])


  const login = (token) => {
    setToken(token)
    setAuth( {
      token,
      idUser: jstDecode(token).id
    });
  }

  const logout = () => {
    if(auth) {
      console.log("1")
      removeToken();
      setAuth(null);
      //toast.success(`Adios !!`);
      console.log("2")
      router.push('/');
      console.log("3")
    }
  }

  const authData = useMemo(
    () => ({
        auth,
        login,
        logout,
        setReloadUser,
    }), [auth]
  )

  if(auth === undefined) {
    return null;
  }

  return (
    <AuthContext.Provider value={authData}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthContext.Provider>
  )
}

export default MyApp
