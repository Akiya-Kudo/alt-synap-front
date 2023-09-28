import { NextPage } from 'next';
import { Box, Flex } from '@chakra-ui/react';
import { TabButtonSelectGroup } from '../component/helper/TabRadioGroup';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { GET_FOLLOWEES_POSTS, GET_POSTS_NEW, POSTS_SEARCH } from '../util/graphql/queries/posts.query.scheme';
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
    else if (e=="NewPosts") {
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

  //reset displayPosts for the first display when the page is loaded
  useEffect(() => {
    if (displayContent=="NewPosts") {
      setDisplayPosts(data_new?.search_post)
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
console.log(displayPosts?.length);

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
          allPostsCount={displayPosts?.length + 1}
          error={error_f} loading={loading_f}
          not_found_message={"投稿が見つかりませんでした"}
          handleFetchMore={handleFetchMoreUserFollow}
          my={10}
          />
        }
        { 
          displayContent=="NewPosts" &&
          <TipsyPostsDisplay
          displayPosts={displayPosts}
          allPostsCount={displayPosts?.length + 1}
          error={error_new} loading={loading_new}
          not_found_message={"投稿が見つかりませんでした"}
          handleFetchMore={handleFetchMoreNewPosts}
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