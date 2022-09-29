import React, { useContext } from 'react'
import Link from 'next/link'

import { signUpFunc } from '../utils/login';
import { Header } from '../components/layouts/Header/Header';
import { EmailInput, PasswordInput, PasswordRemaindInput, SubmitButton } from '../components/forms';
import { BoxProps, Flex, Heading, Text } from '@chakra-ui/react'

import { useForm } from "react-hook-form";
import { AuthContext } from '../context/auth';


// コンポーネント定義
const Form = (props : BoxProps) => {

    const { userState, setUserState } = useContext(AuthContext);
    const changeUserState = () => {
        setUserState(!userState);
    }

    return (
        <Flex
            as="form" 
            direction="column" 
            w={400} 
            justify="center" 
            align="center" 
            onSubmit={async e => {
                e.preventDefault()
                const target = e.target as any;
                const email = target.inputText3.value as string;
                const password = target.inputText2.value as string;
                signUpFunc(email, password, changeUserState );
            }}
        >
            {props.children}
        </Flex>
    )
}





// ページコンポーネント定義
const SignUp = () => {

    const { register, formState: { errors }, formState, getValues } = useForm({mode: "all"});

    return (
        <>
            <Header/>
            <Flex className="page" direction="column" justify="center" align="center">  
                <Form>
                    <Heading mb={5}>Sign up</Heading>
                    <EmailInput errors={ errors } register={ register } />
                    <PasswordInput errors={ errors } register={ register }/>
                    <PasswordRemaindInput  errors={ errors } register={ register } password={ getValues("inputText2") }/>
                    <SubmitButton text='Sign up' formState={ formState }/>
                </Form>
                <Text>This is sign up form</Text>
                <Link  href="/">Home</Link>
            </Flex>
        </>
    )
}

export default SignUp