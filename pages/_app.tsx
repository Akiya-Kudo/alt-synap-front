import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ChakraProvider
    theme={extendTheme({
      fonts: {
        heading: 'Ubuntu, sans-serif;',
        body: 'Ubuntu, sans-serif;',
      },
    })}
    >
      <Component {...pageProps} />
    </ChakraProvider>
  )

}

export default MyApp
