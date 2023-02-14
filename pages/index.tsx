import React, { useContext } from 'react';
import { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import { UserInfoContext } from '../util/hooks/auth';

const index: NextPage  = ({data}: any) => {

  const { userInfo } = useContext(UserInfoContext)

  return (
    <>
        <Box fontSize={20} color={"tipsy.100"}>tipsy</Box>
        <Box  color={"tipsy.100"}>tipsy</Box>
        <Box  color={"tipsy.100"}>{data}</Box>
        <Box  color={"tipsy.100"}>{userInfo?.firebase_id}</Box>
        <Box  color={"tipsy.100"}>{userInfo?.user_name}</Box>

    </>
  )
}

export default index