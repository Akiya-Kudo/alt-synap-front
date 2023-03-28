import React, { useContext, useEffect } from 'react'

import { useSignUpFunc } from '../util/hook/useAuth';
import { Header } from '../components/layouts/Header/Header';
import { EmailInput, PasswordInput, PasswordRemaindInput, SocialLoginButtons, SubmitButton, UserNameInput } from '../components/Forms/userForms';
import { BoxProps, Divider, Flex, Heading } from '@chakra-ui/react'

import { useForm } from "react-hook-form";
import { AuthContext } from '../util/hook/authContext';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { BasicHeader } from '../component/layout/Header';


// コンポーネント定義
const Form = (props : BoxProps) => {
    const {execute} = useSignUpFunc()

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
                const target = await e.target as any;
                const email = await target.inputText3.value as string;
                const password = await target.inputText2.value as string;
                const user_name = await target.inputText5.value as string;
                execute(email, password, user_name );
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
            <BasicHeader></BasicHeader>
            <Flex className="page" direction="column" justify="center" align="center">  
                <Form>
                    <Heading mb={5}>Sign up</Heading>
                    <Divider />
                    <EmailInput errors={ errors } register={ register } />
                    <UserNameInput errors={ errors } register={ register }/>
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