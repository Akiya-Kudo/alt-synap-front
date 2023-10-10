import { NextPage } from 'next';
import { Box, Flex, Heading, useBreakpointValue } from '@chakra-ui/react';
import { TabButtonSelectGroup } from '../component/helper/TabRadioGroup';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { GET_FOLLOWEES_POSTS, GET_POSTS_NEW, POSTS_SEARCH } from '../util/graphql/queries/posts.query.scheme';
import { useContext, useEffect, useState } from 'react';
import { useLazyQuery, useQuery, useReactiveVar } from '@apollo/client';
import { AuthContext, IsAlreadyFirstFetchedAsIsUserVar } from '../util/hook/authContext';
import { Link as LinkType, Post } from '../type/global';
import { FlatBord } from '../component/atom/bords';
import { GlassButton } from '../component/atom/buttons';
import Link from 'next/link';
import TipsyPostsTagsTabBoard from '../component/standalone/TipsyPostsTagsTabBoard';
import LinkSearchableBoard from '../component/standalone/LinkSearchableBoard'
import { GET_HOT_LINKS } from '../util/graphql/queries/links.query.scheme';
import { LinkCollectionFooter } from '../component/layout/Footer';

const TipsyPostsDisplay = dynamic(
  () => import('../component/helper/TipsyPostsDisplay'),
  { ssr: false }
);

const Index: NextPage<{}>  = () => {
  const { userState } = useContext(AuthContext);
  const IsAlreadyFetchedAsIsUser = useReactiveVar(IsAlreadyFirstFetchedAsIsUserVar)
  const isMobile = useBreakpointValue([true, true, false])

  const [displayContent, setDisplayContent] = useState<"Following" | "NewArrivals" | "HotTopics" | "FavoriteTopics">("NewArrivals")
  const [displayPosts, setDisplayPosts] = useState<Post[]>([])

  const handleTabGroup = (e:any) => {
    setDisplayContent(e)
    if (e=="Following") {
      getFolloweeNewPost()
      .then(res => {
        setDisplayPosts(res.data?.get_posts_user_follow)
      })
      .catch((error: Error) => console.log(error))
    }
    else if (e=="NewArrivals") {
      setDisplayPosts(data_new?.search_post)
    }
  }


  //get new arrival posts
  const { data: data_new, error: error_new, loading: loading_new, refetch: refetch_new, fetchMore: fetchMore_new } = useQuery(GET_POSTS_NEW, {
    variables: {
      searchString: null,
      selectedTagId: null,
      offset: 0,
      sortType: 1
    }
  })
  const handleFetchMoreNewPosts = async () => {
    const res = await fetchMore_new({ variables: { offset: displayPosts.length }})
    setDisplayPosts([...displayPosts, ...res.data.search_post])
  }
  
  // get followee's new arrival posts
  const [getFolloweeNewPost, {data: data_f, error: error_f, loading: loading_f, fetchMore: fetchMore_f}] = useLazyQuery(GET_FOLLOWEES_POSTS, { 
    variables: { offset: 0 }
  })
  const handleFetchMoreUserFollow = async () => {
    const res = await fetchMore_f({ variables: { offset: displayPosts.length }})
    setDisplayPosts([...displayPosts, ...res.data.get_posts_user_follow])
  }

  //fetch HotLinks 
  const [getHotLinks] = useLazyQuery(GET_HOT_LINKS)

  //reset displayPosts for the first display when the page is loaded
  useEffect(() => {
    if (displayContent=="NewArrivals") { setDisplayPosts(data_new?.search_post) }
  },[data_new])
  

  // reload時のlike & bookmark state更新 : this is needed only when reloading the page, so reactive var will updated when this is called or the other page roaded in context. 
  useEffect(()=>{
    if (userState=="isUser") {
      if (!IsAlreadyFetchedAsIsUser) {
        console.log("refetching to refresh like & bookmark state");
        refetch_new(
            {
                searchString: null,
                selectedTagId: null,
                offset: 0,
                sortType: 1
            },
        )
        IsAlreadyFirstFetchedAsIsUserVar(true)
      }
      //fetchLinks
      //readFragment
    }
  },[userState])

  return (
    <>
      <Head><title>Tipsy | Home</title></Head>
      <Flex flexDir={"column"} align={"center"} mt={5} className="page">

        {
          userState=="guest" &&
          <Link href={"/guide/explanation"}>
            <FlatBord 
            mb={4} w={"90%"} h={100} 
            bgGradient='linear(to-tr, tipsy_color_3, tipsy_color_1)' 
            bg={""} color={"white"}
            _hover={{ filter: 'brightness(1.2)' }} transition={".3s"}
            _focus={{ filter: 'brightness(1.2)' }}
            >
              {/* <FlatText fontSize={"2.5rem"} fontWeight="bold" color={"tipsy_color_2"}></FlatText> */}
              <Heading fontSize={"2.5rem"}>Tipsy</Heading>
              <Heading fontSize={"1.5rem"} ms={2} mt={2}>について</Heading>
              <GlassButton size={"sm"} color={"white"} ms={5} mt={2} border={"1px white solid"}>もっと見る</GlassButton>
            </FlatBord>
          </Link>
        }

        {
          ((userState=="isUser" || userState=="guest") && !isMobile ) &&
          <LinkSearchableBoard/>
        }

        <TabButtonSelectGroup 
        onChange={ handleTabGroup} 
        options={userState=="isUser" ? ["Following", "NewArrivals", "HotTopics", "FavoriteTopics"] : ["NewArrivals", "HotTopics"]}
        defaultValue={displayContent} 
        Hcolor={"tipsy_color_2"} Acolor={"tipsy_color_active_2"}
        w={["100%", "100%", "90%"]} 
        borderRadius={[0, 0, "full"]} chBorderRadius={[2, 5, 10]} chH={[10, "50px", 10]}
        fontSize={[10, 12, 15]}
        />

        { 
          displayContent=="Following" &&
          <TipsyPostsDisplay
          displayPosts={displayPosts}
          allPostsCount={displayPosts?.length + 1}
          error={error_f} loading={loading_f}
          not_found_message={"投稿が見つかりませんでした"}
          handleFetchMore={handleFetchMoreUserFollow}
          my={7}
          />
        }
        { 
          displayContent=="NewArrivals" &&
          <TipsyPostsDisplay
          displayPosts={displayPosts}
          allPostsCount={displayPosts?.length + 1}
          error={error_new} loading={loading_new}
          not_found_message={"投稿が見つかりませんでした"}
          handleFetchMore={handleFetchMoreNewPosts}
          my={7}
          />
        }
        {
          displayContent=="FavoriteTopics" &&
          <TipsyPostsTagsTabBoard displayContent={displayContent}/>
        }
        {
          displayContent=="HotTopics" &&
          <TipsyPostsTagsTabBoard displayContent={displayContent}/>
        }
      </Flex>

      {
        isMobile && 
        <LinkCollectionFooter query_text={""}/>
      }
    </>
  )
}

export default Index