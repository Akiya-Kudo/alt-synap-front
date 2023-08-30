// import '../style/global/globals.css'
import type { AppProps } from 'next/app'

import { AuthProvider } from '../util/hook/authContext';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../style/global/theme';

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import '../util/firebase/init'; //Initialize FirebaseApp
import { useEffect } from 'react';
import { auth } from '../util/firebase/init';
import { BasicHeader } from '../component/layout/Header';
import { useRouter } from 'next/router';
import { LinkCollection, Post } from '../type/global';

// import '../style/atom/my-simple-image.css'

//Cache id - バックエンドのgraphqlスキーマの定義からIDを設定する
const apollo_cache_option = {
  typePolicies: {
    User: {
      keyFields: ["uuid_uid"],
    },
    PostWithTagsAndUser: {
      keyFields: ["uuid_pid"],
    },
    Post: {
      keyFields: ["uuid_pid"]
    },
    Tag: {
      keyFields: ["tid"]
    },
    Collection: {
      keyFields: ["cid"]
    },
    Link: {
      keyFields: ["lid"]
    },
    LinkCollection: {
      keyFields: ["lid", "cid"]
    },
    Query: {
      fields: {
        search_post: {
          keyArgs: ["searchString", "selectedTagId", "sortType"],
          merge(existing: Post[] = [], incoming: Post[]) {
            const mergedPosts = [...existing];

            // Remove duplicates from incoming data before merging
            incoming.forEach((newPost) => {
              if (!existing.some((existingPost) => existingPost.uuid_pid === newPost.uuid_pid)) {
                mergedPosts.push(newPost);
              }
            });

            return mergedPosts;
          }
        },
        get_link_collections_used: {
          keyArgs: ["uuid_uid"],
          merge(existing: LinkCollection[] = [], incoming: LinkCollection[]) {
            return incoming;
          }
        }
      }
    }
  }
}
// Authorization header idT get & send
const httplink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
})
const authLink = setContext( async (operation, { headers })=>{
  // 型ガード + mutation時のみ idTokenをheadersに付加
  if (operation.query.definitions[0].kind === 'OperationDefinition' && operation.query.definitions[0].operation=="mutation") {    
    const token = await auth.currentUser?.getIdToken()
    // console.log(token);
    
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  } else return {headers}
})

export const client = new ApolloClient({
  // uri: 'http://localhost:4000/graphql',
  link: authLink.concat(httplink),
  cache: new InMemoryCache(apollo_cache_option),
  connectToDevTools: true
})

function MyApp({ Component, pageProps }: AppProps) {
  //headerの表示切り替え用
  const router = useRouter()
  const withoutBasicHeader = router.pathname == '/user/post_create' || router.pathname == '/user/link_create' || router.pathname == '/user/edit/my_profile'
  
  return (
    <ChakraProvider
    theme={theme}
    >
      <ApolloProvider 
      client={ client }>
        <AuthProvider >
          { withoutBasicHeader || <BasicHeader/> }
          <Component {...pageProps} />
        </AuthProvider>
      </ApolloProvider>
    </ChakraProvider>
  )

}

export default MyApp