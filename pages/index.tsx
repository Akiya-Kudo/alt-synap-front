import React, { useContext } from 'react';
import {Header} from '../components/layouts/Header/Header';
import CardContainer from '../components/CardContainer';
import Top from '../components/Top';

import { BoxProps, Flex, Heading } from '@chakra-ui/react';

import { auth } from '../utils/firebase/init';
import { AuthContext } from '../context/auth';
import { NextPage } from 'next';
import TagHeader from '../components/layouts/Header/TagHeader';




const Info = () => {

  const { userState } = useContext(AuthContext);

  const user = auth.currentUser;

  let displayName = null
  let email = null
  let photoURL = null
  let emailVerified = null
  let uid = null

  if (user !== null) {
    uid = user.uid;

    // The user object has basic properties such as display name, email, etc.
    displayName = user.displayName;
    email = user.email;
    photoURL = user.photoURL;
    emailVerified = user.emailVerified;

    console.log(uid)
    console.log(user)
  } else {
    displayName = 'no user is loged in'
  }

  return  (
    <ul>
      {displayName && <Heading>displayName = {displayName}</Heading> }
      {email && <li>email = {email}</li> }
      {photoURL && <li>photoURL = {photoURL}</li> }
      {emailVerified ? <li>emailVerified = true</li> : <li>emailVerified = not</li>  }
      {uid && <li>uid = {uid}</li> }
    </ul>
  )
}



const index: NextPage  = () => {

  return (
    <>
      <Header/>
      <TagHeader/>
      <div className="page">
        <Top/>
        <CardContainer/>
      </div>
    </>
  )
}

export default index