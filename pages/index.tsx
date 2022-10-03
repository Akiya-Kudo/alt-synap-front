import { Heading } from '@chakra-ui/react';
import React, { useContext } from 'react';
import {Header} from '../components/layouts/Header/Header';

import { auth } from '../utils/firebase/init';
import { AuthContext } from '../context/auth';
import { NextPage } from 'next';
import Top from '../components/Top';

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
      <div className="page">
        <Top/>
        {/* <Info/> */}
      </div>
    </>
  )
}

export default index