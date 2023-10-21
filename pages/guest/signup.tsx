import React, { useContext, useEffect } from 'react'
import { Box, Center, Flex, Grid, GridItem, Heading } from '@chakra-ui/react'

import { AuthContext } from '../../util/hook/authContext';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { BasicHeader } from '../../component/layout/Header';
import { SignupForm } from '../../component/standalone/SignupForm';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { NeumSocialLoginButtons } from '../../component/helper/SocialLoginButtons';
import Head from 'next/head';

const SignUp: NextPage  = () => {

    const { userState } = useContext(AuthContext);
    const router = useRouter()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { if (userState == 'isUser')  router.replace('/') }, [userState])
    return (
        <>
        <Head><title>Tipsy | 新規登録</title></Head>
            <Box className="page">
                <Center m={10}>
                    <Heading size={["xl", "xl", "lg"]}>新規登録</Heading>
                </Center>
                <Flex
                direction={["column", "column", "row"]}
                justify="center"
                align={["center", "center", "start"]}
                >
                    <Flex 
                    direction="column" align='center' justify='center' 
                    gap={5} p={3}
                    w={["100%","100%", "45%"]}
                    >
                        <Heading size="md">サービスアカウントでログイン</Heading>
                        <Center
                        fontSize='sm'  
                        color={"text_light"}
                        >
                            必要な情報を入力して新しくアカウントを作ろう！
                        </Center>
                        <NeumSocialLoginButtons/>
                    </Flex>

                    <Flex
                    direction="column" justify="center" align="center"
                    p={3}
                    w={["100%","100%", "45%"]}
                    >
                        <Heading size="md">メールアドレスでログイン</Heading>
                        <Center
                        fontSize='sm'  
                        color={"text_light"}
                        my={5}
                        >
                            必要な情報を入力して新しくアカウントを作ろう！
                        </Center>
                        <SignupForm />
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}

export default SignUp