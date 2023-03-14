import React, { useContext, useEffect, useState } from 'react';
import { NextPage } from 'next';

import { auth } from '../util/firebase/init';
import { Box, Button, Heading, Highlight, HStack, Input, Radio, Stack, Text, useColorModeValue, useTheme } from '@chakra-ui/react';
import { useApolloClient, useMutation } from '@apollo/client';

import { USERS_ALL_QUERY, USER_QUERY } from '../util/graphql/queries/users.query.schema';
import { USER_INFO_MUTATION } from '../util/graphql/mutation/users.mutation.schema';

import { Header } from '../components/layouts/Header/Header';
import { AuthContext } from '../util/hook/authContext';
import { ClickButton, SwitchButton } from '../component/atom/buttons';
import { RadioSelecter, RadioSwitch } from '../component/atom/radios';
import { RadioSelecterGroup } from '../component/helper/RadioGroup';
import { useColorRandomPick } from '../util/hook/useColor';

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
  const [radio, setRadio] = useState("スパゲッティ")
  return (
    <>
      <Header></Header>
      <SwitchButton h={100} w={200} m={100}>Switch</SwitchButton>
      <Box>
      </Box>
    </>
  )
}

export default Index
