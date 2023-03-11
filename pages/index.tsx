import React, { useContext, useEffect, useState } from 'react';
import { NextPage } from 'next';

import { auth } from '../util/firebase/init';
import { Box, Button, Heading, Highlight, HStack, Input, Stack, useColorModeValue, useTheme } from '@chakra-ui/react';
import { useApolloClient, useMutation } from '@apollo/client';

import { USERS_ALL_QUERY, USER_QUERY } from '../util/graphql/queries/users.query.schema';
import { USER_INFO_MUTATION } from '../util/graphql/mutation/users.mutation.schema';

import { Header } from '../components/layouts/Header/Header';
import { AuthContext } from '../util/hook/authContext';
import { ClickButtonStyle } from '../component/atom/buttons';
import { WelcomTipsyBord } from '../component/standalone/bords';
import { tipsy_light } from '../style/global/color_theme';

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

  const v = "var(--chakra-colors-gray-100)"
  const highlight = useColorModeValue("var(--chakra-colors-tipsy_light-200)", "var(--chakra-colors-tipsy_dark-200)")
  const shadow = useColorModeValue("var(--chakra-colors-tipsy_light-300)", "var(--chakra-colors-tipsy_dark-300)")

  return (
    <>
      <Header></Header>
      <Box mt={100} fontSize={"1em"}>hello</Box>
      <Box fontSize={30}>hello</Box>
      <Box fontSize={40}>
        <Box fontSize={"1em"}>hello</Box>
      </Box>
      <Box color={["red", "pink", "purple", "blue", "teal", "green"]}>これはレスポンシブ</Box>
      <Heading color={"accent_light.100"}>こんにちは</Heading>
      <Heading color={"accent_light.200"}>こんにちは</Heading>
      <Heading color={"accent_light.300"}>こんにちは</Heading>
      <Heading color={"accent_light.400"}>こんにちは</Heading>
      <Heading color={"accent_light.500"}>こんにちは</Heading>
    <Heading color={"red.400"} bgGradient={"linear(to-r, teal.300, purple.500)"} w={300} bgClip="text">こんにちは</Heading>
    <Heading bg={"red.400"} bgGradient={"linear(to-r, teal.300, purple.500)"} w={300}>こんにちは</Heading>
      <Button 
      // boxShadow={"15px 15px 30px #1e2123,-15px -15px 30px #35383d;"}
      boxShadow={`15px 15px 30px ${shadow},-15px -15px 30px ${highlight};`}
      color={"text_normal"} 
      bg="rgba(237, 237, 237, 0)"
      bgGradient={"linear(to-r, accent_light.100, accent_light.500)"} 
      m={100} borderRadius={50} h={100} w={200}
      _hover={{
        boxShadow: `5px 5px 15px ${shadow},-5px -5px 15px ${highlight};`, 
        color: "accent_light.100" 
      }}
      >dark version</Button>
      <ClickButtonStyle m={100} h={100} w={200} color={"text_normal"}>hello</ClickButtonStyle>
      <ClickButtonStyle m={100} h={100} w={200} color={"text_light"}>hello</ClickButtonStyle>
      <ClickButtonStyle m={100} h={100} w={200} color={"text_very_light"}>hello</ClickButtonStyle>
    </>
  )
}

export default Index