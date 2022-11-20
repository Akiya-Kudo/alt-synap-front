import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { AuthProvider } from '../context/auth';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// import { FirebaseApp, getApp } from 'firebase/app';
import '../utils/firebase/init'; //Initialize FirebaseApp

function MyApp({ Component, pageProps }: AppProps) {

  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
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
      <ApolloProvider client={client}>
        <AuthProvider >
          <Component {...pageProps} />
        </AuthProvider>
      </ApolloProvider>
    </ChakraProvider>
  )

}

export default MyApp