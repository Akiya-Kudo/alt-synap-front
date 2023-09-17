import { useQuery, useReactiveVar } from "@apollo/client"
import { Post} from "../../type/global";
import { TipsyCard, TipsyCard_image, TipsyCard_link } from '../atom/cards'
import PinterestGrid from 'rc-pinterest-grid';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Center, Heading, Highlight, Text, VStack } from "@chakra-ui/react";
import { CircleLoader, NeumLoader } from "../atom/loaders";
import { DentBord } from "../atom/bords";
import { ClickButton } from "../atom/buttons";
import { useContext, useEffect, useState } from "react";
import { GET_USER_PUBLISHED_POSTS } from "../../util/graphql/queries/posts.query.scheme";
import { AuthContext, IsAlreadyFirstFetchedAsIsUserVar } from "../../util/hook/authContext";

const TipsyPostsUserBoard = ({ uuid_uid, isHidePostCounter=false }: { uuid_uid: String, isHidePostCounter?: boolean }) => {
    const { userState } = useContext(AuthContext);
    const IsAlreadyFetchedAsIsUser = useReactiveVar(IsAlreadyFirstFetchedAsIsUserVar)

    const [displayPosts, setDisplayPosts] = useState<Post[]>([])
    const { loading, error, data, fetchMore, refetch } = useQuery(GET_USER_PUBLISHED_POSTS, {
        variables: 
        {
            uuid_uid: uuid_uid,
            selectedTagIds: null,
            offset: 0,
            no_pagenation: false
        },
    })
    const handleFetchMore = async () => {
        const res = await fetchMore({
            variables: { offset: displayPosts.length }
        })
        setDisplayPosts([...displayPosts, ...res.data.get_posts_made_by_user])
    }

    // reload時のlike state更新
    useEffect(()=>{
        if (userState=="isUser" && !IsAlreadyFetchedAsIsUser) {
            console.log("refetching to refresh like state");
            refetch() // same variables with first fetch of useQuery
            IsAlreadyFirstFetchedAsIsUserVar(true)
        }
    },[userState])
    // set display posts by fetch
    useEffect(() => {setDisplayPosts(data?.get_posts_made_by_user)}, [data])
    
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
                {
                    !isHidePostCounter && 
                    <DentBord 
                    w={130} h={"40px"} 
                    justifyContent="center" alignItems={"center"} 
                    my={3} borderRadius={"full"} 
                    position={"relative"}
                    >
                        <Heading size={"sm"}>Post 
                            <Highlight query={ data.count_posts_made_by_user.toString()} styles={{fontSize: "0.8rem" }}>
                                {data.count_posts_made_by_user ?  " " + data.count_posts_made_by_user.toString() : " " + "0"}
                            </Highlight>
                        </Heading>
                    </DentBord>
                }
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
                                            uuid_uid: post.users?.uuid_uid,
                                            user_name: post.users?.user_name,
                                            user_image: post.users?.user_image
                                        }}
                                        post_tags={post.post_tags}
                                        isLiked={ post.likes && post.likes?.length!=0 ? true : false}
                                        isPostOrner={true}
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
                                        isPostOrner={true}
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
                                            uuid_uid: post.users?.uuid_uid,
                                            user_name: post.users?.user_name,
                                            user_image: post.users?.user_image
                                        }}
                                        post_tags={post.post_tags}
                                        isLiked={ post.likes && post.likes?.length!=0 ? true : false}
                                        isPostOrner={true}
                                        />
                                    )
                                }
                            })}
                        </PinterestGrid>
                        {
                            displayPosts.length < data.count_posts_made_by_user && 
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

export default TipsyPostsUserBoard