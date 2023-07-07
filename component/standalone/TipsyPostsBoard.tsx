import { useQuery } from "@apollo/client"
import { PostCard } from "../../type/global";
import { POSTS_SEARCH } from '../../util/graphql/queries/posts.query.scheme';
import { TAG_SEARCH } from '../../util/graphql/queries/tags.query.scheme';
import { TipsyCard, TipsyCard_image } from '../atom/cards'
import PinterestGrid from 'rc-pinterest-grid';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Center, Divider, Heading, Text, VStack } from "@chakra-ui/react";
import { CircleLoader, NeumLoader } from "../atom/loaders";
import { DentBord } from "../atom/bords";
import { useNeumorphismColorMode } from "../../util/hook/useColor";

const TipsyPostsboard = ({ query_text }: {query_text: string}) => {
    const { loading, error, data } = useQuery(POSTS_SEARCH, {
        variables: 
        {
            searchString: query_text,
            selectedTagIds: [],
            pgNum: 0,
            sortType: 0
        }
    })
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

            <Center mb={5} w={"100%"} flexDir={"column"}>
                <DentBord w={130} h={"40px"} justifyContent="center" alignItems={"center"} my={3} borderRadius={"full"}>
                    <Heading size={"sm"}>Post</Heading>
                </DentBord>
                {
                data.search_post_tag.posts.length > 0 && (
                    <PinterestGrid
                    columns={3}      
                    columnWidth={550}
                    gutterWidth={30} 
                    gutterHeight={20}
                    responsive={true}
                    >
                        {data.search_post_tag.posts.map((post: PostCard) => {
                            if (post.top_image) {
                                return (
                                    <TipsyCard_image
                                    uuid_pid={post.uuid_pid}
                                    title={post.title}
                                    top_link={post.top_link}
                                    top_image={post.top_image}
                                    likes_num={post.likes_num}
                                    timestamp={post.timestamp}
                                    content_type={0}
                                    user={{
                                        uuid_uid: post.uuid_uid,
                                        user_name: post.user.user_name,
                                        user_image: post.user.user_image
                                    }}
                                    tags={post.tags}
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
                                        user_name: post.user.user_name,
                                        user_image: post.user.user_image
                                    }}
                                    tags={post.tags}
                                    />
                                )
                            }
                        })}
                    </PinterestGrid>
                )}
                { data.search_post_tag.posts.length == 0 && (
                    <VStack m={10}>
                        <Text m={5}>検索条件の投稿は見つかりませんでした</Text>
                        <Center p={5}><NeumLoader/></Center>
                    </VStack>
                )}
            </Center>
        </>
    )
}

export default TipsyPostsboard