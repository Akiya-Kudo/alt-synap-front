import { Box, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import {Header} from '../components/layouts/Header/Header';

import { FirebaseApp, getApp } from 'firebase/app';

const Home = () => {
  const app: FirebaseApp = getApp()
  return  (
    <ul>
      <li>name = {app.name}</li>
      <li>appId = {app.options.appId}</li>
      <li>apiKey = {app.options.apiKey}</li>
    </ul>
  )
}

// headerの処理
// type Props = {status: string;}
// export const getServerSideProps: GetServerSideProps = async(context) => {

//   const props: Props = {
//     status: 'guest'
//   }

//   return {props: props};
// }

const index = () => {
  return (
    <>
      <Header/>
      <div className="page">
        <Home/>
        <Text bg='red.500'>index</Text>
        <Box>
          <Link  href="/test">Test</Link>
        </Box>
        <Box>
          <Link  href="/signin">sign in</Link>
        </Box>
      </div>
    </>
  )
}

export default index