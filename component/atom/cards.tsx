import React from "react"
import Image from 'next/image';
import NextLink from 'next/link'
import { Image as ChakraImage, Avatar, Box, Center,  Heading, HStack, Icon, Link, Stack, Tag, Text } from "@chakra-ui/react"
import { TipsyCardProps, TipsyCardWithImageProps } from "../../type/atom"
import { AiOutlineHeart } from "react-icons/ai"
import { useColorOrderPick, useGlassColorMode, useNeumorphismColorMode } from "../../util/hook/useColor"
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { TruncatedHeading } from "./texts";
import { LikeButton } from "./likes";

export const TipsyCard = ({
    uuid_pid,
    title,
    top_link,
    likes_num, 
    timestamp,
    content_type,
    user,
    post_tags,
    isLiked,
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
                    <TruncatedHeading maxLength={60} size={"sm"} w={"100%"} p={1} color={"text_important"}>
                        { title }
                    </TruncatedHeading>
                </NextLink>

                <Stack direction={"row"} w={"100%"} ms={1} my={2} flexWrap={"wrap"} gap={1}>
                    <Stack direction={"row"} flexWrap={"wrap"} justify={"center"}>
                        { post_tags?.map((post_tag, _i) => {
                            return (
                                <NextLink href={"/topics/" + post_tag.tags?.tid} key={post_tag.tags?.tid}>
                                    <Tag 
                                    id={post_tag.tags?.tid?.toString()} 
                                    fontSize={".7rem"} cursor={"pointer"}
                                    px={1} py={.2} ms={.5}
                                    size="xs" 
                                    borderRadius={10}
                                    color={"text_important"}
                                    bg={tag_colors[_i]} 
                                    transition={".2s"}
                                    _hover={{ filter: 'brightness(1.2)' }}
                                    >
                                        { 
                                            post_tag.tags?.display_name && post_tag.tags?.display_name.length > 15 
                                            ? post_tag.tags?.display_name?.slice(0, 15) + "..." 
                                            : post_tag.tags?.display_name 
                                        }
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
                        {
                            user.uuid_uid &&
                            <>
                                <NextLink href={"/users/" + user.uuid_uid}>
                                    <Center>
                                        <Avatar h={5} w={5} size={'xs'} name={user.user_name} src={user.user_image} cursor={"pointer"}/>
                                    </Center>
                                </NextLink>
                                <NextLink href={"/users/" + user.uuid_uid}>
                                    <Center fontSize={".8rem"} cursor={"pointer"}>
                                        { user.user_name && user.user_name.length>25 ?  user.user_name?.slice(0, 25) + "..." : user.user_name}
                                    </Center>
                                </NextLink>
                            </>
                        }
                    </Stack>
                    <Center fontSize={".8rem"}>{ timestamp?.toString().split("-", 3).join("/").split("T", 1) }</Center>
                    <LikeButton 
                    likes_num={likes_num} defaultIsLiked={isLiked} 
                    uuid_pid={uuid_pid}
                    size={4} ms={3} mt={1.5}
                    />
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
    post_tags,
    isLiked,
}: TipsyCardWithImageProps) => {
    const { highlight, shadow } = useNeumorphismColorMode()
    const {glass_bg_switch_deep} = useGlassColorMode()
    const tag_colors = useColorOrderPick(["tipsy_tag_1","tipsy_tag_2", "tipsy_tag_3", "tipsy_tag_4", "tipsy_tag_5"], 5)
    return (
            <Box 
            width={"100%"}
            height={350} 
            borderRadius={20}
            className='image_box'
            position="relative" 
            overflow="hidden"
            transition={".2s"}
            boxShadow={`7px 7px 10px -5px ${shadow}, -7px -7px 10px -5px ${highlight};`}
            _hover={{
                boxShadow: ` 10px 10px 13px -5px ${shadow},  -10px -10px 15px -5px ${highlight};`, 
            }}
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
                        <TruncatedHeading maxLength={60} size={"sm"} w={"100%"} p={1} color={"text_important"}>
                            { title }
                        </TruncatedHeading>
                    </NextLink>

                    <Stack direction={"row"} w={"100%"} ms={1} my={2} flexWrap={"wrap"} gap={1}>
                        <Stack direction={"row"} flexWrap={"wrap"} justify={"center"}>
                            { post_tags?.map((post_tag, _i) => {
                                return (
                                    <NextLink href={"/topics/" + post_tag.tags?.tid}  key={post_tag.tags?.tid}>
                                        <Tag 
                                        id={post_tag.tags?.tid?.toString()}
                                        fontSize={".7rem"} cursor={"pointer"}
                                        px={1} py={.2} ms={.5}
                                        size="xs" 
                                        borderRadius={10}
                                        color={"text_important"}
                                        bg={tag_colors[_i]} 
                                        transition={".2s"}
                                        _hover={{ filter: 'brightness(1.2)' }}
                                        >
                                            { 
                                                post_tag.tags?.display_name && post_tag.tags?.display_name.length > 15 
                                                ? post_tag.tags?.display_name?.slice(0, 15) + "..." 
                                                : post_tag.tags?.display_name 
                                            }
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
                            {
                                user.uuid_uid &&
                                <>
                                    <NextLink href={"/users/" + user.uuid_uid}>
                                        <Center>
                                            <Avatar h={5} w={5} size={'xs'} name={user.user_name} src={user.user_image} cursor={"pointer"}/>
                                        </Center>
                                    </NextLink>
                                    <NextLink href={"/users/" + user.uuid_uid}>
                                        <Center fontSize={".8rem"} cursor={"pointer"}>{user.user_name?.slice(0, 25) + "..."}</Center>
                                    </NextLink>
                                </>
                            }
                        </Stack>
                        <Center fontSize={".8rem"}>{ timestamp?.toString().split("-", 3).join("/").split("T", 1)}</Center>
                        <LikeButton 
                        likes_num={likes_num} defaultIsLiked={isLiked} 
                        uuid_pid={uuid_pid}
                        size={4} ms={3} mt={1.5}
                        />
                    </Stack>
                </Box>
            </Box>
    )
}