import { Box, Center, Flex, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import { Header } from '../../components/layouts/Header/Header'
import React, { useContext, useEffect, useState } from 'react'

import { AiOutlinePicture } from 'react-icons/ai'
import { FaPen } from 'react-icons/fa'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic'
import { AuthContext } from '../../context/auth'
import { useRouter } from 'next/router'

type PostType = "blog" | "slide" | "linkOnly" | null
type PostProcess = "postTypeSelect" | "contentForm"

type TypeSetButtonProptype =  {setType: any, name: string, height: number, children?: any, bg: string, shadow: string, border: string, minW?: number, Mx?: number}

const TypeSetButton = ({setType, name, height, children, bg, shadow, border, minW = 250, Mx = 10}: TypeSetButtonProptype) => {
  return (
    <Center 
    onClick={ setType }
    display="flex"
    flexDir="column"
    bg={bg}
    h={height} w={250} mx={Mx} my={2} minW={minW}
    boxShadow={shadow} borderRadius={30}
    border={border}
    _hover={{ 
      bg: "yellow.100",
      filter: "grayscale(0.3)",
      transition: ".7s",
    }}
    >
      { children ? <Center color="orange.300" mb={10}>{children}</Center> : null } 
      <Text fontSize="1.3rem">{name}</Text>
    </Center>
  )
}

const SetTypeField = ({setPostType, setPostProcess}: any) => {

  const FaPenIcon = () => <FaPen size={45}/>

  const setTypeToBlog = () => {
    setPostType("blog")
    setPostProcess("contentForm")
  }
  const setTypeToSlide = () => {
    setPostType("slide")
    setPostProcess("contentForm")
  }
  const setTypeToLinkOnly = () => {
    setPostType("linkOnly")
    setPostProcess("contentForm")
  }

  return (
    <>
      <Flex mt="10vh" h="90vh" w="100vw" justify="center" align="center" flexWrap="wrap">
        {/* 余白調整の空タグ */}
        <Box w="100%"></Box>       
        <TypeSetButton setType={setTypeToBlog} name={"blog"} height={250} bg={"gray.50"} shadow={"inner"} border={"0px"}><FaPen size={45}/></TypeSetButton>
        <TypeSetButton setType={setTypeToSlide} name={"Slides & Movies"} height={250} bg={"white"} shadow={"xl"} border={"1px solid #eaeaea"}><AiOutlinePicture size={70} /></TypeSetButton>
        <TypeSetButton setType={setTypeToLinkOnly} name={"Link only"} height={75} bg={"white"} shadow={"xl"} border={"1px solid #eaeaea"} minW={250} Mx={10000}/>
        {/* 余白調整の空タグ */}
        <Box w="100%"></Box>
        <Box w="100%"></Box>
        <Box w="100%"></Box>
      </Flex>
    </>
  )
}

const BlogFromContainer = dynamic(() => import("../../components/Forms/BlogForm"), { ssr: false });
const BlogForm = () => {

  return (
    <>
      <Flex className="page" direction="column" justify="center" align="center">
        <BlogFromContainer/>
      </Flex>
    </>
  )
}

const PostPage = () => {

  // ログアウト時のリダイレクト処理
  const { userState } = useContext(AuthContext);
  const router = useRouter()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (userState !== 'isUser')  router.replace('/') }, [userState])

  const [postProcess, setPostProcess] = useState<PostProcess>("postTypeSelect")
  const [postType, setPostType] = useState<PostType>(null)

  console.log(postType)
  console.log(postProcess)

  return (
    <>
      {postProcess == "postTypeSelect" && <SetTypeField setPostType={setPostType} setPostProcess={setPostProcess}/> }
      {postProcess == "contentForm" && postType == "blog" && <BlogForm/> }
    </>
  )
}

const newpost: NextPage = () => {
  return (
    <>
      <Header/>
      <PostPage/>
    </>
  )
}

export default newpost