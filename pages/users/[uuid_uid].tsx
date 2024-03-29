import { useMutation, useQuery, useReactiveVar } from '@apollo/client'
import { Avatar, Box, Flex, Heading, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { DentBord } from '../../component/atom/bords'
import { SwitchButton } from '../../component/atom/buttons'
import { Post, User } from '../../type/global'
import { GET_OTHER_USER_QUERY, USER_QUERY } from '../../util/graphql/queries/users.query.schema'
import { TOGGLE_FOLLOW } from '../../util/graphql/mutation/follows.mutation.scheme'
import { USER_FOLLOWEE_FRAG } from '../../util/graphql/fragment/fragment.scheme'
import { FollowListModal } from '../../component/standalone/FollowListModal'
import { AuthContext, IsAlreadyFirstFetchedAsIsUserVar, LoginToggleContext } from '../../util/hook/authContext'
import { auth } from '../../util/firebase/init'
import { client } from '../_app'

const TipsyPostsUserBoard = dynamic(
    () => import("../../component/standalone/TipsyPostsUserBoard"),
    { ssr: false }
);

const UsersPage: NextPage = () => {
    
    const router = useRouter()
    const { userState } = useContext(AuthContext);
    const { onOpen_login } = useContext(LoginToggleContext);
    const uuid_uid: string = router.query.uuid_uid as string
    const IsAlreadyFetchedAsIsUser = useReactiveVar(IsAlreadyFirstFetchedAsIsUserVar)

    const { loading, error, data, refetch } = useQuery(GET_OTHER_USER_QUERY,  { variables: {uuid_uid: uuid_uid}, skip: !uuid_uid })
    const userInfo = data?.other_user as User
    const isFollowed = userInfo?.follows_follows_followee_uuidTousers && userInfo?.follows_follows_followee_uuidTousers.length!=0

    const [toggleFollow, {error: error_follow}] = useMutation(TOGGLE_FOLLOW, {
        variables: { followee_uuid: uuid_uid },
        update( cache, { data: { follow_toggle } } ) {
            //correct cache's displaying user7s followee num
            // update followee user's follow relation & num
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
            //update login user's num
            cache.updateQuery({
                query: USER_QUERY },
            (data) => {
                if (isFollowed) {
                    return ({ user: { follower_num: data.user.follower_num - 1 }})
                } else {
                    return ({ user: { follower_num: data.user.follower_num + 1 }})
                }
                
            }
        )
        }
    })

    const handleFollowButton = async (e:any) => {
        if (userState=='isUser') {
            await toggleFollow()
            .catch(error => console.log(error))
        } else if (userState=='guest') {
            onOpen_login()
        }
    }

    // reload時のlike state更新
    useEffect(()=>{
        if (userState=="isUser" && !IsAlreadyFetchedAsIsUser) {
            console.log("refetching to refresh follow state");
            refetch() // same variables with first fetch of useQuery
            IsAlreadyFirstFetchedAsIsUserVar(true)
        }
    },[userState])

    useEffect(()=>{
        //the case linked to logined-user-page from search page before userState is not fetched, redirect to my-page
        const user_data = client.readQuery({ query: USER_QUERY });
        if (uuid_uid && user_data?.user?.uuid_uid == uuid_uid ) router?.push({ pathname: '/user/my_page' })
    },[uuid_uid])

    if (error ||  error_follow) {
        if (error) console.log(error);
        if (error_follow) console.log(error);
    }
    return (
        <>
        <Head><title>{ userInfo?.user_name ? userInfo?.user_name : "Guest"}</title></Head>
            <Flex flexDir={"column"} align={"center"} mt={5} className="page">
                <DentBord 
                maxW={"1100px"} w={"90%"} justifyContent={"start"} p={7} borderRadius={"30px"} 
                flexDir={["column", "column", "row"]}
                >
                    <Flex flexDir={["column", "row"]} flexGrow={1} alignItems={"center"}>
                        <Avatar src={userInfo?.user_image} name={userInfo?.user_name} size={["xl", "lg"]} m={1}/>

                        <Box ms={[0, 5, 5]}>
                            <Heading size={"lg"} m={1}>{userInfo?.user_name}</Heading>
                            <Text size={"lg"} fontSize={".75rem"} m={1} as={Flex} flexDir={"row"} gap={2}>
                                {
                                    userInfo?.followee_num!=null && userInfo?.followee_num!=undefined && 
                                    <FollowListModal 
                                    follow_num={userInfo.followee_num} 
                                    uuid_uid={uuid_uid}
                                    />
                                }
                                {
                                    userInfo?.follower_num!=null && userInfo?.follower_num!=undefined && 
                                    <FollowListModal 
                                    is_follower_list 
                                    follow_num={userInfo.follower_num} 
                                    uuid_uid={uuid_uid}
                                    />
                                }
                            </Text>
                            <Text size={"lg"} fontSize={".75rem"} m={1}>{userInfo?.comment}</Text>
                        </Box>
                    </Flex>

                    <Box>
                        {
                            userInfo?.follows_follows_followee_uuidTousers && 
                            <SwitchButton
                            fontSize={[10, 12, 15, 22, 30, 40]}
                            mx={1} my={[8,8,0]} px={10} py={[7, 5, 4]}
                            Hcolor={"tipsy_color_1"} Acolor={"tipsy_color_1v2"} Scolor={"tipsy_color_1v2"}
                            defaultChecked={ isFollowed }
                            Schildren={"フォロー中"}
                            onClick={handleFollowButton}
                            ActiveDisabled={userState!='isUser'}
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

