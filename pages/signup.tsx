import React, { useContext, useEffect } from 'react'

import { useSignUpFunc, useSocialLoginFunc } from '../util/hook/useAuth';
import { Header } from '../components/layouts/Header/Header';
import { EmailInput, PasswordInput, PasswordRemaindInput, SocialLoginButtons, SubmitButton, UserNameInput } from '../components/Forms/userForms';
import { BoxProps, Button, Center, Divider, Flex, Grid, GridItem, Heading, HStack } from '@chakra-ui/react'

import { useForm } from "react-hook-form";
import { AuthContext } from '../util/hook/authContext';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { BasicHeader } from '../component/layout/Header';
import { SignupForm } from '../component/standalone/SignupForm';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { NeumSocialLoginButtons } from '../component/helper/SocialLoginButtons';


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

    const {executeGoogle, executeGithub} = useSocialLoginFunc();

    const router = useRouter()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { if (userState == 'isUser')  router.replace('/') }, [userState])
    return (
        <>
            <BasicHeader/>
            <Grid
            // templateAreas={`"header header header"
            //                 "title title title"
            //                 "signup signup sns"`}
            gridTemplateRows={'100px 100px 1fr'}
            gridTemplateColumns={'100px 1fr 1fr 100px'}
            h='100vh'
            >
                <GridItem colSpan={4}/>
                <GridItem mt={2} colSpan={4} >
                    <Center fontSize={"2rem"} fontWeight={"bold"}>新規登録</Center>
                </GridItem>
                <GridItem colSpan={1}/>
                <GridItem colSpan={1}>
                    <Flex
                    direction="column" 
                    justify="center" 
                    align="center"
                    >
                        <Heading fontSize="1.3rem">メールアドレスでログイン</Heading>
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
                        <Heading fontSize="1.3rem">他のアカウントでログイン</Heading>
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