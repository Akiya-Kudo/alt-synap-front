import { Box, Button, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import {Header} from '../components/layouts/Header/Header';

import { onAuthStateChanged, signOut } from 'firebase/auth';

import { auth } from '../utils/firebase/init';

const Info = () => {

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // console.log(user)
      console.log(auth)
      // ...
    } else {
      console.log("none is logging in")
    }
  });

  return  (
    <ul>
      {auth.currentUser && <li>user = {auth.currentUser.email}</li> }
    </ul>
  )
}





const Logouter = () => {
  signOut (auth).then(() => {
    console.log('sign out successed');
    console.log(auth);
  }).catch((error) => {
    console.log(error.message)
  })
}


const index = () => {
  return (
    <>
      <Header/>
      <div className="page">
        <Info/>
        <Text bg='red.500'>index</Text>
        <Box>
          <Link  href="/test">Test</Link>
        </Box>
        <Box>
          <Link  href="/signup">sign in</Link>
        </Box>
        <Button onClick={ Logouter }>Log out</Button>
      </div>
    </>
  )
}

export default index