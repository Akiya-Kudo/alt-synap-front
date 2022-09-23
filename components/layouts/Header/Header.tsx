import { Box, BoxProps, Button } from '@chakra-ui/react';
import { ScaleFade, useDisclosure } from '@chakra-ui/react';
import React, { Children } from 'react';

const Container = (props: BoxProps) => <Box w="100%" h="7.5vh" pos="fixed" zIndex={2}>{props.children}</Box>
const Inner = (props: BoxProps) => <Box w="100%" h="7.5vh">{props.children}</Box>

function ScaleFadeEx(props: BoxProps) {
const { isOpen, onToggle } = useDisclosure()
return (
        <>
        <Button onClick={onToggle}>Click Me</Button>
        <ScaleFade initialScale={0.9} in={isOpen}>
            <Box
                p='40px'
                color='white'
                mt='4'
                bg='teal.500'
                rounded='md'
                shadow='md'
            >
            Fade
            </Box>
        </ScaleFade>
        </>
    )
}

const Header = () => {

    return (
        <>
            <Container>
                <Inner>
                    <ScaleFadeEx></ScaleFadeEx>
                </Inner>
            </Container>
        </>
    )
}

export default Header