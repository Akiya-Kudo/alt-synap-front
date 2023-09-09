import { useMutation, useQuery } from '@apollo/client'
import { Avatar, Box, Flex, Heading, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { DentBord } from '../../component/atom/bords'
import { SwitchButton } from '../../component/atom/buttons'
import { Post, User } from '../../type/global'
import { GET_OTHER_USER_QUERY } from '../../util/graphql/queries/users.query.schema'
import { TOGGLE_FOLLOW } from '../../util/graphql/mutation/follows.mutation.scheme'
import { async } from '@firebase/util'
import { USER_FOLLOWEE_FRAG } from '../../util/graphql/fragment/fragment.scheme'

const TipsyPostsUserBoard = dynamic(
    () => import("../../component/standalone/TipsyPostsUserBoard"),
    { ssr: false }
);

const UsersPage: NextPage = () => {
    const router = useRouter()
    const uuid_uid: string = router.query.uuid_uid as string

    const { loading, error, data } = useQuery(GET_OTHER_USER_QUERY,  { variables: { uuid_uid: uuid_uid }})
    const userInfo = data?.other_user as User

    const [toggleFollow, {error: error_follow}] = useMutation(TOGGLE_FOLLOW, {
        variables: { followee_uuid: uuid_uid },
        update( cache, { data: { follow_toggle } } ) {
            //correct cache's displaying user7s followee num
            cache.updateFragment(
                { 
                    id: `User:{"uuid_uid":"${follow_toggle.followee_uuid}"}`,
                    fragment: USER_FOLLOWEE_FRAG 
                },
                (data) => {
                    if (data.follows_follows_followee_uuidTousers.length!=0) {
                        return ({
                            followee_num: userInfo?.followee_num!=undefined && userInfo?.followee_num  - 1,
                            follows_follows_followee_uuidTousers: []
                        })
                    }
                    else {
                        return ({
                            followee_num: userInfo?.followee_num!=undefined && userInfo?.followee_num  + 1,
                            follows_follows_followee_uuidTousers: [follow_toggle]
                        }) 
                    }
                }
            )
        }
    })

    const handleFollowButton = async (e:any) => {
        await toggleFollow()
        .catch(error => console.log(error))
    }
    
    if (error) console.log(error);
    return (
        <>
        <Head><title>{ userInfo?.user_name ? userInfo?.user_name : "Guest"}</title></Head>
            <Flex flexDir={"column"} align={"center"} mt={5} className="page">
                <DentBord maxW={"1100px"} w={"90%"} justifyContent={"start"} p={5} borderRadius={"30px"} flexDir={["column", "column", "row"]}>
                    <Avatar src={userInfo?.user_image} name={userInfo?.user_name} size={"lg"} m={1}/>
                    <Box ms={5} flexGrow={1}>
                        <Heading size={"lg"} m={1}>{userInfo?.user_name}</Heading>
                        <Text size={"lg"} fontSize={".75rem"} m={1} as={Flex} flexDir={"row"} gap={2}>
                            <Box>フォロワー : {userInfo?.followee_num!=undefined && userInfo?.followee_num}</Box>
                            <Box>フォロー : {userInfo?.follower_num}</Box>
                        </Text>
                        <Text size={"lg"} fontSize={".75rem"} m={1}>{userInfo?.comment}</Text>
                    </Box>
                    <Box>
                        {
                            userInfo?.follows_follows_followee_uuidTousers && 
                            <SwitchButton
                            fontSize={15} w={"200px"} m={1}
                            Hcolor={"tipsy_color_1"} Acolor={"tipsy_color_1v2"} Scolor={"tipsy_color_1v2"}
                            defaultChecked={userInfo?.follows_follows_followee_uuidTousers 
                                && userInfo?.follows_follows_followee_uuidTousers.length!=0} 
                                Schildren={"フォロー中"}
                                onClick={handleFollowButton}
                            >
                                フォローする
                            </SwitchButton>
                        }
                    </Box>
                </DentBord>
                
                <Box flexGrow={1}>
                        <TipsyPostsUserBoard
                        uuid_uid={uuid_uid}
                        />
                </Box>
            </Flex>
        </>
    )
}

export default UsersPage