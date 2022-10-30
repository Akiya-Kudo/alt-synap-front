import React, { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { EmailInput, FotgetPassLink, PasswordInput, SocialLoginButtons, SubmitButton } from '../../forms';
import Loading from '../../Loading';

import { setAuthContext, AuthContext, UserInfoContext, setUserInfoContext } from '../../../context/auth';

import { Avatar, Box, BoxProps, Button, ButtonGroup, Divider, Flex, Heading, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Spacer } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import {  Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';

import { useForm } from "react-hook-form";
import { logInFunc, logOutFunc, PassChangeSendEmail } from '../../../utils/login';
import { userStateType } from '../../../types/user';
import { auth } from '../../../utils/firebase/init';

const Container = (props: BoxProps) => <Flex zIndex={15} w="100%" h="7.5vh" pos="fixed" top="0" boxShadow='sm' alignItems='center' bg='white' >{props.children}</Flex>


// ログインフォームコンポーネント定義
const Form = (props : BoxProps) => {

    const { setUserState } = useContext(setAuthContext);
    const changeUserState = (state: userStateType) => setUserState(state);

    const changeUserStateLoading = () => setUserState('loading');

    return (
        <Flex
            as="form" 
            direction="column" 
            w="100%" 
            onSubmit={async e => {
                e.preventDefault()
                const target = e.target as any;
                const email = target.inputText3.value as string;
                const password = target.inputText2.value as string;
                changeUserStateLoading();
                logInFunc(email, password, changeUserState);
            }}
        >
            {props.children}
        </Flex>
    )
}







const LoginModal = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const { register, formState: { errors }, formState } = useForm({mode: "all"});

    return (
        <>
            <Button onClick={onOpen}  colorScheme='orange' bg='orange.300' boxShadow='md' rounded='base' size='sm'>LOG IN</Button>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader boxShadow='base'>
                        <Flex fontSize={25}>
                            <Box style={{width: 40, height: 40}} mr={2}>
                                <Image src='/logo3.svg'  width={300} height={300} layout={'responsive'} alt="logo" priority></Image>
                            </Box>
                        Log in
                        </Flex>
                    </ModalHeader>
                    <ModalCloseButton />
                    <Form>
                    <ModalBody pb={6}>
                        <EmailInput  errors={ errors } register={ register }/>
                        <PasswordInput  errors={ errors } register={ register }/>
                        <Flex direction='column'  m={3} align='center' justify='center'>
                            <SubmitButton text='Log in' formState={ formState }/>
                            <FotgetPassLink/>
                        <Divider/>
                        </Flex>
                        <SocialLoginButtons/>
                    </ModalBody>

                    <ModalFooter>
                    <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                    </Form>
                </ModalContent>
            </Modal>
        </>
    )
}







// ログアウトコンポーネント定義
const UserMenu = () => {

    const { userInfo } = useContext(UserInfoContext);
    const photo_url = userInfo?.photo_url ? userInfo.photo_url : "https://bit.ly/dan-abramov"
    
    const { setUserState } = useContext(setAuthContext);
    const { setUserInfo } = useContext(setUserInfoContext);
    const changeUserState = (state: userStateType) => setUserState(state);
    const changeUserStateLoading = () => setUserState('loading');

    let email: any = null
    const user = auth.currentUser;
    if (user !== null) {
        email = user.email;
    }

    return (
        <Menu>
            <MenuButton as={Button} colorScheme='orange' bg='orange.200'  boxShadow='md' rounded="3xl" p={0} mt={1}>
                <Avatar size='sm' name='Dan Abrahmov' src={ photo_url }/>
            </MenuButton>
            <MenuList>
                <MenuGroup title='- PROFILE -'>
                <Link href="/mypage" passHref><MenuItem>MY PAGE</MenuItem></Link>
                { email && <MenuItem onClick={() => PassChangeSendEmail(email, changeUserState)}>CHANGE PASSWORD</MenuItem> }
                <MenuItem 
                    onClick={ () => {
                        changeUserStateLoading()
                        logOutFunc(changeUserState) 
                        setUserInfo(null);
                    }}>
                    LOG OUT
                </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title='- Help -'>
                <MenuItem>FAQ</MenuItem>
                </MenuGroup>
            </MenuList>
        </Menu>
    )
}








// ヘッダー
export const Header = () => {

    console.log("indexレンダー")

    const { userState } = useContext(AuthContext);
    
    return (
        <>
            <Container>
                <Flex minWidth='100%' alignItems='center' gap='2'>
                    <Flex >
                        <Link href="/" passHref>
                            <Flex>
                                <Box style={{width: 40, height: 40}} mx='3' >
                                    <Image src='/logo3.svg'  width={300} height={300} layout={'responsive'} alt="logo" priority></Image>
                                </Box>
                                <Flex justify='center' align='center'>
                                    <Heading size='md' color='orange.300' textShadow='1px 2px #bae9ff' >Tipsy</Heading>
                                </Flex>
                            </Flex>
                        </Link>
                    </Flex>
                    <Spacer />
                    <ButtonGroup gap='2' mx='3'>
                        { userState == 'guest' &&
                            <><Link href="/signup" passHref><Button colorScheme='orange' color='orange.300' variant='ghost' size='sm'>SIGN UP</Button></Link>
                                <LoginModal /></>
                        }

                        { userState == 'isUser' &&   
                            <><Button colorScheme='orange' color='orange.300' variant='ghost' fontSize='xl' rounded='3xl' ><AddIcon /></Button>
                            <UserMenu /></>
                        }

                        { userState == 'loading' &&   
                            <><Loading message="User Info Loading"/></>
                        }
                    </ButtonGroup>
                </Flex>
            </Container>
        </>
    )
}
