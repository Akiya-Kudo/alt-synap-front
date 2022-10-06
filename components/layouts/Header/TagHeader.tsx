import { BoxProps, Flex } from '@chakra-ui/react'
import React from 'react'

const TagHeader = (props: BoxProps) => {
    return (
        <>
            <Flex mt="7.5vh" w="100%" h="7.5vh" pos="fixed" zIndex={14} boxShadow='md'alignItems='center' bg='white' >{props.children}
                hello
            </Flex>
        </>
    )
}

export default TagHeader