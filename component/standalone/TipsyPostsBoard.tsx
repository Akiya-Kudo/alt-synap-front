import { useQuery } from "@apollo/client"
import { Post, SortType } from "../../type/global";
import { POSTS_SEARCH } from '../../util/graphql/queries/posts.query.scheme';
import { TipsyCard, TipsyCard_image } from '../atom/cards'
import PinterestGrid from 'rc-pinterest-grid';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Center, Heading, Highlight, Text, VStack } from "@chakra-ui/react";
import { CircleLoader, NeumLoader } from "../atom/loaders";
import { DentBord, TabBord } from "../atom/bords";
import { ClickButton, SwitchButtonConcave, SwitchButton_tab } from "../atom/buttons";
import { useEffect, useState } from "react";
import { TabSwitchGroup } from "../helper/TabRadioGroup";

const TipsyPostsboard = ({ query_text, selectedTid, isTagBoardDisplay, handleTagDisplay }: {query_text: string | null, selectedTid: number | null, isTagBoardDisplay?: boolean, handleTagDisplay?: any}) => {
    const [displayPosts, setDisplayPosts] = useState<Post[]>([])
    const [sortType, setSortType] = useState<SortType>("人気順")
    const { loading, error, data, fetchMore } = useQuery(POSTS_SEARCH, {
        variables: 
        {
            searchString: query_text,
            selectedTagId: selectedTid,
            offset: 0,
            sortType: 0
        },
        pollInterval: 600000, // 600秒間はキャッシュからフェッチされる
    })
    
    const handleFetchMore = async () => {
        const res = await fetchMore({
            variables: {
                offset: displayPosts.length,
                sortType: sortType=="人気順" ? 0 : 1
            },
        })
        setDisplayPosts([...displayPosts, ...res.data.search_post])
        
    }

    const handleChangeSort = async (e: SortType) => {
        if (e != sortType) {
            const res = await fetchMore({
                variables: {
                    sortType: e=="人気順" ? 0 : 1
                }
            })
            setSortType(e)
            setDisplayPosts( res.data.search_post )
        }
    }

    useEffect(() => {
        setDisplayPosts(data?.search_post)  
    },[data])

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
                    <Heading size={"sm"}>Post <Highlight query={ data.count_total_posts.toString()} styles={{fontSize: "0.8rem" }}>{data.count_total_posts ? data.count_total_posts.toString() : "0"}</Highlight></Heading>
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
                                if (post.top_image) {
                                    return (
                                        <TipsyCard_image
                                        uuid_pid={post.uuid_pid}
                                        title={post.title}
                                        top_link={post.top_link }
                                        top_image={post.top_image}
                                        likes_num={post.likes_num}
                                        timestamp={post.timestamp}
                                        content_type={0}
                                        user={{
                                            uuid_uid: post.uuid_uid,
                                            user_name: post.users.user_name,
                                            user_image: post.users.user_image
                                        }}
                                        post_tags={post.post_tags}
                                        isLiked={post.likes.length!=0 ? true : false}
                                        />
                                    )
                                } else {
                                    return (
                                        <TipsyCard
                                        uuid_pid={post.uuid_pid}
                                        title={post.title}
                                        top_link={post.top_link}
                                        likes_num={post.likes_num}
                                        timestamp={post.timestamp}
                                        content_type={0}
                                        user={{
                                            uuid_uid: post.uuid_uid,
                                            user_name: post.users.user_name,
                                            user_image: post.users.user_image
                                        }}
                                        post_tags={post.post_tags}
                                        isLiked={post.likes.length!=0 ? true : false}
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

export default TipsyPostsboard