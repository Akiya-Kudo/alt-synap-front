import React, { useContext, useEffect, useState } from 'react'
import { NextPage } from 'next'
import { Avatar, Box, Divider, Flex, Heading, TabIndicator, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import { SharpBoard } from '../../component/atom/bords';
import { AuthContext } from '../../util/hook/authContext';
import { useRouter } from 'next/router';
import { client } from '../_app';
import { USER_QUERY } from '../../util/graphql/queries/users.query.schema';
import { auth } from '../../util/firebase/init';
import { Post, User } from '../../type/global';
import { ClickButton } from '../../component/atom/buttons';
import Head from 'next/head';
import { NeumTab } from '../../component/atom/indicators';
import dynamic from 'next/dynamic';
import { GET_USER_LIKED_POSTS, GET_USER_PUBLISHED_POSTS } from '../../util/graphql/queries/posts.query.scheme';
import { useLazyQuery } from '@apollo/client';
import { FollowListModal } from '../../component/standalone/FollowListModal';
import TipsyFolderBoard from '../../component/standalone/TipsyFolderBoard';

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
    
    const [tabIndex, setTabIndex] = useState(0)
    const handleTabChange = (index: number) => setTabIndex(index)
    useEffect(() => {
        if (userState=="isUser") {
            if (tabIndex==0) handleFetchUserMade()
            else if (tabIndex==1) handleFetchLiked()
        }
    },[tabIndex])


    const [getPostsUserMade, { data: data_userMade, loading: loading_userMade, error: error_userMade, fetchMore: fetchMore_userMade }] = useLazyQuery(GET_USER_PUBLISHED_POSTS, {
        variables: {
            uuid_uid: userInfo?.uuid_uid,
            selectedTagIds: null,
            offset: 0,
            no_pagenation: false
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


    const [getPostsUserLiked, { data: data_userLiked, loading: loading_userLiked, error: error_userLiked, fetchMore: fetchMore_userLiked }] = useLazyQuery(GET_USER_LIKED_POSTS, {
        variables: {
            selectedTagIds: null,
            offset: 0,
        },
    })
    const handleFetchLiked = async () => {
        getPostsUserLiked().then(res => {
            setDisplayPosts(res.data.get_posts_user_liked)
            setAllPostsCount(res.data.count_posts_user_liked)
        })
    }
    const handleFetchMoreUserLiked = async () => {
        const res = await fetchMore_userLiked({ variables: { offset: displayPosts.length }})
        setDisplayPosts([...displayPosts, ...res.data.get_posts_user_liked])
    }
    
    useEffect(() => {
        if (tabIndex==0) {
            setDisplayPosts(data_userMade?.get_posts_made_by_user)
            setAllPostsCount(data_userMade?.count_posts_made_by_user)
        }
        else if (tabIndex==1) {
            setDisplayPosts(data_userLiked?.get_posts_user_liked)
            setAllPostsCount(data_userLiked?.count_posts_user_liked)
        }
    },[data_userMade, data_userLiked])
    
    return (
    <>
    <Head><title>マイページ</title></Head>
        <Flex flexDir={"column"} align={"center"} mt={5} className="page">
            <SharpBoard 
            maxW={"1100px"} w={"90%"} justifyContent={"center"} borderRadius={"30px"} 
            flexDirection={["column", "column", "row"]} flexWrap={"wrap"}
            neumH={"shallow"} gap={5} p={[5, 7, 10]}
            >
                <Avatar src={userInfo?.user_image} name={userInfo?.user_name} size={"lg"}/>
                <Box ms={5} flexGrow={1}>
                    <Heading size={"lg"} m={2}>{userInfo?.user_name}</Heading>
                    <Text size={"lg"} fontSize={".75rem"} m={2} as={Flex} flexDir={"row"} gap={2}>
                        {
                            userInfo?.uuid_uid && userInfo?.followee_num!=null && userInfo?.followee_num!=undefined && 
                            <FollowListModal
                            follow_num={userInfo.followee_num} 
                            uuid_uid={userInfo.uuid_uid}
                            />
                        }
                        {
                            userInfo?.uuid_uid && userInfo?.follower_num!=null && userInfo?.follower_num!=undefined && 
                            <FollowListModal 
                            is_follower_list 
                            follow_num={userInfo.follower_num} 
                            uuid_uid={userInfo.uuid_uid}
                            />
                        }
                    </Text>
                    <Text size={"lg"} fontSize={".75rem"} m={1}>{userInfo?.comment}</Text>
                </Box>
                <Box>
                    <ClickButton
                    fontSize={[10, 12, 15]} w={["150px", "170px", "200px"]} m={1}
                    Hcolor={"tipsy_color_1"} Acolor={"tipsy_color_1v2"}
                    onClick={() => {router.push("/user/edit/my_profile")}}
                    >
                        プロフィールを編集する
                    </ClickButton>
                </Box>
            </SharpBoard>

            <Tabs 
            isFitted variant="unstyled" isLazy
            maxW={"1100px"} w={["95%", "95%", "90%"]} my={10}
            onChange={handleTabChange} index={tabIndex}
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
                        {/* <Box flexGrow={1}> */}
                            <TipsyPostsDisplay
                            displayPosts={displayPosts}
                            allPostsCount={allPostsCount}
                            handleFetchMore={handleFetchMoreUserMade}
                            error={error_userMade} loading={loading_userMade || userState!="isUser"}
                            not_found_message={"作成した投稿は見つかりませんでした"}
                            />
                        {/* </Box> */}
                    </TabPanel>

                    <TabPanel>
                        <TipsyPostsDisplay
                        displayPosts={displayPosts}
                        allPostsCount={allPostsCount}
                        handleFetchMore={handleFetchMoreUserLiked}
                        error={error_userLiked} loading={loading_userLiked}
                        not_found_message={"Likeした投稿は見つかりませんでした"}
                        />
                    </TabPanel>
                    <TabPanel>
                        <TipsyFolderBoard
                        uuid_uid={userInfo?.uuid_uid}
                        />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Flex>
    </>
    )
}

export default Mypage