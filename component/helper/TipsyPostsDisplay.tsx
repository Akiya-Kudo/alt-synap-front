import { TipsyPostsDisplayProps } from "../../type/helper";
import { Post} from "../../type/global";
import { TipsyCard, TipsyCard_image, TipsyCard_link } from '../atom/cards'
import PinterestGrid from 'rc-pinterest-grid';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Center, Text, VStack } from "@chakra-ui/react";
import { CircleLoader, NeumLoader } from "../atom/loaders";
import { ClickButton } from "../atom/buttons";
import { client } from "../../pages/_app";
import { READ_USER_UUID, READ_USER_UUID_AND_FOLDERS } from "../../util/graphql/queries/users.query.schema";
import { auth } from "../../util/firebase/init";

const TipsyPostsDisplay = ({
    allPostsCount,
    displayPosts, 
    handleFetchMore, error, loading,
    not_found_message="検索条件の投稿は見つかりませんでした",
    mb=5, w="100%", flexDir="column",
    ...props
}: TipsyPostsDisplayProps) => {
    const login_user = client.readQuery({ query: READ_USER_UUID_AND_FOLDERS, variables: { uid: auth.currentUser?.uid }})?.user
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
            <Center mb={mb} w={w} flexDir={flexDir} {...props}>
                {
                displayPosts && displayPosts?.length > 0 && (
                    <>
                        <PinterestGrid
                        columns={3}      
                        columnWidth={
                            (window.innerWidth < 480) ? 300 
                            : (window.innerWidth < 1000) ? 360 
                                : (window.innerWidth < 1500) ? 550 
                                    : 650
                        }
                        gutterWidth={30} 
                        gutterHeight={20}
                        responsive={true}
                        >
                            { displayPosts.map((post: Post) => {
                                const is_login_user_post: boolean = (login_user?.uuid_uid && login_user.uuid_uid == post.uuid_uid )
                                ? true : false
                                
                                if (post.content_type==2) {
                                    return (
                                        <TipsyCard_link
                                        isUserHidden={is_login_user_post}
                                        isEditable={is_login_user_post}
                                        folder_posts={post.folder_posts}
                                        folders={login_user?.folders}
                                        post={post}
                                        />
                                    )
                                } else if (post.top_image) {
                                    return (
                                        <TipsyCard_image
                                        isUserHidden={is_login_user_post}
                                        isEditable={is_login_user_post}
                                        folder_posts={post.folder_posts}
                                        folders={login_user?.folders}
                                        post={post}
                                        />
                                    )
                                } else {
                                    return (
                                        <TipsyCard
                                        isUserHidden={is_login_user_post}
                                        isEditable={is_login_user_post}
                                        folder_posts={post.folder_posts}
                                        folders={login_user?.folders}
                                        post={post}
                                        />
                                    )
                                }
                            })}
                        </PinterestGrid>
                        {
                            displayPosts.length < allPostsCount && 
                            (<Center m={10}>
                                <ClickButton
                                size={"md"} py={3} px={5}
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
                        <Text m={5}>{not_found_message}</Text>
                        <Center p={5}><NeumLoader/></Center>
                    </VStack>
                )}
            </Center>
        </>
    )
}

export default TipsyPostsDisplay