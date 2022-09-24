import { Box, BoxProps, Button, ButtonGroup, Flex, Heading, Spacer } from '@chakra-ui/react';
import React from 'react';

const Container = (props: BoxProps) => <Box w="100%" h="7.5vh" pos="fixed" zIndex={2} boxShadow='md' display="flex" alignItems="center" justifyContent="space-between">{props.children}</Box>
// const Inner = (props: BoxProps) => <Box w="100%" h="7.5vh">{props.children}</Box>

const HeaderGest = () => {

    return (
        <>
            <Container>
                <Flex minWidth='max-content' alignItems='center' gap='2' m='2' w='100%' px={4}>
                <Box p='2'>
                    <Heading size='md'>Tipsy</Heading>
                </Box>
                <Spacer />
                <ButtonGroup gap='2'>
                    <Button colorScheme='red' color='red.300' variant='ghost' fontSize='2xl' rounded='3xl' size='sm'>+</Button>
                    <Button colorScheme='red' bg='red.400' boxShadow='md' rounded='base' size='sm'>Icon</Button>
                </ButtonGroup>
                </Flex>
            </Container>
        </>
    )
}

export default HeaderGest