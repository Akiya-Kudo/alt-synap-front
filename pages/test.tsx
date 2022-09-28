import Link from 'next/link';
import React from 'react';
import {Header} from '../components/layouts/Header/Header';

import { getAuth } from 'firebase/auth';

// import { Box, Button, ScaleFade, useDisclosure } from "@chakra-ui/react"

const test = () => {
  
  const auth = getAuth();

  return (
    <>
        <Header/>
        <div className="page">   
          <Link  href="/">Home</Link>
          <div></div>
        </div>
    </>
  )
}

export default test