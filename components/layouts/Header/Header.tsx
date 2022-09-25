import React from 'react';
import { Box, BoxProps, Button, ButtonGroup, Flex, Heading, Spacer } from '@chakra-ui/react';
import Image from 'next/image';

const Container = (props: BoxProps) => <Box w="100%" h="8vh" pos="fixed" zIndex={2} boxShadow='md' >{props.children}</Box>
// const Inner = (props: BoxProps) => <Box w="100%" h="7.5vh">{props.children}</Box>

export const Header = () => {

    const status: boolean = true;

    return (
        <>
            <Container>
                <Flex minWidth='max-content' alignItems='center' gap='2' m='2'>
                <Flex p='2' >
                    <Box style={{width: 30, height: 30}} mx='3' >
                        <Image src='/logo3.svg'  width={300} height={300} layout={'responsive'} alt="logo" ></Image>
                    </Box>
                    <Heading size='md' color='orange.300' textShadow='1px 2px #f86a6a' >Tipsy</Heading>
                </Flex>
                <Spacer />
                <ButtonGroup gap='2' mx='3'>
                    { status == true 
                    ?   <><Button colorScheme='red' color='red.300' variant='ghost' size='sm' >SIGN UP</Button>
                            <Button colorScheme='red' bg='red.400' boxShadow='md' rounded='base' size='sm'>LOG IN</Button></>

                    :   <><Button colorScheme='red' color='red.300' variant='ghost' fontSize='xl' rounded='3xl' mb={1}>+</Button>
                            <Button colorScheme='red' bg='red.400' boxShadow='md' rounded='base' size='sm' mt={1}>Icon</Button></>
                    }
                </ButtonGroup>
                </Flex>
            </Container>
        </>
    )
}