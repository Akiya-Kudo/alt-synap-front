import { Text } from '@chakra-ui/react';
import React, { useContext, useLayoutEffect } from 'react';
import {Header} from '../components/layouts/Header/Header';

import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '../utils/firebase/init';
import { AuthContext } from '../context/auth';
import { NextPage } from 'next';

const Info = () => {

  const { userState, setUserState } = useContext(AuthContext);

  console.log(userState)
  useLayoutEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserState('isUser');
        console.log('hello')
        console.log(userState)
      } else {
        setUserState('guest');
      }
    });
  },[])

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