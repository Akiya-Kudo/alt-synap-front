import { NextPage } from 'next';
import { Box, Flex } from '@chakra-ui/react';
import { TabButtonSelectGroup } from '../component/helper/TabRadioGroup';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { GET_FOLLOWEES_POSTS, POSTS_SEARCH } from '../util/graphql/queries/posts.query.scheme';
import { useContext, useEffect, useState } from 'react';
import { useLazyQuery, useQuery, useReactiveVar } from '@apollo/client';
import { AuthContext, IsAlreadyFirstFetchedAsIsUserVar } from '../util/hook/authContext';
import TipsyPostsFavoriteTagBoard from '../component/standalone/TipsyPostsFavoriteTagBoard'
import { Post } from '../type/global';

const TipsyPostsDisplay = dynamic(
  () => import('../component/helper/TipsyPostsDisplay'),
  { ssr: false }
);

const Index: NextPage<{}>  = () => {
  const { userState } = useContext(AuthContext);
  const IsAlreadyFetchedAsIsUser = useReactiveVar(IsAlreadyFirstFetchedAsIsUserVar)

  const [displayContent, setDisplayContent] = useState<"Following" | "NewPosts" | "FavoriteTopics">("NewPosts")
  const handleTabGroup = (e:any) => {
    setDisplayContent(e)
    if (e=="Following") {
      getFolloweeNewPost()
      .then(res => {
        setDisplayPosts(res.data?.get_posts_user_follow)
        // to omit cluculating sum because of huge numer of followee's post, enable to fetchMore until response num is less than max takable num
        setAllPostsCount(res.data?.get_posts_user_follow.length + 1) 
      })
      .catch((error: Error) => console.log(error))
    }
    else if (e=="NewPosts") {
      setDisplayPosts(data_new?.search_post)
      setAllPostsCount(data_new?.count_total_posts)
    }
  }

  const [displayPosts, setDisplayPosts] = useState<Post[]>([])
  const [allPostsCount, setAllPostsCount] = useState<number>(0)

  //get new arrival posts
  const { data: data_new, error: error_new, loading: loading_new, refetch: refetch_new, fetchMore: fetchMore_new } = useQuery(POSTS_SEARCH, {
    variables: {
      searchString: null,
      selectedTagId: null,
      offset: 0,
      sortType: 1
    }
  })

  
  // get followee's new arrival posts
  const [getFolloweeNewPost, {data: data_f, error: error_f, loading: loading_f, fetchMore: fetchMore_f}] = useLazyQuery(GET_FOLLOWEES_POSTS, { variables: { offset: 0 }})

  //reset displayPosts for the first display when the page is loaded
  useEffect(() => {
    if (displayContent=="NewPosts") {
      setDisplayPosts(data_new?.search_post)
      setAllPostsCount(data_new?.count_total_posts)
    }
  },[data_new])

  // reload時のlike & bookmark state更新 : this is needed only when reloading the page, so reactive var will updated when this is called or the other page roaded in context. 
  useEffect(()=>{
    if (userState=="isUser" && !IsAlreadyFetchedAsIsUser) {
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
},[userState])
  return (
    <>
      <Head><title>Tipsy | Home</title></Head>
      <Flex flexDir={"column"} align={"center"} mt={5} className="page">
        <TabButtonSelectGroup 
        onChange={ handleTabGroup} 
        options={["Following", "NewPosts", "FavoriteTopics", ]}  
        defaultValue={displayContent} 
        Hcolor={"tipsy_color_2"} Acolor={"tipsy_color_active_2"}
        w={"90%"}
        />

        { 
          displayContent=="Following" &&
          <TipsyPostsDisplay
          displayPosts={displayPosts}
          allPostsCount={allPostsCount}
          error={error_f} loading={loading_f}
          not_found_message={"投稿が見つかりませんでした"}
          my={10}
          />
        }
        { 
          displayContent=="NewPosts" &&
          <TipsyPostsDisplay
          displayPosts={displayPosts}
          allPostsCount={allPostsCount}
          error={error_new} loading={loading_new}
          not_found_message={"投稿が見つかりませんでした"}
          my={10}
          />
        }
        {
          displayContent=="FavoriteTopics" &&
          <TipsyPostsFavoriteTagBoard />
        }
      </Flex>
    </>
  )
}

export default Index
// export async function getStaticProps() {
//   const {data, error, loading} = await client.query({
//     query: POSTS_SEARCH,
//     variables: {
//       searchString: null,
//       selectedTagId: null,
//       offset: 0,
//       sortType: 1
//     }
//   })

//   if (error) {
//     throw new Error(`Failed to fetch posts, received status ${error.message}`)
//   }
//   return {
//     props: {
//       daily_posts: data.search_post,
//       daily_posts_count: data.count_total_posts
//     },
//     revalidate: 43200,
//   }
// }