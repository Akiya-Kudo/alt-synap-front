import { TipsyPostsDisplayProps } from "../../type/helper";
import { Post} from "../../type/global";
import { TipsyCard, TipsyCard_image, TipsyCard_link } from '../atom/cards'
import PinterestGrid from 'rc-pinterest-grid';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Center, Text, VStack } from "@chakra-ui/react";
import { CircleLoader, NeumLoader } from "../atom/loaders";
import { ClickButton } from "../atom/buttons";
import { client } from "../../pages/_app";
import { READ_USER_UUID } from "../../util/graphql/queries/users.query.schema";
import { auth } from "../../util/firebase/init";

const TipsyPostsDisplay = ({
    allPostsCount,
    displayPosts, 
    handleFetchMore, error, loading,
}: TipsyPostsDisplayProps) => {
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
                                        content_type={0}
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
                                        isPostOrner={is_login_user_post}
                                        />
                                    )
                                }
                            })}
                        </PinterestGrid>
                        {
                            displayPosts.length < allPostsCount && 
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

export default TipsyPostsDisplay