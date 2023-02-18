import React, { useContext, useState } from 'react';
import { NextPage } from 'next';
import { Box, Button, Input } from '@chakra-ui/react';
import { AuthContext, UserInfoContext } from '../util/hooks/auth';
import { useUserInfoQuery } from '../util/hooks/useQuery';
import { useApolloClient, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { USERS_ALL_QUERY, USER_QUERY } from '../util/graphql/queries/users.query.schema';
import { auth } from '../util/firebase/init';
import { USER_INFO_MUTATION } from '../util/graphql/mutation/users.mutation.schema';

const UsersAllDisplay = () => {
  const [getUsersAll, { loading, error, data }] = useLazyQuery(USERS_ALL_QUERY);

  const client = useApolloClient()
  const users = client.readQuery({ query: USERS_ALL_QUERY })

  const handleClickQuery = () => {
    console.log(getUsersAll())
  }

  return (
    <>
    <Box>hello</Box>
    <Button onClick={handleClickQuery}>Users All Query</Button>
    { users && users.users_all.map( (user: any) => <Box>{user.user_name}</Box> )}
    </>
  )
}


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


const index: NextPage  = () => {

  const { userInfo } = useContext(UserInfoContext)
  const { userState } = useContext(AuthContext)

  const [getLoginUserInfo, { loading, error, data }] = useLazyQuery(USER_QUERY, {
    variables: {
        "userId" : auth.currentUser?.uid,
    }
  });

  const getUserInfoHandle = async () => {
    getLoginUserInfo()
  }

  return (
    <>
        <UsersAllDisplay/>
        <UserNameUpdataForm/>
    </>
  )
}

export default index