import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { AuthProvider } from '../context/auth';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// import { FirebaseApp, getApp } from 'firebase/app';
import '../utils/firebase/init'; //Initialize FirebaseApp

function MyApp({ Component, pageProps }: AppProps) {

  const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
  });

  return (
    <ChakraProvider
    theme={extendTheme({
      fonts: {
        heading: 'Ubuntu, Kiwi_Maru, sans-serif;',
        body: 'Ubuntu, Kiwi_Maru, sans-serif;',
      },
    })}
    >
      <AuthProvider>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </AuthProvider>
    </ChakraProvider>
  )

}

export default MyApp