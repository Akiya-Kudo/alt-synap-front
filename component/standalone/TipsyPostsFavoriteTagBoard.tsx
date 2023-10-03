import { useLazyQuery } from '@apollo/client';
import { Center, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { client } from '../../pages/_app';
import { Post, Tag, UserTag } from '../../type/global';
import { auth } from '../../util/firebase/init';
import { POSTS_SEARCH } from '../../util/graphql/queries/posts.query.scheme';
import { USER_QUERY } from '../../util/graphql/queries/users.query.schema';
import { AuthContext } from '../../util/hook/authContext';
import { ClickButton } from '../atom/buttons';
import { NeumTab } from '../atom/indicators';

const TipsyPostsDisplay = dynamic(
    () => import('../helper/TipsyPostsDisplay'),
    { ssr: false }
);

const TipsyPostsFavoriteTagBoard = () => {
    const router = useRouter()
    const { userState } = useContext(AuthContext);
    
    //get favorite tag's new arrival posts
    const [getTagsNewPosts, {data, error, loading}] = useLazyQuery(POSTS_SEARCH)

    const [displayPosts, setDisplayPosts] = useState<Post[]>([])
    const [topics, setTopics] = useState<Tag[]>([])
    const [tabIndex, setTabIndex] = useState(0)

    const handleTabChange = (index: number) => setTabIndex(index)

    //when tab is cahnged by handleTabChange and first display(topics are setted), fetch the posts
    useEffect(() => {
        if (topics.length!=0)
        getTagsNewPosts({
            variables: {
                searchString: null,
                selectedTagId: topics[tabIndex].tid,
                offset: 0,
                sortType: 1
            }
        })
    },[tabIndex, topics])
    // when fetch is called chagne display Posts
    useEffect(() => setDisplayPosts(data?.search_post),[data])

    // read tags which login user is favariting, when first display and userState come to work
    useEffect(()=>{
        if (userState=="isUser") {
            const user_data = client.readQuery({ query: USER_QUERY, variables: { uid: auth.currentUser?.uid }});
            setTopics(user_data.user.user_tags.map((u_t: UserTag)=> u_t.tags))
        }else if (userState=="guest") {
            // ここで 注目トピックをfetchしてその投稿も取得する => 表示配列に格納
        }
    },[userState])
    
    return (
        <>
            <Tabs
            variant="unstyled" isLazy
            maxW={"1100px"} w={["100%", "100%", "90%"]} my={5}
            onChange={handleTabChange} index={tabIndex}
            >
                <TabList>
                    { topics.map((tag: Tag) => (<NeumTab>{ tag.display_name }</NeumTab>)) }
                </TabList>
                <TabIndicator
                height="1.5px"
                bg="tipsy_color_3"
                borderRadius="full"
                />
                    <TabPanels>
                        { 
                            topics.map((tag: Tag) => {
                                return (
                                    <TabPanel>
                                        <TipsyPostsDisplay
                                        displayPosts={displayPosts}
                                        // this count_setting force not to display fetchMore button, because lead user to tag_page if want to more
                                        allPostsCount={displayPosts?.length} 
                                        error={error} loading={loading}
                                        not_found_message={"投稿は見つかりませんでした"}
                                        />
                                        <Center m={10}>
                                            <ClickButton
                                            size={"md"} fontSize={16}
                                            Hcolor={"tipsy_color_3"}
                                            onClick={() => router.push(`/topics/${topics[tabIndex].tid}`)}
                                            >Topic ページへ</ClickButton>
                                        </Center>
                                    </TabPanel>
                                )
                            })
                        }
                    </TabPanels>
            </Tabs>
        </>
    )
}

export default TipsyPostsFavoriteTagBoard