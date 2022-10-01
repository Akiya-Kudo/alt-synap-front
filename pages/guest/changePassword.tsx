import { BoxProps, Center, Flex, Heading, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { EmailInput, SubmitButton } from '../../components/forms'
import { Header } from '../../components/layouts/Header/Header'
import { AuthContext } from '../../context/auth'
import { userStateType } from '../../types/user'
import { GuestPassChangeSendEmail } from '../../utils/login'


const Form = (props : BoxProps) => {

    const { setUserState } = useContext(AuthContext);
    const changeUserState = (state: userStateType) => setUserState(state);
    const changeUserStateLoading = () => setUserState('loading');

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
                changeUserStateLoading()
                GuestPassChangeSendEmail(email, changeUserState)
            }}
        >
            {props.children}
        </Flex>
    )
}



export const ChangePassword: NextPage = () => {

    const { register, formState: { errors }, formState } = useForm({mode: "all"});

    const { userState } = useContext(AuthContext);
    const router = useRouter()
    useEffect(() => { if (userState == 'isUser')  router.replace('/') }, [userState])


    return (
        <>
            <Header/>
            <Flex className="page" direction="column" justify="center" align="center">  
                <Form>
                    <Heading mb={5}>Change Password</Heading>
                    <Center fontSize='sm'  color='grey'>please fill form and change password from the link in Email we will send</Center>
                    <EmailInput errors={ errors } register={ register } />
                    <SubmitButton text='Password Change from your Email' formState={ formState }/>
                </Form>
            </Flex>
        </>
    )
}

export default ChangePassword