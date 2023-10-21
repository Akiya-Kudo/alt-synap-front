import { Box, Center, Flex, Heading, Image, Input } from '@chakra-ui/react'
import { NextPage } from 'next'
import Head from 'next/head'
// import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ImageInputDefault } from '../../component/atom/inputs'
import { PasswordChangeForm } from '../../component/standalone/PasswordChangeForm'
import { AuthContext } from '../../util/hook/authContext'
import { useCustomToast } from '../../util/hook/useCustomToast'
import { useResizer } from '../../util/hook/useResizer'
// import { useResizer } from '../../util/hook/useResizer'

export const ChangePassword: NextPage = () => {
    const { userState } = useContext(AuthContext);
    const router = useRouter()
    useEffect(() => { if (userState == 'isUser')  router.replace('/') }, [userState])

    return (
        <>
        <Head><title>Tipsy | パスワード変更</title></Head>
            <Flex
            className="page"
            direction="column" 
            justify={["start", "center"]}
            align="center" mt={[10, 0]}
            >
                <Heading m={2} size="lg">パスワード変更</Heading>
                <Center
                fontSize='sm'  
                color={"text_light"}
                my={3} mx={10}
                >
                    アカウントに登録したメールアドレスを入力し送信されたメールからパスワードを変更してください。
                </Center>
                <PasswordChangeForm/>
            </Flex>
        </>
    )
}

export default ChangePassword