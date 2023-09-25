import { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import { TabBord } from '../component/atom/bords';
import { TabButtonSelectGroup } from '../component/helper/TabRadioGroup';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { client } from './_app';
import { POSTS_SEARCH } from '../util/graphql/queries/posts.query.scheme';
import { Post } from '../type/global';
import { useState } from 'react';
import { useQuery } from '@apollo/client';

// const GsEngine = dynamic(
//   () => import("../component/layout/GsEngine"),
//   { ssr: false }
// );

const TipsyPostsDisplay = dynamic(
  () => import('../component/helper/TipsyPostsDisplay'),
  { ssr: false }
);

const Index: NextPage<{}>  = () => {
  const [displayContent, setDisplayContent] = useState<"NewArrived" | "Follow" | "FavoriteTopics">("NewArrived")
  const handleTabGroup = (e:any) => setDisplayContent(e)

  const { data, error, loading, fetchMore } = useQuery(POSTS_SEARCH, {
    variables: {
      searchString: null,
      selectedTagId: null,
      offset: 0,
      sortType: 1
    }
  })
  return (
    <>
      <Head><title>Tipsy | Home</title></Head>
      <Box className="page">
        <TabButtonSelectGroup 
        onChange={ handleTabGroup} 
        options={["NewArrived", "Follow", "FavoriteTopics", ]}  
        defaultValue={displayContent} 
        Hcolor={"tipsy_color_2"} Acolor={"tipsy_color_active_2"}
        m={"20px"}
        />

        {/* { 
          displayContent=="NewArrived" &&
          <TipsyPostsDisplay
          displayPosts={daily_posts}
          allPostsCount={daily_posts.length}
          error={undefined} loading={false}
          />
        } */}
      </Box>
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