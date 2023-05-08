// import '../style/global/globals.css'
import type { AppProps } from 'next/app'

import { AuthProvider } from '../util/hook/authContext';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../style/global/theme';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import '../util/firebase/init'; //Initialize FirebaseApp

// import '../style/atom/my-simple-image.css'

//バックエンドのgraphqlスキーマの定義からIDを設定する
const apollo_cache_option = {
  typePolicies: {
    UserModel: {
      keyFields: ["firebase_id"],
    }
  }
}

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(apollo_cache_option),
  connectToDevTools: true
})

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ChakraProvider
    theme={theme}
    >
      <ApolloProvider 
      client={ client }>
        <AuthProvider >
          <Component {...pageProps} />
        </AuthProvider>
      </ApolloProvider>
    </ChakraProvider>
  )

}

export default MyApp