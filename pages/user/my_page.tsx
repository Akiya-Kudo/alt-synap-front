import React, { useContext, useEffect, useState } from 'react'
import { NextPage } from 'next'
import { Avatar, Box, Divider, Flex, Heading, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import { BasicHeader } from '../../component/layout/Header';
import { DentBord, SharpBoard } from '../../component/atom/bords';
import { AuthContext } from '../../util/hook/authContext';
import { useRouter } from 'next/router';
import { client } from '../_app';
import { READ_USER_UUID, USER_QUERY } from '../../util/graphql/queries/users.query.schema';
import { auth } from '../../util/firebase/init';
import { User } from '../../type/global';
import { ClickButton } from '../../component/atom/buttons';
import Head from 'next/head';
import { useNeumorphismColorMode } from '../../util/hook/useColor';
import { NeumTab } from '../../component/atom/indicators';
import dynamic from 'next/dynamic';

const TipsyPostsUserBoard = dynamic(
    () => import("../../component/standalone/TipsyPostsUserBoard"),
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
        const data = client.readQuery({ query: USER_QUERY, variables: { uid: auth.currentUser?.uid }});
        setUserInfo(data.user)
        }
    },[userState])
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
            isFitted variant="unstyled"
            maxW={"1100px"} w={["100%", "100%", "90%"]} my={10}
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
                            {
                                userInfo?.uuid_uid && 
                                <TipsyPostsUserBoard
                                uuid_uid={userInfo?.uuid_uid}
                                isHidePostCounter
                                />
                            }
                        </Box>
                    </TabPanel>

                    <TabPanel>
                        ！！！！！いいね一覧を取得
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