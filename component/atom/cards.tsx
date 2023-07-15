import React from "react"
import Image from 'next/image';
import NextLink from 'next/link'
import { Image as ChakraImage, Avatar, Box, Center,  Heading, HStack, Icon, Link, Stack, Tag, Text } from "@chakra-ui/react"
import { TipsyCardProps, TipsyCardWithImageProps } from "../../type/atom"
import { AiOutlineHeart } from "react-icons/ai"
import { useColorOrderPick, useGlassColorMode, useNeumorphismColorMode } from "../../util/hook/useColor"
import { ExternalLinkIcon } from "@chakra-ui/icons";

export const TipsyCard = ({
    uuid_pid,
    title,
    top_link,
    likes_num, 
    timestamp,
    content_type,
    user,
    tags,
}: TipsyCardProps) => {
    const { highlight, shadow } = useNeumorphismColorMode()
    const tag_colors = useColorOrderPick(["tipsy_tag_1","tipsy_tag_2", "tipsy_tag_3", "tipsy_tag_4", "tipsy_tag_5"], 5)
    return (
            <Box
            width={"100%"}
            px={4} pb={2} pt={4}
            borderRadius={20}
            flexDirection={"column"}
            transition={".3s"}
            boxShadow={`inset 6px 6px 13px -5px ${shadow}, inset -6px -6px 15px -5px ${highlight};`}
            _hover={{
                boxShadow: `inset 0px 0px 2px ${shadow}, inset -0px -0px 2px ${highlight};`, 
            }}
            >
                <NextLink href={"/posts/" + uuid_pid}>
                    <Heading size={"sm"} w={"100%"} p={1} color={"text_important"}>
                                { title }
                    </Heading>
                </NextLink>

                <Stack direction={"row"} w={"100%"} ms={1} my={2} flexWrap={"wrap"} gap={1}>
                    <Stack direction={"row"} flexWrap={"wrap"} gap={.3} justify={"center"}>
                        { tags?.map((tag, _i) => {
                            return (
                                <NextLink href={"/topics/" + tag.tid}>
                                    <Tag 
                                    id={tag.tid?.toString()} 
                                    fontSize={".7rem"} 
                                    px={1} py={.2}
                                    size="xs" 
                                    borderRadius={10}
                                    color={"text_normal"}
                                    bg={tag_colors[_i]} 
                                    transition={".2s"}
                                    _hover={{ filter: 'brightness(1.2)' }}
                                    >
                                        { tag.tag_name }
                                    </Tag>
                                </NextLink>
                            )
                        })}
                    </Stack>
                    {
                        top_link &&
                        <Link fontSize={".7rem"} color="text_light" href={top_link} isExternal>
                            <ExternalLinkIcon color={"tipsy_color_active_2"} fontSize={".7rem"} me={1}/>
                            {top_link.slice(0, 30) + "..."}
                        </Link>
                    }
                </Stack>

                <Stack direction={"row"} w={"100%"} m={1}>
                    <Stack direction={"row"}>
                    <NextLink href={"/users/" + user.uuid_uid}>
                            <Avatar h={5} w={5} size={'xs'} name={user.user_name} src={user.user_image} />
                    </NextLink>
                    <NextLink href={"/users/" + user.uuid_uid}>
                            <Center fontSize={".8rem"}>{user.user_name}</Center>
                    </NextLink>
                    </Stack>
                    <Box fontSize={".8rem"}>{ timestamp.toString().split("-", 3).join("/").split("T", 1)}</Box>
                    <Stack direction={"row"}>
                        <Center mt={"1px"}><AiOutlineHeart/></Center>
                        <Center fontSize={".8rem"}>{ likes_num }</Center>
                    </Stack>
                </Stack>
            </Box>
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
}: TipsyCardWithImageProps) => {
    const { highlight, shadow } = useNeumorphismColorMode()
    const {glass_bg_switch_deep} = useGlassColorMode()
    const tag_colors = useColorOrderPick(["tipsy_tag_1","tipsy_tag_2", "tipsy_tag_3", "tipsy_tag_4", "tipsy_tag_5"], 5)
    return (
            <Box 
            width={"100%"}
            height={350} 
            className='image_box'
            position="relative" 
            borderRadius={20}
            transition={".2s"}
            boxShadow={`7px 7px 10px -5px ${shadow}, -7px -7px 10px -5px ${highlight};`}
            _hover={{
                boxShadow: ` 10px 10px 13px -5px ${shadow},  -10px -10px 15px -5px ${highlight};`, 
            }}
            overflow="hidden"
            >
                <NextLink href={"/posts/" + uuid_pid}>
                    <ChakraImage
                    as={Image} 
                    layout="fill"
                    src={ top_image } 
                    objectFit="cover" 
                    transition=".3s"
                    sx={{
                        '.image_box:hover &': {
                            transform: "scale(1.05)",
                        },
                    }}
                    />
                </NextLink>
                <Box 
                position="absolute" left="0" right="0" bottom="0"
                backgroundColor={glass_bg_switch_deep}
                borderBottomRadius={20}
                backdropFilter='auto'
                backdropBlur={"10px"}
                px={4} pb={2} pt={4}
                transition={".3s"}
                sx={{
                    '.image_box:hover &': {
                    },
                }}
                >
                    <NextLink href={"/posts/" + uuid_pid}>
                        <Heading size={"sm"} w={"100%"} p={1} color={"text_important"}>
                                    { title }
                        </Heading>
                    </NextLink>

                    <Stack direction={"row"} w={"100%"} ms={1} my={2} flexWrap={"wrap"} gap={1}>
                        <Stack direction={"row"} flexWrap={"wrap"} gap={.3} justify={"center"}>
                            { tags?.map((tag, _i) => {
                                return (
                                    <NextLink href={"/topics/" + tag.tid}>
                                        <Tag 
                                        id={tag.tid?.toString()} 
                                        fontSize={".7rem"} 
                                        px={1} py={.2}
                                        size="xs" 
                                        borderRadius={10}
                                        color={"text_normal"}
                                        bg={tag_colors[_i]} 
                                        transition={".2s"}
                                        _hover={{ filter: 'brightness(1.2)' }}
                                        >
                                            { tag.tag_name }
                                        </Tag>
                                        </NextLink>
                                )
                            })}
                        </Stack>
                        {
                        top_link &&
                        <NextLink href={top_link} passHref>
                            <Link fontSize={".7rem"} color="text_light" href={top_link} isExternal>
                                <ExternalLinkIcon color={"tipsy_color_active_2"} fontSize={".7rem"} me={1}/>
                                {top_link.slice(0, 30) + "..."}
                            </Link>
                        </NextLink>
                        
                        }
                    </Stack>

                    <Stack direction={"row"} w={"100%"} m={1}>
                        <Stack direction={"row"}>
                        <NextLink href={"/users/" + user.uuid_uid}>
                                <Avatar h={5} w={5} size={'xs'} name={user.user_name} src={user.user_image} />
                        </NextLink>
                        <NextLink href={"/users/" + user.uuid_uid}>
                                <Center fontSize={".8rem"}>{user.user_name}</Center>
                        </NextLink>
                        </Stack>
                        <Box fontSize={".8rem"}>{ timestamp.toString().split("-", 3).join("/").split("T", 1)}</Box>
                        <Stack direction={"row"}>
                            <Center mt={"1px"}><AiOutlineHeart/></Center>
                            <Center fontSize={".8rem"}>{ likes_num }</Center>
                        </Stack>
                    </Stack>
                </Box>
            </Box>
    )
}