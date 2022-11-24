import { Box, Button, Flex, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import Image from "next/image";


export const MyModal = (props: any) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button onClick={onOpen}  colorScheme='orange' bg='orange.300' boxShadow='md' rounded='base' size='sm'>{props.title}</Button>

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
                            {props.title}
                        </Flex>
                    </ModalHeader>
                    <ModalCloseButton />
                    { props.children }
                    <ModalFooter>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

