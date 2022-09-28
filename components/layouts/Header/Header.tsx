import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { EmailInput, PasswordInput, SubmitButton } from '../../forms';

import { Box, BoxProps, Button, ButtonGroup, Flex, Heading, Spacer } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import {  Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';

import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../utils/firebase/init';

const Container = (props: BoxProps) => <Flex w="100%" h="8vh" pos="fixed" zIndex={10} boxShadow='md' p={0} alignItems='center' bg='white'>{props.children}</Flex>

export const Header = () => {

    const [loginWaiting, setLoginWaiting] = useState(false);

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
                        { auth.currentUser == null && !loginWaiting &&
                            <><Link href="/signup" passHref><Button colorScheme='orange' color='orange.300' variant='ghost' size='sm'>SIGN UP</Button></Link>
                                <LoginModal /></>
                        }

                        { auth.currentUser &&   
                            <><Button colorScheme='orange' color='orange.300' variant='ghost' fontSize='xl' rounded='3xl' ><AddIcon /></Button>
                            <Button colorScheme='orange' bg='orange.300' boxShadow='md' rounded='base' size='sm' mt={1}>Icon</Button></>
                        }
                    </ButtonGroup>
                </Flex>
            </Container>
        </>
    )
}

// コンポーネント定義
const Form = (props : BoxProps) => <Flex
    as="form" 
    direction="column" 
    w="100%" 
    onSubmit={async e => {
        e.preventDefault()
        const target = e.target as any;
        const email = target.inputText3.value as string;
        const password = target.inputText2.value as string;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
                console.log("user logged in");
            })
            .catch((error) => {
                // const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
                console.log(error);
            });
    }}
>
    {props.children}
</Flex>






const LoginModal = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const { register, formState: { errors }, formState, getValues } = useForm({mode: "all"});

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