import { Text } from '@chakra-ui/react';
import React, { useContext, useLayoutEffect } from 'react';
import {Header} from '../components/layouts/Header/Header';

import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '../utils/firebase/init';
import { AuthContext } from '../context/auth';
import { NextPage } from 'next';

const Info = () => {

  const { userState } = useContext(AuthContext);

  return  (
    <ul>
      {auth.currentUser && <li>user = {auth.currentUser.email}</li> }
    </ul>
  )
}



const index: NextPage  = () => {

  return (
    <>
      <Header/>
      <div className="page">
        <Info/>
        <Text bg='red.500'>index</Text>
      </div>
    </>
  )
}

export default index