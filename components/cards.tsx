import { Avatar, Box, Button, Grid, GridItem, Heading, HStack, Icon, LinkBox, LinkOverlay, SimpleGrid, Stack, Tag, Text } from "@chakra-ui/react"
import Link from "next/link";
import { AiFillLike } from 'react-icons/ai';
import { FaBookmark } from 'react-icons/fa';
import styles from "../styles/components/cards.module.css";













export const ContentCard = () => {
    return (
        <Box w={100} bg="yellow.200"></Box>
    )
}

export const LinkOnlyCard = ({title}: {title: string }) => {
    return (
        <LinkBox bg='white' boxShadow="md" border="0.5px solid rgb(209, 209, 209)" borderRadius={15} height='80px' >
            <Grid h='80px' templateColumns='repeat(5, 1fr)'>

                <GridItem colSpan={4} display="grid">

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
                        <Icon as={FaBookmark} w={4} h={4} color='blue.300' className={ styles.good }/>
                    </HStack>

                </GridItem>

                <GridItem colSpan={1} display="flex" alignItems="center" justifyContent="center">
                    <Link href='/signup'>
                        <Button as="a" variant='outline' colorScheme='yellow' color="yellow.500" borderRadius="200px">Link</Button>
                    </Link>
                    {/* <HStack>
                    <Tag Tag size="sm" variant='subtle'>Sample</Tag>
                    <Tag Tag size="sm" variant='subtle'>Sample</Tag>
                    <Tag Tag size="sm" variant='subtle'>Sample</Tag>

                    </HStack> */}
                </GridItem>
            </Grid>
        </LinkBox>
    )
}

export const PictureCard = () => {
    return (
        <Box w={100} bg="yellow.200"></Box>
    )
}

export const PictureLinkOnlyCard = () => {
    return (
        <Box w={100} bg="yellow.200">
            <LinkBox as='article' maxW='sm' p='5' borderWidth='1px' rounded='md'>
                <Box as='time' dateTime='2021-01-15 15:30:00 +0000 UTC'>
                    13 days ago
                </Box>
                <Heading size='md' my='2'>

                <Link href='#' passHref>
                <LinkOverlay>Some blog post</LinkOverlay>
                </Link>
                </Heading>
                <Text mb='3'>
                    Catch up on what’s been cookin’ at Smashing and explore some of the most
                    popular community resources.
                </Text>
                <Link href='/signup'>
                    Some inner link
                </Link>
            </LinkBox>
        </Box>
    )
}
