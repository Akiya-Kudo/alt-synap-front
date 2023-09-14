import React, { useContext, useEffect, useState } from 'react'
import { NextPage } from 'next'
import { Avatar, Box, Divider, Flex, Heading, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import { SharpBoard } from '../../component/atom/bords';
import { AuthContext } from '../../util/hook/authContext';
import { useRouter } from 'next/router';
import { client } from '../_app';
import { USER_QUERY } from '../../util/graphql/queries/users.query.schema';
import { auth } from '../../util/firebase/init';
import { Post, User } from '../../type/global';
import { ClickButton } from '../../component/atom/buttons';
import Head from 'next/head';
import { useNeumorphismColorMode } from '../../util/hook/useColor';
import { NeumTab } from '../../component/atom/indicators';
import dynamic from 'next/dynamic';
import { GET_USER_LIKED_POSTS, GET_USER_PUBLISHED_POSTS } from '../../util/graphql/queries/posts.query.scheme';
import { useLazyQuery } from '@apollo/client';

const TipsyPostsDisplay = dynamic(
    () => import('../../component/helper/TipsyPostsDisplay'),
    { ssr: false }
);

const Mypage: NextPage  = () => {
    const { userState } = useContext(AuthContext);
    const router = useRouter()
    useEffect(() => { if (userState == 'guest')  router.replace('/') }, [userState])

    const [userInfo, setUserInfo] = useState<User>()

    // reload時のuserData取得 + isSaveButtonLoading　解除
    useEffect(()=>{
        if (userState=="isUser") {
        const data_user = client.readQuery({ query: USER_QUERY, variables: { uid: auth.currentUser?.uid }});
        setUserInfo(data_user.user)
        handleFetchUserMade()
        }
    },[userState])


    const [displayPosts, setDisplayPosts] = useState<Post[]>([])
    const [allPostsCount, setAllPostsCount] = useState<number>(0)
    const handleTabChange = (index: number) => {
        if (index==0) handleFetchUserMade()
        else if (index==1) handleFetchLiked()
    }


    const [getPostsUserMade, { loading: loading_userMade, error: error_userMade, fetchMore: fetchMore_userMade }] = useLazyQuery(GET_USER_PUBLISHED_POSTS, {
        variables: 
        {
            uuid_uid: userInfo?.uuid_uid,
            selectedTagIds: null,
            offset: 0,
        },
    })
    const handleFetchUserMade = async () => {
        getPostsUserMade().then(res => {
            setDisplayPosts(res.data.get_posts_made_by_user)
            setAllPostsCount(res.data.count_posts_made_by_user)
        })
    }
    const handleFetchMoreUserMade = async () => {
        const res = await fetchMore_userMade({ variables: { offset: displayPosts.length }})
        setDisplayPosts([...displayPosts, ...res.data.get_posts_made_by_user])
    }


    const [getPostsUserLiked, { loading: loading_userLiked, error: error_userLiked, fetchMore: fetchMore_userLiked }] = useLazyQuery(GET_USER_LIKED_POSTS, {
        variables: 
        {
            selectedTagIds: null,
            offset: 0,
        },
    })
    const handleFetchLiked = async () => {
        getPostsUserLiked().then(res => {
            console.log(res.data);
            //to omit overrapping of response data, likes array which is used to check login user is liked is not fetched, so that altanatively fake id is added
            const posts_addedFakeLikes = res.data.get_posts_user_liked.map((post: Post)=> {
                return ({ ...post, likes:  [{uuid_pid: "fake_uuid_pid", uuid_uid: "fake_uuid_uid"}]})
            })
            setDisplayPosts(posts_addedFakeLikes)
            setAllPostsCount(res.data.count_posts_user_liked)
        })
    }
    const handleFetchMoreUserLiked = async () => {
        
        const res = await fetchMore_userLiked({ variables: { offset: displayPosts.length }})
        //to omit overrapping of response data, likes array which is used to check login user is liked is not fetched, so that altanatively fake id is added
        const posts_addedFakeLikes = res.data.get_posts_user_liked.map((post: Post)=> {
            return ({ ...post, likes:  [{uuid_pid: "fake_uuid_pid", uuid_uid: "fake_uuid_uid"}]})
        })
        setDisplayPosts([...displayPosts, ...posts_addedFakeLikes])
    }
    
    return (
    <>
    <Head><title>Tipsy | マイページ</title></Head>
        <Flex flexDir={"column"} align={"center"} mt={5} className="page">
            <SharpBoard 
            maxW={"1100px"} w={"90%"} justifyContent={"start"} p={5} borderRadius={"30px"} 
            flexDir={["column", "column", "row"]}
            neumH={"shallow"}
            >
                <Avatar src={userInfo?.user_image} name={userInfo?.user_name} size={"lg"} m={1}/>
                <Box ms={5} flexGrow={1}>
                    <Heading size={"lg"} m={1}>{userInfo?.user_name}</Heading>
                    <Text size={"lg"} fontSize={".75rem"} m={1} as={Flex} flexDir={"row"} gap={2}>
                        <Box>フォロー : {userInfo?.followee_num}</Box>
                        <Box>フォロワー : {userInfo?.follower_num}</Box>
                    </Text>
                    <Text size={"lg"} fontSize={".75rem"} m={1}>{userInfo?.comment}</Text>
                </Box>
                <Box>
                    <ClickButton
                    fontSize={15} w={"200px"} m={1}
                    Hcolor={"tipsy_color_1"} Acolor={"tipsy_color_1v2"}
                    onClick={() => {router.push("/user/edit/my_profile")}}
                    >
                        プロフィールを編集する
                    </ClickButton>
                </Box>
            </SharpBoard>

            <Tabs 
            isFitted variant="unstyled" isLazy
            maxW={"1100px"} w={["100%", "100%", "90%"]} my={10}
            onChange={handleTabChange}
            >
                <TabList>
                    <NeumTab>My Posts</NeumTab>
                    <NeumTab>Likes</NeumTab>
                    <NeumTab>Folders</NeumTab>
                </TabList>
                <TabIndicator
                height="1.5px"
                bg="tipsy_color_3"
                borderRadius="full"
                />
                <TabPanels>
                    <TabPanel>
                        <Box flexGrow={1}>
                            <TipsyPostsDisplay
                            displayPosts={displayPosts}
                            allPostsCount={allPostsCount}
                            handleFetchMore={handleFetchMoreUserMade}
                            error={error_userMade} loading={loading_userMade || userState!="isUser"}
                            />
                        </Box>
                    </TabPanel>

                    <TabPanel>
                        <TipsyPostsDisplay
                        displayPosts={displayPosts}
                        allPostsCount={allPostsCount}
                        handleFetchMore={handleFetchMoreUserLiked}
                        error={error_userLiked} loading={loading_userLiked}
                        />
                    </TabPanel>
                    <TabPanel>
                    <p>three</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Flex>
    </>
    )
}

export default Mypage