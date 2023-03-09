import React, { useContext, useState } from 'react';
import { NextPage } from 'next';

import { auth } from '../util/firebase/init';
import { Box, Button, Heading, Highlight, HStack, Input, Stack } from '@chakra-ui/react';
import { useApolloClient, useMutation } from '@apollo/client';

import { USERS_ALL_QUERY, USER_QUERY } from '../util/graphql/queries/users.query.schema';
import { USER_INFO_MUTATION } from '../util/graphql/mutation/users.mutation.schema';

import { Header } from '../components/layouts/Header/Header';
import { AuthContext } from '../util/hook/authContext';
import { ClickButtonStyle } from '../component/atom/buttons';
import { WelcomTipsyBord } from '../component/standalone/bords';

const UserNameUpdataForm = () => {

  const client = useApolloClient()
  const user = client.readQuery({ 
    query: USER_QUERY,
    variables: {
      userId: auth.currentUser?.uid,
    }
  })

  const [userInfoUpdater, { data, loading, error }] = useMutation(USER_INFO_MUTATION);

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const input1 = e.target.input1.value

    console.log(user.user.firebase_id)
    if (user) {
      userInfoUpdater({
        variables: {
          updateUserInfoData: {
            firebase_id: user.user.firebase_id,
            user_name: input1,
            comment: user.user.comment,
          }
        }
      })
    } else {
      alert("ログインしているユーザの情報が取得できていません")
    }
  }
  return (
    <>
      <Box>
        { user?.user.user_name }
      </Box>
      <Box as="form" onSubmit={ handleSubmit }>
        <Input id="input1"/>
        <Button type="submit">変更を加える</Button>
      </Box>
    </>
  )
}


const Index: NextPage  = () => {
  const { userState } = useContext(AuthContext);
  const handleClick = () => {
    // console.log(userState)
  }
  return (
    <>
      <Header></Header>
      <Box color={"tipsy_light.600"} mt={200} fontSize={"3rem"} fontWeight={"bold"}>Hello</Box>
      <Box color={"tipsy_light.700"} fontSize={"3rem"} fontWeight={"bold"}>Hello</Box>
      <Box color={"tipsy_light.800"} fontSize={"3rem"} fontWeight={"bold"}>Hello</Box>
      <Box color={"tipsy_light.900"} fontSize={"3rem"} fontWeight={"bold"}>Hello</Box>
      <Box 
      bgClip={'text'} 
      sx={{ 
        '--color-orage': 'tipsy_light.600',
        '--color-pink': 'tipsy_light.700',
        '--color-green': 'tipsy_light.800',
        '--color-blue': 'tipsy_light.900',
      }} 
      bgGradient={`linear(to-l, tipsy_light.600, tipsy_light.700, tipsy_light.800, tipsy_light.900)`}
      fontSize={"3rem"} fontWeight={"bold"}
      >
        Tipsy
      </Box>
    </>
  )
}

export default Index