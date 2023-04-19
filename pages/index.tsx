import React from 'react';
import { NextPage } from 'next';

import { auth } from '../util/firebase/init';
import { Box, Button, Heading, Input } from '@chakra-ui/react';
import { useApolloClient, useMutation } from '@apollo/client';

import { USER_QUERY } from '../util/graphql/queries/users.query.schema';
import { USER_INFO_MUTATION } from '../util/graphql/mutation/users.mutation.schema';

import { TabBord } from '../component/atom/bords';
import { TabButtonSelectGroup } from '../component/helper/TabRadioGroup';
import { BasicHeader } from '../component/layout/Header';

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
  const handleTabGroup = (e:any) => {
    console.log(e, "が選択されましした")
  }
  return (
    <>
      <BasicHeader/>
      <Box className="page">
        <TabButtonSelectGroup 
        onChange={ handleTabGroup} 
        options={["TIpsyの投稿", "人気順", "新着順"]}  
        defaultValue='人気順' 
        m={"20px"}
        />
        <TabBord m={5} bg='bg_switch' neumH={"tall"} h={500}>hello</TabBord>
      </Box>
    </>
  )
}

export default Index