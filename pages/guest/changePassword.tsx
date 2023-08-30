import { Center, Flex, Heading } from '@chakra-ui/react'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { BasicHeader } from '../../component/layout/Header'
import { PasswordChangeForm } from '../../component/standalone/PasswordChangeForm'
import { AuthContext } from '../../util/hook/authContext'

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
            justify="center" 
            align="center" 
            >
                <Heading m={5} size="lg">パスワード変更</Heading>
                <Center
                fontSize='sm'  
                color={"text_light"}
                m={3}
                >
                    アカウントに登録したメールアドレスを入力し送信されたメールからパスワードを変更してください。
                </Center>
                <PasswordChangeForm/>
            </Flex>
        </>
    )
}

export default ChangePassword