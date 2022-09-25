import { Box, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React from 'react';
import {Header} from '../components/layouts/Header/Header';

// headerの処理
type Props = {status: string;}
export const getServerSideProps: GetServerSideProps = async(context) => {

  const props: Props = {
    status: 'guest'
  }

  return {props: props};
}

const index = () => {
  return (
    <>
      <Header/>
      <div className="page">
        <Text bg='red.500'>index</Text>
        <Link  href="/test">Test</Link>
      </div>
    </>
  )
}

export default index