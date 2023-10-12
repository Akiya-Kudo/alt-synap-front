import { useLazyQuery } from '@apollo/client';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { Box, Center, TabIndicator, TabList, TabPanel, TabPanels, Tabs, Text, useBreakpointValue } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import UsersPage from '../../pages/users/[uuid_uid]';
import { client } from '../../pages/_app';
import { Post, Tag, UserTag } from '../../type/global';
import { auth } from '../../util/firebase/init';
import { POSTS_SEARCH } from '../../util/graphql/queries/posts.query.scheme';
import { GET_HOT_TAGS } from '../../util/graphql/queries/tags.query.scheme';
import { USER_QUERY } from '../../util/graphql/queries/users.query.schema';
import { ClickButton } from '../atom/buttons';
import { NeumTab, NeumTabaPagenationSwitch } from '../atom/indicators';
import { TruncatedText } from '../atom/texts';

const TipsyPostsDisplay = dynamic(
    () => import('../helper/TipsyPostsDisplay'),
    { ssr: false }
);

const TipsyPostsTagsTabBoard = ({displayContent}: { displayContent: "HotTopics" | "FavoriteTopics" }) => {
    const pagenationMaxNum = useBreakpointValue([3,3,5]) as number
    const router = useRouter()
    
    //get favorite tag's new arrival posts
    const [getTagsNewPosts, {data, error, loading, fetchMore}] = useLazyQuery(POSTS_SEARCH)
    const [getHotTags, {data: data_hot, error: error_hot, loading: loading_hot}] = useLazyQuery(GET_HOT_TAGS)

    const [topics, setTopics] = useState<Tag[]>([])
    const [topicPagenatrionIdx, setTopicPagenatrionIdx] = useState<number>(0)
    const [displayPosts, setDisplayPosts] = useState<Post[]>([])
    const [displayTabIndex, setDisplayTabIndex] = useState(0) // 1 ~ 5までのインデックスが格納される

        useEffect(() => {
            if (displayContent=="FavoriteTopics" ) {
                const user_data = client.readQuery({ query: USER_QUERY, variables: { uid: auth.currentUser?.uid }});
                setTopics(user_data?.user.user_tags.map((u_t: UserTag)=> u_t.tags))
            }else if (displayContent=="HotTopics") {
                // const res = await getHotTags()
                getHotTags().then(res => setTopics(res?.data?.hot_tags))
            }
        },[])
    
    //when tab is cahnged by handleTabChange and first display(topics are setted), fetch the posts
    useEffect(() => {
        if (topics.length!=0)
        getTagsNewPosts({
            variables: {
                searchString: null,
                selectedTagId: topics[pagenationMaxNum*topicPagenatrionIdx + displayTabIndex]?.tid,
                offset: 0,
                sortType: 1
            }
        })
    },[displayTabIndex, topics])
    // when fetch is called chagne display Posts
    useEffect(() => {
        setDisplayPosts(data?.search_post)
    },[data])
    useEffect(() => {
        if (data_hot) {setTopics(data_hot?.hot_tags)}
    },[data_hot])
    
    return (
        <>
            <Tabs
            variant="unstyled" isLazy
            w={["100%", "95%", "90%"]} my={5}
            onChange={(index: number) => setDisplayTabIndex(index)}
            isFitted
            index={displayTabIndex}
            >
                <TabList>
                    {
                        (topicPagenatrionIdx > 0) ?
                        <NeumTabaPagenationSwitch 
                        align={"center"} px={[5, 5, 3]}
                        onClick={async () => {
                            setTopicPagenatrionIdx(topicPagenatrionIdx - 1)
                            setDisplayTabIndex(0)
                            const res = await fetchMore({variables: { selectedTagId: topics[pagenationMaxNum*(topicPagenatrionIdx-1)]?.tid, }})
                            setDisplayPosts(res.data?.search_post)
                        }}
                        >
                            <ArrowLeftIcon fontSize={".7rem"}/>
                        </NeumTabaPagenationSwitch>
                        :
                        <Box w={[0, 0, "40px"]}></Box>
                    }

                    { 
                        topics && topics.slice( pagenationMaxNum*topicPagenatrionIdx , pagenationMaxNum*topicPagenatrionIdx + pagenationMaxNum).map((tag: Tag, index) => (
                            <NeumTab key={index}>
                                <Text isTruncated w={["24vw", "24vw", "12vw"]}>
                                    { tag.display_name }
                                </Text>
                            </NeumTab>
                        ))
                    }

                    {
                        topicPagenatrionIdx < (Math.ceil(topics.length / pagenationMaxNum) - 1) ?
                        <NeumTabaPagenationSwitch 
                        align={"center"} px={[5, 5, 3]}
                        onClick={async () => {
                            setTopicPagenatrionIdx(topicPagenatrionIdx + 1)
                            setDisplayTabIndex(0)
                            const res = await fetchMore({variables: { selectedTagId: topics[pagenationMaxNum*(topicPagenatrionIdx+1)]?.tid, }})
                            setDisplayPosts(res.data?.search_post)
                            
                        }}
                        >
                            <ArrowRightIcon fontSize={".7rem"}/>
                        </NeumTabaPagenationSwitch>
                        :
                        <Box w={[0, 0, "40px"]}></Box>
                    }
                </TabList>
                <TabIndicator
                height="1.5px"
                bg="tipsy_color_3"
                borderRadius="full"
                />
                    <TabPanels>
                        { 
                            topics && [1,2,3,4,5].map((num) => {
                                return (
                                    <TabPanel key={num}>
                                        <TipsyPostsDisplay
                                        displayPosts={displayPosts}
                                        // this count_setting force not to display fetchMore button, because lead user to tag_page if want to more
                                        allPostsCount={displayPosts?.length} 
                                        error={error} loading={loading}
                                        not_found_message={"投稿は見つかりませんでした"}
                                        />
                                        <Center m={10}>
                                            <ClickButton
                                            size={"md"}
                                            Hcolor={"tipsy_color_3"}
                                            onClick={() => router.push(`/topics/${topics[pagenationMaxNum*topicPagenatrionIdx + displayTabIndex].tid}`)}
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

export default TipsyPostsTagsTabBoard