import React from 'react'
import Link from 'next/link'

import { Header } from '../components/layouts/Header/Header';
import { EmailInput, PasswordInput, PasswordRemaindInput, SubmitButton } from '../components/forms';
import { BoxProps, Button, Flex, Heading, Text } from '@chakra-ui/react'

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";


// コンポーネント定義
const Form = (props : BoxProps) => <Flex as="form" direction="column" w={400} justify="center" align="center">{props.children}</Flex>

//  型
interface Inputs {
    email: string;
    password: string;
}


// フォームの処理
const handleSignInSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log()
}





// 新規登録　処理　定義
const email:string = 'k.akiya08@gmail.com'
const password: string = 'lunachan07'

const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log(user);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(error);
    });







// ページコンポーネント定義
const Login = () => {

    const { register, formState: { errors }, formState, getValues } = useForm({
        mode: "all",
    });

    return (
        <>
            <Header/>
            <Flex className="page" direction="column" justify="center" align="center">  
                <Form>
                    <Heading mb={5}>Sign In</Heading>
                    <EmailInput errors={ errors } register={ register } />
                    <PasswordInput errors={ errors } register={ register }/>
                    <PasswordRemaindInput  errors={ errors } register={ register } password={ getValues("inputText2") }/>
                    <SubmitButton text='Sign In' formState={ formState }/>
                </Form>
                <Text>This is login form</Text>
                <Link  href="/">Home</Link>
            </Flex>
        </>
    )
}

export default Login