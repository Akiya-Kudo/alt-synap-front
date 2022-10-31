import { BoxProps, Center, Divider, Flex, Heading, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { EmailInput, SubmitButton } from '../../components/forms'
import { Header } from '../../components/layouts/Header/Header'
import { AuthContext, setAuthContext } from '../../context/auth'
import { userStateType } from '../../types/user'
import { usePassChangeSendEmail } from '../../utils/hooks/useAuth'


const Form = (props : BoxProps) => {

    const {executeSendEmail} = usePassChangeSendEmail()

    return (
        <Flex
            as="form" 
            direction="column" 
            w={400} 
            justify="center" 
            align="center" 
            onSubmit={async e => {
                e.preventDefault()
                const target = await e.target as any;
                const email = await target.inputText3.value as string;
                executeSendEmail(email)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { if (userState == 'isUser')  router.replace('/') }, [userState])


    return (
        <>
            <Header/>
            <Flex className="page" direction="column" justify="center" align="center">  
                <Form>
                    <Heading mb={5}>Change Password</Heading>
                    <Divider />
                    <Center fontSize='sm'  color='grey' my={3}>please fill form and change password from the link in Email we will send</Center>
                    <Divider />
                    <EmailInput errors={ errors } register={ register } />
                    <SubmitButton text='Password Change from your Email' formState={ formState }/>
                </Form>
            </Flex>
        </>
    )
}

export default ChangePassword