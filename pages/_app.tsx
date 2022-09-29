import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { AuthProvider } from '../context/auth';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import { FirebaseApp, getApp } from 'firebase/app';
import '../utils/firebase/init'; //Initialize FirebaseApp

const app: FirebaseApp = getApp()

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
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  )

}

export default MyApp

{/* <li>name = {app.name}</li>
<li>appId = {app.options.appId}</li>
<li>apiKey = {app.options.apiKey}</li> */}