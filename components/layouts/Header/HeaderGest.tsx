import { Box, BoxProps, Button, ButtonGroup, Flex, Heading, Spacer } from '@chakra-ui/react';
import React, { Children } from 'react';

const Container = (props: BoxProps) => <Box w="100%" h="8vh" pos="fixed" zIndex={2} boxShadow='md'>{props.children}</Box>
// const Inner = (props: BoxProps) => <Box w="100%" h="7.5vh">{props.children}</Box>

const HeaderGest = () => {

    return (
        <>
            <Container>
                <Flex minWidth='max-content' alignItems='center' gap='2' m='2'>
                <Box p='2'>
                    <Heading size='md'>Tipsy</Heading>
                </Box>
                <Spacer />
                <ButtonGroup gap='2'>
                    <Button colorScheme='red' color='red.300' variant='ghost' size='sm'>SIGN UP</Button>
                    <Button colorScheme='red' bg='red.400' boxShadow='md' rounded='base' size='sm'>LOG IN</Button>
                </ButtonGroup>
                </Flex>
            </Container>
        </>
    )
}

export default HeaderGest