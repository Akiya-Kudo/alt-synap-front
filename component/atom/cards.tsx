import React from "react"
import NextImage from 'next/image';
import { Avatar, Box, Center, Grid, GridItem, Heading, HStack, Icon, Image, Link, LinkBox, LinkOverlay, Stack, Tag, Text } from "@chakra-ui/react"
import { TipsyCardProps } from "../../type/atom"
import { DentBord, FlatBord } from "./bords"
import { TagList } from "../helper/TagList"
import { AiOutlineHeart } from "react-icons/ai"
import { useGlassColorMode, useNeumorphismColorMode } from "../../util/hook/useColor"
import NextLink from 'next/link'

export const TipsyCard = ({
    uuid_pid,
    title,
    top_image,
    top_link,
    likes_num, 
    timestamp,
    content_type,
    user,
    tags,
}: TipsyCardProps) => {
    const { highlight, shadow } = useNeumorphismColorMode()
    return (
        <NextLink href="/">
            <Box
            px={4} pb={2} pt={4}
            borderRadius={20}
            flexDirection={"column"}
            transition={".2s"}
            boxShadow={`inset 5px 5px 10px -5px ${shadow}, inset -5px -5px 10px -5px ${highlight};`}
            _hover={{
                boxShadow: `inset 10px 10px 13px -5px ${shadow}, inset -10px -10px 15px -5px ${highlight};`, 
            }}
            >
                <Heading size={"sm"} w={"100%"} p={1}>
                            { title }
                </Heading>

                <Stack direction={"row"} w={"100%"} m={1}>
                    <Stack direction={"row"} >
                        { tags.map((tag) => {
                            return <NextLink href={"/topic"}><Tag id={tag.tid?.toString()} color={"gray"} fontSize={".6rem"} px={1} size="xs" colorScheme={"blue"}>{ tag.tag_name }</Tag></NextLink>
                        })}
                    </Stack>
                    <Link fontSize={".7rem"} color="teal.500" href={top_link} isExternal>{top_link.slice(0, 30) + "..."}</Link>
                </Stack>

                <Stack direction={"row"} w={"100%"} m={1}>
                    <Stack direction={"row"}>
                    <NextLink href={"/user/my_page"}>
                            <Avatar h={5} w={5} name={user.user_name} src={user.user_image} />
                    </NextLink>
                    <NextLink href={"/user/my_page"}>
                            <Center fontSize={".8rem"}>{user.user_name}</Center>
                    </NextLink>
                    </Stack>
                    <Box fontSize={".8rem"}>{ timestamp.toString().split(" ", 4).join(" / ")}</Box>
                    <Stack direction={"row"}>
                        <Center mt={"1px"}><AiOutlineHeart/></Center>
                        <Center fontSize={".8rem"}>{ likes_num }</Center>
                    </Stack>
                </Stack>
            </Box>
        </NextLink>
    )
}

export const TipsyCard_image = ({
    uuid_pid,
    title,
    top_image,
    top_link,
    likes_num, 
    timestamp,
    content_type,
    user,
    tags,
}: TipsyCardProps) => {
    const { highlight, shadow } = useNeumorphismColorMode()
    const {glass_bg_switch_natural} = useGlassColorMode()
    return (
        <NextLink href="/">
            <Box 
            className='image_box'
            position="relative" 
            maxH={300} 
            borderRadius={20}
            transition={".2s"}
            boxShadow={`7px 7px 10px -5px ${shadow}, -7px -7px 10px -5px ${highlight};`}
            _hover={{
                boxShadow: ` 10px 10px 13px -5px ${shadow},  -10px -10px 15px -5px ${highlight};`, 
            }}
            overflow="hidden"
            >
                <Image src={ top_image } objectFit="cover" w="100%" h="100%"
                borderRadius={20}
                transition=".3s"
                sx={{
                    '.image_box:hover &': {
                        transform: "scale(1.05)",
                    },
                }}
                />
                <Box 
                position="absolute" left="0" right="0" bottom="0"
                backgroundColor={glass_bg_switch_natural}
                borderBottomRadius={20}
                // backdropFilter='invert(100%)'
                backdropFilter='auto'
                backdropBlur={"10px"}
                px={4} pb={2} pt={4}
                transition={".3s"}
                sx={{
                    '.image_box:hover &': {
                    },
                }}
                >
                    <Heading size={"sm"} w={"100%"} p={1}>
                                { title }
                    </Heading>

                    <Stack direction={"row"} w={"100%"} m={1}>
                        <Stack direction={"row"} >
                            { tags.map((tag) => {
                                return <NextLink href={"/topic"}><Tag id={tag.tid?.toString()} color={"gray"} fontSize={".6rem"} px={1} size="xs" colorScheme={"blue"}>{ tag.tag_name }</Tag></NextLink>
                            })}
                        </Stack>
                        <Link fontSize={".7rem"} color="teal.500" href={top_link} isExternal>{top_link.slice(0, 30) + "..."}</Link>
                    </Stack>

                    <Stack direction={"row"} w={"100%"} m={1}>
                        <Stack direction={"row"}>
                        <NextLink href={"/user/my_page"}>
                                <Avatar h={5} w={5} name={user.user_name} src={user.user_image} />
                        </NextLink>
                        <NextLink href={"/user/my_page"}>
                                <Center fontSize={".8rem"}>{user.user_name}</Center>
                        </NextLink>
                        </Stack>
                        <Box fontSize={".8rem"}>{ timestamp.toString().split(" ", 4).join(" / ")}</Box>
                        <Stack direction={"row"}>
                            <Center mt={"1px"}><AiOutlineHeart/></Center>
                            <Center fontSize={".8rem"}>{ likes_num }</Center>
                        </Stack>
                    </Stack>
                </Box>
            </Box>
        </NextLink>
    )
}
{/* <Box width='100%' height='auto' position='absolute' bottom={1} px={6} pt={6}
borderRadius={20}
flexDirection={"column"}
transition={".2s"}
boxShadow={`inset 5px 5px 10px -5px ${shadow}, inset -5px -5px 10px -5px ${highlight};`}
_hover={{
    boxShadow: `inset 10px 10px 13px -5px ${shadow}, inset -10px -10px 15px -5px ${highlight};`, 
}}
>
    <NextImage src={top_image} layout='responsive' objectFit='cover' alt='top_image' width={100} height={100} style={{ borderRadius: '20px' }} />
</Box> */}