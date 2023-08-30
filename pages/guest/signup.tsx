import React, { useContext, useEffect } from 'react'

import { useSignUpFunc, useSocialLoginFunc } from '../../util/hook/useAuth';
import { BoxProps, Button, Center, Divider, Flex, Grid, GridItem, Heading, HStack } from '@chakra-ui/react'

import { useForm } from "react-hook-form";
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
            <Grid
            className="page"
            gridTemplateRows={'100px 100px 1fr'}
            gridTemplateColumns={'100px 1fr 1fr 100px'}
            h='100vh'
            >
                <GridItem colSpan={4}/>
                <GridItem mt={3} colSpan={4} >
                    <Center>
                        <Heading size="lg">新規登録</Heading>
                    </Center>
                </GridItem>
                <GridItem colSpan={1}/>
                <GridItem colSpan={1}>
                    <Flex
                    direction="column" 
                    justify="center" 
                    align="center"
                    >
                        <Heading size="md">メールアドレスでログイン</Heading>
                        <Center
                        fontSize='sm'  
                        color={"text_light"}
                        m={1}
                        >
                            必要な情報を入力して新しくアカウントを作ろう！
                        </Center>
                        <SignupForm />
                    </Flex>
                </GridItem >
                <GridItem colSpan={1}>
                    <Flex 
                    direction="column"
                    align='center' justify='center' 
                    >
                        <Heading size="md">他のアカウントでログイン</Heading>
                        <Center
                        fontSize='sm'  
                        color={"text_light"}
                        >
                            必要な情報を入力して新しくアカウントを作ろう！
                        </Center>
                        <NeumSocialLoginButtons />
                    </Flex>
                </GridItem>
                <GridItem colSpan={1}/>
            </Grid>
        </>
    )
}

export default SignUp