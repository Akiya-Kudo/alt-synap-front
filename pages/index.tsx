import { Box, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import Header from '../components/layouts/Header/Header';



const index = () => {
  return (
    <>
      <Header/>
      <div className="home">
        <Text bg='red.500'>index</Text>
        <Link  href="/test">Test</Link>
      </div>
    </>
  )
}

export default index