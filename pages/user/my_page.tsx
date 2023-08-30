import React, { useContext, useEffect, useState } from 'react'
import { NextPage } from 'next'
import { Avatar, Box, Flex, Heading, Text } from '@chakra-ui/react'
import { BasicHeader } from '../../component/layout/Header';
import { DentBord } from '../../component/atom/bords';
import { AuthContext } from '../../util/hook/authContext';
import { useRouter } from 'next/router';
import { client } from '../_app';
import { READ_USER_UUID, USER_QUERY } from '../../util/graphql/queries/users.query.schema';
import { auth } from '../../util/firebase/init';
import { User } from '../../type/global';
import { ClickButton } from '../../component/atom/buttons';

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
        <Flex flexDir={"column"} align={"center"} mt={5} className="page">
            <DentBord maxW={"1100px"} w={"90%"} justifyContent={"start"} p={5} borderRadius={"30px"} flexDir={["column", "column", "row"]}>
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
            </DentBord>
        </Flex>
    </>
    )
}

export default Mypage