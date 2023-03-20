import React, { useContext, useEffect, useState } from 'react';
import { NextPage } from 'next';

import { auth } from '../util/firebase/init';
import { Box, Button, FormControl, FormLabel, Heading, Highlight, HStack, Input, Radio, Stack, Switch, Text, useColorModeValue, useTheme } from '@chakra-ui/react';
import { useApolloClient, useMutation } from '@apollo/client';

import { USERS_ALL_QUERY, USER_QUERY } from '../util/graphql/queries/users.query.schema';
import { USER_INFO_MUTATION } from '../util/graphql/mutation/users.mutation.schema';

import { Header } from '../components/layouts/Header/Header';
import { AuthContext } from '../util/hook/authContext';
import { BasicSwitch } from '../component/atom/switchs';
import { TabBord } from '../component/atom/bords';
import { TabRadioGroup } from '../component/helper/TabRadioGroup';
import { BasicRadio } from '../component/atom/radios';
import { BasicHeader } from '../component/standalone/Header';

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
  const handleTabGroup = (e:any) => {
    console.log(e, "が選択されましした")
  }
  return (
    <Box >
      <Header></Header>
      <BasicHeader></BasicHeader>
      <Box h={100}></Box>
      <BasicRadio Rcolor={"purple_switch"} value="こんにち">こんにちは</BasicRadio>
      <BasicSwitch id="greeting" Scolor='purple_switch'>greeting</BasicSwitch>
      <TabRadioGroup getValue={ handleTabGroup} options={["TIpsyの投稿", "人気順", "新着順"]}  defValue='人気順' Acolor={"purple.600"} Hcolor={"purple_switch"} fs={16}></TabRadioGroup>
      <TabBord m={5} bg='bg_switch' neumH={"tall"} h={500}>hello</TabBord>

    </Box>
  )
}

export default Index
