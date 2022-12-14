import { Avatar, Box, Button, Center, Grid, GridItem, Heading, HStack, Icon, LinkBox, LinkOverlay, SimpleGrid, Stack, Text, VStack } from "@chakra-ui/react"
import Image from "next/image";
import Link from "next/link";
import { AiFillLike, AiOutlinePicture } from 'react-icons/ai';
import { FaLink, FaListUl, FaPen } from 'react-icons/fa';
import styles from "../styles/components/cards.module.css";













export const ContentCard = ({title}: {title: string }) => {
    return (
        <LinkBox bg='white' boxShadow="md" border="0.5px solid rgb(209, 209, 209)" borderRadius={15} height='80px' >
            <Grid h='80px' templateColumns='repeat(6, 1fr)' transition="0.2s" borderRadius="15"
            _hover={{ 
                bg: "blackAlpha.200",
                filter: "grayscale(0.3)",
            }}
            >

                <GridItem colSpan={5} display="grid">

                    <HStack ms={3}>
                        <Link href='/' passHref>
                            <LinkOverlay>
                                <Heading color="gray.600"  size='sm' className={ styles.topic }>{title}</Heading>
                            </LinkOverlay>
                        </Link>
                    </HStack>

                    <HStack ms={3}>
                        <Avatar size='xs' name='Dan Abrahmov' src='https://bit.ly/dan-abramov'/>
                        <Text color="gray.500" fontSize={15} whiteSpace={"nowrap"}>Dan Abrahmov</Text>
                        <Text color="gray.500" fontSize={13} >1 day ago</Text>
                        <SimpleGrid columns={2}>
                            <Icon as={AiFillLike} w={5} h={5} color='blackAlpha.400'/>
                            <Text color="gray.500" fontSize={13} >100</Text>
                        </SimpleGrid>
                    </HStack>

                </GridItem>

                <GridItem colSpan={1} minWidth="100px" display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={1} p={1}>
                    {/* <Tag h={8} borderRadius="100px" variant='outline' colorScheme='yellow.300' color="yellow.300"><Icon as={FaListUl} /></Tag> */}
                    <Center h={8} minWidth={ 10 } maxWidth={ 20 }  borderRadius="100px" border={"1px solid #F6AD55"} color="orange.300"><Icon as={AiOutlinePicture} /></Center>
                    <Center h={8} minWidth={ 10 } maxWidth={ 20 } borderRadius="100px" border={"1px solid #F6AD55"} color="orange.300"><Icon as={FaListUl} /></Center>
                    <Center h={8} minWidth={ 10 } maxWidth={ 20 } borderRadius="100px" border={"1px solid #F6AD55"} color="orange.300"><Icon as={FaPen} /></Center>
                    <Link href='/signup'>
                        <Button as="a" h={8} minWidth={ 10 } maxWidth={ 20 } borderRadius="100px" colorScheme='orange' bg="orange.300" color="white" ><Icon as={FaLink} /></Button>
                    </Link>
                </GridItem>
            </Grid>
        </LinkBox>
    )
}

export const LinkOnlyCard = ({title}: {title: string }) => {
    return (
        <LinkBox bg='white' boxShadow="md" border="0.5px solid rgb(209, 209, 209)" borderRadius={15} height='80px' >
            <Grid h='80px' templateColumns='repeat(6, 1fr)' transition="0.2s" borderRadius="15"
            _hover={{ 
                bg: "blackAlpha.200",
                filter: "grayscale(0.3)",
            }}
            >

                <GridItem colSpan={5} display="grid">

                    <HStack ms={3}>
                        <Link href='/' passHref>
                            <LinkOverlay>
                            <Heading color="gray.600"  size='sm' className={ styles.topic }>{title}</Heading>
                            </LinkOverlay>
                        </Link>
                    </HStack>

                    <HStack ms={3}>
                        <Avatar size='xs' name='Dan Abrahmov' src='https://bit.ly/dan-abramov'/>
                        <Text color="gray.500" fontSize={15} whiteSpace={"nowrap"}>Dan Abrahmov</Text>
                        <Text color="gray.500" fontSize={13} >1 day ago</Text>
                        <SimpleGrid columns={2}>
                            <Icon as={AiFillLike} w={5} h={5} color='red.300' className={ styles.good }/>
                            <Text color="gray.500" fontSize={13} >100</Text>
                        </SimpleGrid>
                    </HStack>

                </GridItem>

                <GridItem colSpan={1} display="flex" alignItems="center" justifyContent="center">
                    <Link href='/signup'>
                        <Button as="a" colorScheme='orange'  bg="orange.300"  color="white" borderRadius="100px"><Icon as={FaLink} /></Button>
                    </Link>
                </GridItem>
            </Grid>
        </LinkBox>
    )
}

export const PictureContentCard = ({title, src}: {title: string, src: string }) => {
    return (
        <LinkBox bg='white' boxShadow="md" border="0.5px solid rgb(209, 209, 209)" borderRadius={15} height='190px' >
            <Grid h='190px' templateColumns='repeat(2, 1fr)' transition="0.2s" borderRadius="15"
            _hover={{ 
                bg: "blackAlpha.200",
                filter: "grayscale(0.3)",
            }}
            >
                <GridItem pos="relative">
                    <Image className={ styles.cardImage } layout="fill" src={ src } alt=""/>
                </GridItem>
                <GridItem >
                    <Grid 
                    templateColumns="repeat(3, 1fr)"
                    templateRows="repeat(2, 1fr)"
                    h="100%"
                    >
                        <GridItem colSpan={3}>
                            <Link href='/' passHref>
                                <LinkOverlay>
                                    <Heading p={2} mt="5px" color="gray.600"  size='sm' lineHeight={"200%"} className={ styles.topic }>{title}</Heading>
                                </LinkOverlay>
                            </Link>
                        </GridItem>
                        <GridItem colSpan={2}  display="flex" alignItems="center" ms={3}>
                            <Stack>
                                <HStack>                                    
                                    <Avatar size='xs' name='Dan Abrahmov' src='https://bit.ly/dan-abramov'/>
                                    <Text color="gray.500" fontSize={15} whiteSpace={"nowrap"}>Dan Abrahmov</Text>
                                </HStack>
                                <HStack ms={100}>
                                    <Text color="gray.500" fontSize={13} >1 day ago</Text>
                                    <SimpleGrid columns={2}>
                                        <Icon as={AiFillLike} w={5} h={5} color='red.300' className={ styles.good }/>
                                        <Text color="gray.500" fontSize={13} >100</Text>
                                    </SimpleGrid>
                                </HStack>
                            </Stack>
                        </GridItem>
                        <GridItem colSpan={1} minWidth="100px" display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={1} p={1}>
                            {/* <Tag h={8} borderRadius="100px" variant='outline' colorScheme='yellow.300' color="yellow.300"><Icon as={FaListUl} /></Tag> */}
                            <Center h={8} minWidth={ 10 } maxWidth={ 20 }  borderRadius="100px" border={"1px solid #F6AD55"} color="orange.300"><Icon as={AiOutlinePicture} /></Center>
                            <Center h={8} minWidth={ 10 } maxWidth={ 20 } borderRadius="100px" border={"1px solid #F6AD55"} color="orange.300"><Icon as={FaListUl} /></Center>
                            <Center h={8} minWidth={ 10 } maxWidth={ 20 } borderRadius="100px" border={"1px solid #F6AD55"} color="orange.300"><Icon as={FaPen} /></Center>
                            <Link href='/signup'>
                                <Button as="a" h={8} minWidth={ 10 } maxWidth={ 20 } borderRadius="100px" colorScheme='orange' bg="orange.300" color="white" ><Icon as={FaLink} /></Button>
                            </Link>
                        </GridItem>
                    </Grid>
                </GridItem>
            </Grid>
        </LinkBox>
    )
}

export const PictureLinkOnlyCard = ({title, src}: {title: string, src: string }) => {
    return (
        <LinkBox bg='white' boxShadow="md" border="0.5px solid rgb(209, 209, 209)" borderRadius={15} height='190px' >
            <Grid h='190px' templateColumns='repeat(2, 1fr)' transition="0.2s" borderRadius="15"
            _hover={{ 
                bg: "blackAlpha.200",
                filter: "grayscale(0.3)",
            }}
            >
                <GridItem pos="relative">
                    <Image className={ styles.cardImage } layout="fill" src={ src } alt=""/>
                </GridItem>
                <GridItem >
                    <Grid 
                    templateColumns="repeat(3, 1fr)"
                    templateRows="repeat(2, 1fr)"
                    h="100%"
                    >
                        <GridItem colSpan={3}>
                            <Link href='/' passHref>
                                <LinkOverlay>
                                    <Heading p={2} mt="5px" color="gray.600"  size='sm' lineHeight={"200%"} className={ styles.topic }>{title}</Heading>
                                </LinkOverlay>
                            </Link>
                        </GridItem>
                        <GridItem colSpan={2}  display="flex" alignItems="center" ms={3}>
                            <Stack>
                                <HStack>                                    
                                    <Avatar size='xs' name='Dan Abrahmov' src='https://bit.ly/dan-abramov'/>
                                    <Text color="gray.500" fontSize={15} whiteSpace={"nowrap"}>Dan Abrahmov</Text>
                                </HStack>
                                <HStack ms={100}>
                                    <Text color="gray.500" fontSize={13} >1 day ago</Text>
                                    <SimpleGrid columns={2}>
                                        <Icon as={AiFillLike} w={5} h={5} color='red.300' className={ styles.good }/>
                                        <Text color="gray.500" fontSize={13} >100</Text>
                                    </SimpleGrid>
                                </HStack>
                            </Stack>
                        </GridItem>
                        <GridItem colSpan={1}  display="flex" alignItems="center" justifyContent="center">
                                <Link href='/signup'>
                                    <Button as="a" colorScheme='orange'  bg="orange.300"  color="white" borderRadius="100px"><Icon as={FaLink} /></Button>
                                </Link>
                        </GridItem>
                    </Grid>
                </GridItem>
            </Grid>
        </LinkBox>
    )
}
