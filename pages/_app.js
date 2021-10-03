import '../styles/globals.css'
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import theme from "./theme"

// const theme = extendTheme({
//   config: {
//     useSystemColorMode: true,
//     initialColorMode: "dark"
//   }
// });


function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
