import React, { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { EmailInput, PasswordInput, SubmitButton } from '../../forms';

import { AuthContext } from '../../../context/auth';

import { Box, BoxProps, Button, ButtonGroup, Flex, Heading, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Spacer } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import {  Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';

import { useForm } from "react-hook-form";
import { logInFunc, logOutFunc } from '../../../utils/login';
import Loading from '../../Loading';
import { userStateType } from '../../../types/user';

const Container = (props: BoxProps) => <Flex w="100%" h="8vh" pos="fixed" zIndex={10} boxShadow='md' p={0} alignItems='center' bg='white'>{props.children}</Flex>




// コンポーネント定義
const Form = (props : BoxProps) => {


    const { setUserState } = useContext(AuthContext);
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
                    <ModalHeader>
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
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose} mr={3}>Cancel</Button>
                        <SubmitButton text='Log in' formState={ formState }/>
                    </ModalFooter>
                    </Form>
                </ModalContent>
            </Modal>
        </>
    )
}


const UserMenu = () => {
    
    const { setUserState } = useContext(AuthContext);
    const changeUserState = (state: userStateType) => setUserState(state);
    const changeUserStateLoading = () => setUserState('loading');

    return (
        <Menu>
            <MenuButton as={Button} colorScheme='orange' bg='orange.300' boxShadow='md' rounded='base' size='sm' mt={1}>ICON</MenuButton>
            <MenuList>
                <MenuGroup title='- PROFILE -'>
                <MenuItem>MY PAGE</MenuItem>
                <MenuItem 
                    onClick={ () => {
                        changeUserStateLoading()
                        logOutFunc(changeUserState) 
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


export const Header = () => {

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
                                    <Heading size='md' color='orange.300' textShadow='1px 2px #e6de8a' >Tipsy</Heading>
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
