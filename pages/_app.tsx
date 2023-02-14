import '../style/global/globals.css'
import type { AppProps } from 'next/app'

import { AuthProvider } from '../util/hooks/auth';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// import { FirebaseApp, getApp } from 'firebase/app';
import '../util/firebase/init'; //Initialize FirebaseApp
import { useState } from 'react';

// カラー振り分け 100/バックグラウンド 200/ハイライト 300/シャドー 400/メインフォントカラー 500/メインアクセントカラー 600/サブアクセントカラー1 700/サブアクセントカラー２
const color_template1 = {
  100: "#4db96f",
  200: "#ff0000",
  300: "#ff0000",
  400: "#ff0000",
  500: "#ff0000",
  600: "#ff0000",
  700: "#ff0000",
  800: "#ff0000",
  900: "#ff0000",
}


function MyApp({ Component, pageProps }: AppProps) {

  const [color_temp, setColor_temp] = useState(color_template1)

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
      colors: {
        tipsy: color_temp
      }
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