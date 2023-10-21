import React, { useContext, useEffect, useState } from 'react'
import { useQuery, useReactiveVar } from '@apollo/client'
import { Avatar, Box, Center, Flex, Heading, HStack, Link, Stack, Text, Image as ChakraImage, Tag, useBreakpoint, useBreakpointValue } from '@chakra-ui/react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FlatBord } from '../../component/atom/bords'
import { CircleLoader, NeumLoader } from '../../component/atom/loaders'
import { NeumTag } from '../../component/atom/tags'
import { GlassTagList, NeumTagList } from '../../component/helper/TagList'
import { ArticlePost, PostTag, Tag as TagType } from '../../type/global'
import { POST_CONTENT_QUERY } from '../../util/graphql/queries/posts.query.scheme'
import { AuthContext, IsAlreadyFirstFetchedAsIsUserVar } from '../../util/hook/authContext'
import { useColorOrderPick, useColorRandomPick, useGlassColorMode } from '../../util/hook/useColor'
import NextLink from 'next/link'
import { AiOutlineHeart } from 'react-icons/ai'
import { TruncatedHeading, TruncatedText } from '../../component/atom/texts'
import { ClickButtonFlat } from '../../component/atom/buttons'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import Image from 'next/image'
import { LikeButton } from '../../component/atom/likes'
import { BookMarkButton } from '../../component/atom/bookmarks'
import { client } from '../_app'
import { READ_USER_UUID_AND_FOLDERS } from '../../util/graphql/queries/users.query.schema'
import { auth } from '../../util/firebase/init'
import { PostDisplayFooterMobile } from '../../component/layout/Footer'

const ArticleEditorReadOnly = dynamic(
    () => import("../../component/atom/ArticleEditorReadOnly"),
    { ssr: false }
);

const PostPage: NextPage = () => {
    const { userState } = useContext(AuthContext);
    const router = useRouter()
    const uuid_pid = router.query.uuid_pid

    const login_user = client.readQuery({ query: READ_USER_UUID_AND_FOLDERS })?.user

    const IsAlreadyFetchedAsIsUser = useReactiveVar(IsAlreadyFirstFetchedAsIsUserVar)
    
    const { loading, error, data, refetch } = useQuery(POST_CONTENT_QUERY, { variables: { uuid_pid: uuid_pid } })

    
    const [post, setPost] = useState(data?.post)
    useEffect(()=> { setPost(data?.post) } ,[data])
    
    // reload時のuserData取得 + isSaveButtonLoading　解除
    useEffect(()=>{
        if (userState=="isUser" && (error || !IsAlreadyFetchedAsIsUser )) {
            console.log("非公開の可能性のある投稿を再フェッチ");
            refetch({ uuid_pid: uuid_pid })
            IsAlreadyFirstFetchedAsIsUserVar(true)
        }
    },[userState])
    

    const isMobile = useBreakpointValue([true, true, false])
    
    const colorList = useColorRandomPick( undefined, 5 )
    const {glass_bg_switch_deep, glass_bg_switch_natural, glass_bg_switch} = useGlassColorMode()
    const tag_colors = useColorOrderPick(["tipsy_tag_1","tipsy_tag_2", "tipsy_tag_3", "tipsy_tag_4", "tipsy_tag_5"], 5)

    // exception case of content_type or 
    if (data?.post?.content_type == 2) router.back()
    if (error || data?.post?.content_type==0) { 
        console.log(error);
        return <Flex className="page" justify={"center"} align={"center"} as={Flex} flexDir={"column"} gap={3}><CircleLoader/><Flex >投稿を見つけられませんでした</Flex></Flex>
    }
    return (
        <>
            <Head><title>{post?.title}</title></Head>
            <Flex className="page" flexDir={"row-reverse"} >
                {
                    !isMobile ?
                    <Box w={"450px"} >
                        <FlatBord
                        zIndex={1}
                        position={"sticky"} top={"135px"}
                        w={"350px"} mx={5} px={3} py={5}
                        flexDirection="column" justifyContent={"start"} alignItems={"start"}
                        >
                            <Flex direction={"row"} gap={2} align={"center"}>
                                <NextLink href={"/users/" + post?.users.uuid_uid}>
                                        <Avatar size={'sm'} name={post?.users.user_name} src={post?.users.user_image} />
                                </NextLink>
                                <NextLink href={"/users/" + post?.users.uuid_uid}>
                                        <TruncatedHeading maxLength={40} size={"sm"}>{post?.users.user_name}</TruncatedHeading>
                                </NextLink>
                            </Flex>
                            {
                                post?.users.comment && post?.users.comment!="" &&
                                <TruncatedText maxLength={90}  mt={2} mx={2} fontSize={".7rem"}>{ post?.users.comment }</TruncatedText>
                            }

                            <Stack direction={"row"} mt={5}>
                                <LikeButton 
                                likes_num={post?.likes_num} 
                                defaultIsLiked={ post?.likes && post?.likes?.length!=0 ? true : false} 
                                uuid_pid={post?.uuid_pid}
                                size={6} ms={3} mt={2}
                                />
                                <BookMarkButton
                                uuid_pid={post?.uuid_pid} folder_posts={post?.folder_posts} folders={login_user?.folders} post={post}
                                size={6} ms={3} mt={2}
                                />
                            </Stack>

                            {
                                post?.top_link && 
                                    <>
                                    <HStack fontSize={".8rem"} mt={3}>
                                        <Box>参照 : </Box>
                                        <Link href={post?.top_link} isExternal color={"text_light"}>
                                            <ExternalLinkIcon color={"tipsy_color_active_2"} fontSize={".7rem"} me={1}/>
                                            {post?.top_link.slice(0, 25) + "..."}
                                        </Link>
                                    </HStack>
                                    </>
                            }

                            <Text 
                            mt={3} fontSize={".8rem"}
                            color={"text_light"}
                            >
                                { "更新日 : " + post?.timestamp?.toString().split("-", 3).join("/").split("T", 1) }
                            </Text>
                        </FlatBord>
                    </Box>
                    
                    :
                    <PostDisplayFooterMobile
                    post={post} login_user={login_user}
                    />
                }

                    <FlatBord 
                    m={3} my={7} ml={[3, 3, 10]} mb={"80px"}
                    w={"100%"}
                    maxW={"1300px"}
                    flexDirection="column" justifyContent={"start"} 
                    >
                        
                        {
                            post?.top_image ?
                            <Box
                            width={"100%"}
                            height={[150, 200, 300]} 
                            borderTopRadius={[10, 15, 20]}
                            className='image_box'
                            position="relative" 
                            overflow="hidden"
                            >
                                <ChakraImage
                                as={Image} src={ post?.top_image } 
                                layout="fill" objectFit="cover" 
                                />
                                <Box 
                                position="absolute" left="0" right="0" bottom="0"
                                backgroundColor={glass_bg_switch_deep}
                                backdropFilter='auto'
                                backdropBlur={"10px"}
                                px={4} pb={2} pt={4}
                                display={"flex"} flexDirection="column" justifyContent={"start"} alignItems={"center"}
                                >
                                    <Heading my={2} mx={2} size={["lg", "lg", "lg"]}>{post?.title}</Heading>
                                    <Stack direction={"row"} flexWrap={"wrap"} justify={"start"} w={"100%"} mb={1}>
                                        {
                                            post?.post_tags?.map((ps_tg: PostTag) => ps_tg.tags)
                                            .map((tag: TagType, _i: number) => {
                                                return (
                                                    <NextLink href={"/topics/" + tag?.tid}  key={tag?.tid}>
                                                        <Tag 
                                                        id={tag?.tid?.toString()}
                                                        fontSize={".7rem"} borderRadius={"full"}
                                                        px={3} py={1} mx={1}
                                                        color={"text_important"} bg={tag_colors[_i]} 
                                                        transition={".2s"} cursor={"pointer"}
                                                        _hover={{ filter: 'brightness(1.2)' }}
                                                        >
                                                            { tag?.display_name }
                                                        </Tag>
                                                    </NextLink>
                                                )
                                            })
                                            
                                        }
                                    </Stack>
                                </Box>
                            </Box>

                            : 
                            <>
                                <Heading my={5} mx={2} size={["lg", "lg", "lg"]}>{post?.title}</Heading>
                                {
                                    <Box w={"100%"}>
                                        {
                                            post?.post_tags &&
                                            <NeumTagList
                                            tags={post?.post_tags.map((ps_tg: PostTag) => ps_tg.tags)} 
                                            gap={3} my={2} mx={5}
                                            colorList={colorList}
                                            />
                                        }
                                    </Box>
                                }
                            </>
                        }
                        {
                            isMobile &&
                            <Flex gap={[0, 10]} direction={["row", "row"]} w={"90%"} wrap={"wrap"}>
                                <Text mt={3} fontSize={".8rem"} color={"text_light"} whiteSpace={"nowrap"} mr={5}>
                                    { "更新日 : " + post?.timestamp?.toString().split("-", 3).join("/").split("T", 1) }
                                </Text>
                                {
                                    post?.top_link && 
                                        <>
                                        <HStack fontSize={".8rem"} mt={3} whiteSpace={"nowrap"}>
                                            <Box>参照 : </Box>
                                            <Link href={post?.top_link} isExternal color={"text_light"}>
                                                <ExternalLinkIcon color={"tipsy_color_active_2"} fontSize={".7rem"} me={1}/>
                                                {post?.top_link.slice(0, 25) + "..."}
                                            </Link>
                                        </HStack>
                                        </>
                                }
                            </Flex>
                        }
                        {
                            post?.article_contents?.content ? (
                                <ArticleEditorReadOnly
                                defaultValue={post?.article_contents?.content} 
                                maxWidth={"1100px"}
                                placeholder='本文はありません'
                                />
                            )
                            :
                            (<NeumLoader/>)

                        }
                    </FlatBord>
                </Flex>
        </>
    )
}

export default PostPage