import React, { useContext, useEffect } from 'react'

import { signUpFunc } from '../utils/login';
import { Header } from '../components/layouts/Header/Header';
import { EmailInput, PasswordInput, PasswordRemaindInput, SocialLoginButtons, SubmitButton } from '../components/forms';
import { BoxProps, Divider, Flex, Heading } from '@chakra-ui/react'

import { useForm } from "react-hook-form";
import { setAuthContext, AuthContext } from '../context/auth';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { userStateType } from '../types/user';


// コンポーネント定義
const Form = (props : BoxProps) => {

    const { setUserState } = useContext(setAuthContext);
    const changeUserState = (state: userStateType) => setUserState(state);
    const changeUserStateLoading = () => setUserState('loading');

    return (
        <Flex
            as="form" 
            direction="column" 
            w={400} 
            m={3}
            justify="center" 
            align="center" 
            onSubmit={async e => {
                e.preventDefault()
                const target = e.target as any;
                const email = target.inputText3.value as string;
                const password = target.inputText2.value as string;
                changeUserStateLoading()
                signUpFunc(email, password, changeUserState );
            }}
        >
            {props.children}
        </Flex>
    )
}





// ページコンポーネント定義
const SignUp: NextPage  = () => {

    const { userState } = useContext(AuthContext);
    const router = useRouter()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { if (userState == 'isUser')  router.replace('/') }, [userState])

    const { register, formState: { errors }, formState, getValues } = useForm({mode: "all"});

    return (
        <>
            <Header/>
            <Flex className="page" direction="column" justify="center" align="center">  
                <Form>
                    <Heading mb={5}>Sign up</Heading>
                    <Divider />
                    <EmailInput errors={ errors } register={ register } />
                    <PasswordInput errors={ errors } register={ register }/>
                    <PasswordRemaindInput  errors={ errors } register={ register } password={ getValues("inputText2") }/>
                    <SubmitButton text='Sign up' formState={ formState }/>
                    <Divider />
                </Form>
                <SocialLoginButtons/>
            </Flex>
        </>
    )
}

export default SignUp