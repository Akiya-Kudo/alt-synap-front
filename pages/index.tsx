import { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import { TabBord } from '../component/atom/bords';
import { TabButtonSelectGroup } from '../component/helper/TabRadioGroup';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { client } from './_app';
import { POSTS_SEARCH } from '../util/graphql/queries/posts.query.scheme';

const GsEngine = dynamic(
  () => import("../component/layout/GsEngine"),
  { ssr: false }
);

const Index: NextPage  = () => {
  const handleTabGroup = (e:any) => {
    console.log(e, "が選択されましした")
  }
  return (
    <>
      <Head><title>Tipsy | Home</title></Head>
      <Box className="page">
        <TabButtonSelectGroup 
        onChange={ handleTabGroup} 
        options={["TIpsyの投稿", "人気順", "新着順"]}  
        defaultValue='人気順' 
        m={"20px"}
        />
        <TabBord m={5} bg='bg_switch' neumH={"tall"} h={500}>
          <h1>hello </h1>
          <GsEngine></GsEngine>
          <div className="gcse-searchbox-only">aaa</div>
        </TabBord>
      </Box>
    </>
  )
}

export default Index