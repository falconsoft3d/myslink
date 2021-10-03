import '../styles/globals.css'
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import theme from "./theme"

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
