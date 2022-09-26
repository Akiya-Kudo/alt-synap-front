import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Box, BoxProps, Button, ButtonGroup, Flex, Heading, Spacer } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const Container = (props: BoxProps) => <Flex w="100%" h="8vh" pos="fixed" zIndex={10} boxShadow='md' p={0} alignItems='center' bg='white'>{props.children}</Flex>
// const Inner = (props: BoxProps) => <Box w="100%" h="7.5vh">{props.children}</Box>

export const Header = () => {

    const status: boolean = true;

    return (
        <>
            <Container>
                <Flex minWidth='100%' alignItems='center' gap='2'>
                    <Flex >
                        <Link href="/" passHref>
                            <Flex>
                                <Box style={{width: 40, height: 40}} mx='3' >
                                    <Image src='/logo3.svg'  width={300} height={300} layout={'responsive'} alt="logo" ></Image>
                                </Box>
                                <Flex justify='center' align='center'>
                                    <Heading size='md' color='orange.300' textShadow='1px 2px #f86a6a' >Tipsy</Heading>
                                </Flex>
                            </Flex>
                        </Link>
                    </Flex>
                    <Spacer />
                    <ButtonGroup gap='2' mx='3'>
                        { status == true 
                        ?   <><Link href="/signup" passHref><Button colorScheme='orange' color='orange.300' variant='ghost' size='sm'>SIGN UP</Button></Link>
                                <Button colorScheme='orange' bg='orange.300' boxShadow='md' rounded='base' size='sm'>LOG IN</Button></>

                        :   <><Button colorScheme='orange' color='orange.300' variant='ghost' fontSize='xl' rounded='3xl' ><AddIcon /></Button>
                                <Button colorScheme='orange' bg='orange.300' boxShadow='md' rounded='base' size='sm' mt={1}>Icon</Button></>
                        }
                    </ButtonGroup>
                </Flex>
            </Container>
        </>
    )
}