import { makeVar, useQuery, useReactiveVar } from "@apollo/client"
import { Post, SortType } from "../../type/global";
import { POSTS_SEARCH } from '../../util/graphql/queries/posts.query.scheme';
import { TipsyCard, TipsyCard_image, TipsyCard_link } from '../atom/cards'
import PinterestGrid from 'rc-pinterest-grid';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Center, Heading, Highlight, Text, VStack } from "@chakra-ui/react";
import { CircleLoader, NeumLoader } from "../atom/loaders";
import { DentBord, TabBord } from "../atom/bords";
import { ClickButton, SwitchButtonConcave, SwitchButton_tab } from "../atom/buttons";
import { useContext, useEffect, useState } from "react";
import { TabSwitchGroup } from "../helper/TabRadioGroup";
import { AuthContext, IsAlreadyFirstFetchedAsIsUserVar,  } from "../../util/hook/authContext";
import { client } from "../../pages/_app";
import { READ_USER_UUID } from "../../util/graphql/queries/users.query.schema";
import { auth } from "../../util/firebase/init";

const TipsyPostsSearchBoard = ({ query_text, selectedTid, isTagBoardDisplay, handleTagDisplay }: {query_text: string | null, selectedTid: number | null, isTagBoardDisplay?: boolean, handleTagDisplay?: any}) => {
    const { userState } = useContext(AuthContext)
    const IsAlreadyFetchedAsIsUser = useReactiveVar(IsAlreadyFirstFetchedAsIsUserVar)
    

    const [displayPosts, setDisplayPosts] = useState<Post[]>([])
    const [sortType, setSortType] = useState<SortType>("人気順")
    
    const { loading, error, data, fetchMore, refetch } = useQuery(POSTS_SEARCH, {
        variables: 
        {
            searchString: query_text,
            selectedTagId: selectedTid,
            offset: 0,
            sortType: sortType=="人気順" ? 0 : 1
        },
        fetchPolicy: 'network-only'
        // pollInterval: 600000, // 600秒間はキャッシュからフェッチされる
    })

    const handleFetchMore = async () => {
        const res = await fetchMore({
            variables: {
                offset: displayPosts.length,
                sortType: sortType=="人気順" ? 0 : 1
            }
        })
        setDisplayPosts([...displayPosts, ...res.data.search_post])
        
    }

    //これを呼び出すとmerge関数との兼ね合いによって重複した投稿がマージされる => ??? 重複を制御するマージ関数が機能していない？
    const handleChangeSort = async (e: SortType) => {
        if (e != sortType) {
            setSortType(e)

            const cache = client.readQuery({ query: POSTS_SEARCH, variables: { 
                searchString: query_text,
                selectedTagId: selectedTid,
                offset: 0,
                sortType: e=="人気順" ? 0 : 1
            }})

            if (cache?.search_post) return setDisplayPosts(cache.search_post)
            else {
                const res = await fetchMore({
                    variables: {
                        sortType: e=="人気順" ? 0 : 1
                    }
                })
                setDisplayPosts( res.data.search_post )
            }
            
        }
    }
    
    // reload時のlike state更新 : this is needed only when reloading search page, so reactive var will updated when this is called or the other page roaded in context. 
    useEffect(()=>{
        if (userState=="isUser" && !IsAlreadyFetchedAsIsUser) {
            console.log("refetching to refresh like state");
            refetch(
                {
                    searchString: query_text,
                    selectedTagId: selectedTid,
                    offset: 0,
                    sortType: 0
                },
            )
            IsAlreadyFirstFetchedAsIsUserVar(true)
        }
    },[userState])
    // set display posts by fetch
    useEffect(() => {setDisplayPosts(data?.search_post)}, [data])
    
    

    const login_user_uuid = client.readQuery({ query: READ_USER_UUID, variables: { uid: auth.currentUser?.uid }})?.user.uuid_uid

    if (loading) return <Center mt={20}><CircleLoader/></Center>
    
    if (error) {
        return (
        <Center mt={20}>
            <Alert status='error' maxW={"70%"} borderRadius={10} variant='subtle' flexDirection='column' alignItems='center' justifyContent='center' textAlign='center' height='200px'>
                <AlertIcon />
                <AlertTitle>投稿検索でERRORが発生しました</AlertTitle>
                <AlertDescription>{error.name + " : " + error.message}</AlertDescription>
            </Alert>
        </Center>
        )
    }
    return (
        <>
            <Center my={1} w={"100%"} maxW={1100} flexDir={"column"} marginX="auto">
                <DentBord 
                w={130} h={"40px"} 
                justifyContent="center" alignItems={"center"} 
                my={3} borderRadius={"full"} 
                position={"relative"}
                >
                    <Heading size={"sm"}>Post 
                        <Highlight query={ data?.count_total_posts.toString()} styles={{fontSize: "0.8rem" }}>
                            { data.count_total_posts ? " " + data.count_total_posts.toString() : " " + "0"}
                        </Highlight>
                    </Heading>
                    {
                        isTagBoardDisplay ||
                        <SwitchButtonConcave 
                        onClick={handleTagDisplay}
                        position={"absolute"} left={-120} top={1.5} h={6} 
                        fontSize={10} Ashadow={false}
                        color={"white"} Hcolor={"whiteAlpha.600"} Acolor={"whiteAlpha.100"}
                        bgGradient={"linear(to-l, tipsy_color_2, tipsy_color_3)"} 
                        HbgGradient={"linear(to-l, tipsy_color_active_2, tipsy_color_active_3)"}
                        >
                            タグ検索ON
                        </SwitchButtonConcave>
                    }
                    <TabSwitchGroup
                    optionLeft="人気順"
                    optionRight="新着順"
                    defaultValue="人気順"
                    onChange={ handleChangeSort }
                    position={"absolute"} left={200} top={-0.5}
                    fontSize={10} gap={1} p={1} borderRadius={"full"}/>
                </DentBord>
            </Center>
            <Center mb={5} w={"100%"} flexDir={"column"} >
                {
                displayPosts && displayPosts?.length > 0 && (
                    <>
                        <PinterestGrid
                        columns={3}      
                        columnWidth={window.innerWidth > 550 ? 550 : 350}
                        gutterWidth={30} 
                        gutterHeight={20}
                        responsive={true}
                        >
                            { displayPosts.map((post: Post) => {
                                const is_login_user_post: boolean = login_user_uuid && login_user_uuid == post.uuid_uid 
                                    ? true : false
                                
                                if (post.top_image) {
                                    return (
                                        <TipsyCard_image
                                        uuid_pid={post.uuid_pid}
                                        title={post.title}
                                        top_link={post.top_link }
                                        top_image={post.top_image}
                                        likes_num={post.likes_num}
                                        timestamp={post.timestamp}
                                        content_type={post.content_type}
                                        user={{
                                            uuid_uid: post.users?.uuid_uid,
                                            user_name: post.users?.user_name,
                                            user_image: post.users?.user_image
                                        }}
                                        post_tags={post.post_tags}
                                        isLiked={ post.likes && post.likes?.length!=0 ? true : false}
                                        isPostOrner={is_login_user_post}
                                        />
                                    )
                                } else if (post.content_type==2) {
                                    return (
                                        <TipsyCard_link
                                        uuid_pid={post.uuid_pid}
                                        title={post.title}
                                        top_link={post.top_link}
                                        likes_num={post.likes_num}
                                        timestamp={post.timestamp}
                                        content_type={post.content_type}
                                        user={{
                                            uuid_uid: post.users?.uuid_uid,
                                            user_name: post.users?.user_name,
                                            user_image: post.users?.user_image
                                        }}
                                        post_tags={post.post_tags}
                                        isLiked={ post.likes && post.likes?.length!=0 ? true : false}
                                        isPostOrner={is_login_user_post}
                                        />
                                    )
                                }
                                else {
                                    return (
                                        <TipsyCard
                                        uuid_pid={post.uuid_pid}
                                        title={post.title}
                                        top_link={post.top_link}
                                        likes_num={post.likes_num}
                                        timestamp={post.timestamp}
                                        content_type={post.content_type}
                                        user={{
                                            uuid_uid: post.users?.uuid_uid,
                                            user_name: post.users?.user_name,
                                            user_image: post.users?.user_image
                                        }}
                                        post_tags={post.post_tags}
                                        isLiked={ post.likes && post.likes?.length!=0 ? true : false}
                                        isPostOrner={is_login_user_post}
                                        />
                                    )
                                }
                            })}
                        </PinterestGrid>
                        {
                            displayPosts.length < data.count_total_posts &&
                            (<Center m={10}>
                                <ClickButton
                                size={"md"} fontSize={16}
                                Hcolor={"tipsy_color_3"}
                                onClick={handleFetchMore}
                                >もっと見る</ClickButton>
                            </Center>)
                        }
                    </>
                )}
                { 
                displayPosts && displayPosts.length == 0 && (
                    <VStack m={5}>
                        <Text m={5}>検索条件の投稿は見つかりませんでした</Text>
                        <Center p={5}><NeumLoader/></Center>
                    </VStack>
                )}
            </Center>
        </>
    )
}

export default TipsyPostsSearchBoard