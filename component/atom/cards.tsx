import React from "react"
import Image from 'next/image';
import NextLink from 'next/link'
import { Image as ChakraImage, Avatar, Box, Center, Link, Stack, Tag, Flex, Icon } from "@chakra-ui/react"
import { TipsyCardProps } from "../../type/atom"
import { useColorOrderPick, useGlassColorMode, useNeumorphismColorMode } from "../../util/hook/useColor"
import { TruncatedHeading, TruncatedText } from "./texts";
import { LikeButton } from "./likes";
import { GlassIconButton } from "./buttons";
import { BookMarkButton } from "./bookmarks";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { AiOutlineHeart } from "react-icons/ai"
import { TfiUnlink } from "react-icons/tfi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { EditPostMenu } from '../helper/Menus'

export const TipsyCard = ({
    isUserHidden,
    isEditable,
    folder_posts,
    folders,
    post,
}: TipsyCardProps) => {
    const { uuid_pid, title, top_link, timestamp, likes_num, users, post_tags } = post
    const { highlight, shadow } = useNeumorphismColorMode()
    const tag_colors = useColorOrderPick(["tipsy_tag_1","tipsy_tag_2", "tipsy_tag_3", "tipsy_tag_4", "tipsy_tag_5"], 5)
    return (
            <Box
            width={"100%"}
            px={4} pb={2} pt={4}
            borderRadius={[15, 18, 20]}
            transition={".3s"}
            boxShadow={`inset 6px 6px 13px -5px ${shadow}, inset -6px -6px 15px -5px ${highlight};`}
            _hover={{
                boxShadow: `inset 0px 0px 2px ${shadow}, inset -0px -0px 2px ${highlight};`, 
            }}
            >
                <NextLink href={"/posts/" + uuid_pid}>
                    <TruncatedHeading 
                    fontSize={["1.2rem", "1rem"]}
                    maxLength={60} w={"100%"} p={1} color={"text_topic_important"}
                    >
                        { title }
                    </TruncatedHeading>
                </NextLink>

                <Stack direction={"row"} w={"100%"} ms={1} my={2} flexWrap={"wrap"} gap={1}>
                    <Stack direction={"row"} flexWrap={"wrap"} justify={"start"} align={"center"}>
                        { post_tags?.map((post_tag, _i) => {
                            return (
                                <NextLink href={"/topics/" + post_tag.tags?.tid} key={post_tag.tags?.tid}>
                                    <Tag 
                                    id={post_tag.tags?.tid?.toString()} 
                                    fontSize={[".9rem", ".8rem"]} 
                                    cursor={"pointer"}
                                    px={2} py={[.2, .4]} ms={.5}
                                    size="xs"
                                    borderRadius={"full"}
                                    color={"text_topic_important"}
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
                        <Link fontSize={".7rem"} color="text_light" href={top_link} isExternal display={"flex"} alignItems={"center"}>
                            <ExternalLinkIcon color={"tipsy_color_active_2"} fontSize={".7rem"} me={1}/>
                            <TruncatedText maxLength={16} fontSize={".8rem"} cursor={"pointer"}>
                                {top_link}
                            </TruncatedText>
                        </Link>
                    }
                </Stack>

                <Stack direction={"row"} w={"100%"} m={1} wrap={"wrap"}>
                    { !isUserHidden &&
                        <Stack direction={"row"}>
                            <NextLink href={"/users/" + users.uuid_uid}>
                                <Center>
                                    <Avatar h={5} w={5} size={'xs'} name={users.user_name} src={users.user_image} cursor={"pointer"}/>
                                </Center>
                            </NextLink>
                            <NextLink href={"/users/" + users.uuid_uid}>
                                <Center>
                                    <TruncatedText maxLength={16} fontSize={".8rem"} cursor={"pointer"}>
                                        { users.user_name}
                                    </TruncatedText>
                                </Center>
                            </NextLink>
                        </Stack>
                    }

                    <Flex direction={"row"} justify={"space-between"} flexGrow={1}>
                        <Stack direction={"row"}>
                            <Center fontSize={".8rem"}>{ timestamp?.toString().split("-", 3).join("/").split("T", 1) }</Center>
                            <LikeButton 
                            likes_num={likes_num} defaultIsLiked={post.likes && post.likes?.length!=0 ? true : false} 
                            uuid_pid={uuid_pid}
                            size={4} ms={3} mt={1.5}
                            />
                            <BookMarkButton 
                            uuid_pid={uuid_pid} folder_posts={folder_posts} folders={folders} post={post}
                            size={4} ms={3} mt={1.5}
                            />
                        </Stack>
                        {
                            isEditable && 
                            <EditPostMenu uuid_pid={uuid_pid} content_type={post.content_type}/>
                        }
                    </Flex>
                </Stack>
            </Box>
    )
}

export const TipsyCard_image = ({
    isUserHidden,
    isEditable,
    folder_posts,
    folders,
    post,
}: TipsyCardProps) => {
    const { uuid_pid, title, top_link, top_image, timestamp, likes_num, users, post_tags } = post

    const { highlight, shadow } = useNeumorphismColorMode()
    const {glass_bg_switch_deep} = useGlassColorMode()
    const tag_colors = useColorOrderPick(["tipsy_tag_1","tipsy_tag_2", "tipsy_tag_3", "tipsy_tag_4", "tipsy_tag_5"], 5)
    return (
            <Box 
            width={"100%"}
            height={[ 180, 240, 300, 350]} 
            borderRadius={[15, 18, 20]}
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
                borderBottomRadius={[15, 18, 20]}
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
                        <TruncatedHeading 
                        fontSize={["1.2rem", "1rem"]}
                        maxLength={60}  w={"100%"} p={1} color={"text_topic_important"}
                        >
                            { title }
                        </TruncatedHeading>
                    </NextLink>

                    <Stack direction={"row"} w={"100%"} ms={1} my={2} flexWrap={"wrap"} gap={1}>
                        <Stack 
                        direction={"row"} flexWrap={"wrap"} justify={"start"} align={"center"}
                        >
                            { post_tags?.map((post_tag, _i) => {
                                return (
                                    <NextLink href={"/topics/" + post_tag.tags?.tid}  key={post_tag.tags?.tid}>
                                        <Tag 
                                        id={post_tag.tags?.tid?.toString()}
                                        fontSize={[".9rem", ".8rem"]} 
                                        cursor={"pointer"}
                                        px={2} py={[.2, .4]} ms={.5}
                                        size="xs" 
                                        borderRadius={"full"}
                                        color={"text_topic_important"}
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
                        <Link fontSize={".7rem"} color="text_light" href={top_link} isExternal display={"flex"} alignItems={"center"}>
                            <ExternalLinkIcon color={"tipsy_color_active_2"} fontSize={".7rem"} me={1}/>
                            <TruncatedText maxLength={16} fontSize={".8rem"} cursor={"pointer"}>
                                {top_link}
                            </TruncatedText>
                        </Link>
                        
                        }
                    </Stack>

                    <Stack direction={"row"} w={"100%"} m={1} wrap={"wrap"}>
                        { !isUserHidden &&
                            <Stack direction={"row"}>
                                <NextLink href={"/users/" + users.uuid_uid}>
                                    <Center>
                                        <Avatar h={5} w={5} size={'xs'} name={users.user_name} src={users.user_image} cursor={"pointer"}/>
                                    </Center>
                                </NextLink>
                                <NextLink href={"/users/" + users.uuid_uid}>
                                    <Center>
                                        <TruncatedText maxLength={16} fontSize={".8rem"} cursor={"pointer"}>
                                            { users.user_name}
                                        </TruncatedText>
                                    </Center>
                                </NextLink>
                            </Stack>
                        }

                        <Flex direction={"row"} justify={"space-between"} flexGrow={1}>
                            <Stack direction={"row"}>
                                <Center fontSize={".8rem"}>{ timestamp?.toString().split("-", 3).join("/").split("T", 1)}</Center>
                                <LikeButton 
                                likes_num={likes_num} defaultIsLiked={post.likes && post.likes?.length!=0 ? true : false} 
                                uuid_pid={uuid_pid}
                                size={4} ms={3} mt={1.5}
                                />
                                <BookMarkButton
                                uuid_pid={uuid_pid} folder_posts={folder_posts} folders={folders} post={post}
                                size={4} ms={3} mt={1.5}
                                />
                            </Stack>
                            {
                                isEditable && 
                                <EditPostMenu 
                                uuid_pid={uuid_pid} content_type={post.content_type} post={post}
                                />
                            }
                        </Flex>
                    </Stack>
                </Box>
            </Box>
    )
}

export const TipsyCard_link = ({
    isUserHidden,
    isEditable,
    folder_posts,
    folders,
    post,
}: TipsyCardProps) => {
    const { uuid_pid, title, top_link, timestamp, likes_num, users } = post

    const { highlight, shadow } = useNeumorphismColorMode()
    const handleLinkButtonClick = () => window.open(top_link, '_blank')
    return (
        <Box
        width={"100%"}
        px={4} pb={2} pt={4}
        borderRadius={[15, 18, 20]}
        transition={".3s"}
        boxShadow={`inset 6px 6px 13px -5px ${shadow}, inset -6px -6px 15px -5px ${highlight};`}
        _hover={{
            boxShadow: `inset 0px 0px 2px ${shadow}, inset -0px -0px 2px ${highlight};`, 
        }}
        >
            <Box display={"flex"} alignItems={"center"}>
                <GlassIconButton 
                icon={<TfiUnlink/>} aria-label="link-go"
                color={"tipsy_color_active_1"} size={"md"}
                onClick={handleLinkButtonClick}
                />
                <TruncatedHeading 
                fontSize={["1.2rem", "1rem"]}
                maxLength={60} w={"100%"} p={2} color={"text_topic_important"} 
                maxWidth={window.innerWidth > 550 ? "470px" : "270px"}
                >
                    { title }
                </TruncatedHeading>
            </Box>

            <Stack direction={"row"} w={"100%"} ms={1} my={2} flexWrap={"wrap"} gap={1}>
                <Link fontSize={".7rem"} color="text_light" href={top_link} isExternal display={"flex"} alignItems={"center"}>
                    <ExternalLinkIcon color={"tipsy_color_active_2"} fontSize={".7rem"} me={1}/>
                    <TruncatedText maxLength={16} fontSize={".8rem"} cursor={"pointer"}>
                        {top_link}
                    </TruncatedText>
                </Link>
            </Stack>

            <Stack direction={"row"} w={"100%"} m={1} wrap={"wrap"}>
                { !isUserHidden &&
                    <Stack direction={"row"}>
                        <NextLink href={"/users/" + users.uuid_uid}>
                            <Center>
                                <Avatar h={5} w={5} size={'xs'} name={users.user_name} src={users.user_image} cursor={"pointer"}/>
                            </Center>
                        </NextLink>
                        <NextLink href={"/users/" + users.uuid_uid}>
                            <Center>
                                <TruncatedText maxLength={16} fontSize={".8rem"} cursor={"pointer"}>
                                    { users.user_name}
                                </TruncatedText>
                            </Center>
                        </NextLink>
                    </Stack>
                }

                <Flex direction={"row"} justify={"space-between"} flexGrow={1}>
                    <Stack direction={"row"}>
                        <Center fontSize={".8rem"}>{ timestamp?.toString().split("-", 3).join("/").split("T", 1) }</Center>
                        <LikeButton 
                        likes_num={likes_num} defaultIsLiked={post.likes && post.likes?.length!=0 ? true : false} 
                        uuid_pid={uuid_pid}
                        size={4} ms={3} mt={1.5}
                        />
                        <BookMarkButton 
                        uuid_pid={uuid_pid} folder_posts={folder_posts} folders={folders} post={post}
                        size={4} ms={3} mt={1.5}
                        />
                    </Stack>
                    {
                        isEditable && 
                        <EditPostMenu uuid_pid={uuid_pid} content_type={post.content_type} post={post}/>
                    }
                </Flex>
            </Stack>
        </Box>
    )
}