import { Center, Flex, Heading } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { BasicHeader } from '../../component/layout/Header'
import { PasswordChangeForm } from '../../component/standalone/PasswordChangeForm'
import { Header } from '../../components/layouts/Header/Header'
import { AuthContext } from '../../util/hook/authContext'

export const ChangePassword: NextPage = () => {
    const { userState } = useContext(AuthContext);
    const router = useRouter()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { if (userState == 'isUser')  router.replace('/') }, [userState])
    return (
        <>
            <BasicHeader/>
            <Flex
            className="page"
            direction="column" 
            justify="center" 
            align="center" 
            mt={"100px"}
            >
                <Heading m={5}>パスワード変更</Heading>
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