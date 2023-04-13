import { Box, Center, Flex, Heading, IconButton, Progress, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import React, { useState } from 'react'

import { AiOutlinePicture } from 'react-icons/ai'
import { FaPen } from 'react-icons/fa'

import 'react-quill/dist/quill.snow.css';
import { AuthContext } from '../../util/hook/authContext'
import { useRouter } from 'next/router'
import PostTopForm from '../../components/Forms/PostTopForm'
import { PostProcessType, PostTopInfoType, PostType } from '../../type/post'
import BlogForm from '../../components/Forms/BlogForm'
import { PageBackButton } from '../../components/Forms/postForms'
import dynamic from 'next/dynamic'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { DentBord, FlatBord } from '../../component/atom/bords'
import { PostHeader } from '../../component/layout/Header'
import { GlassButton, GlassSwitchButton, NeumIconButton } from '../../component/atom/buttons'
import { NeumFloatFormInput } from '../../component/atom/inputs'
import { ArticlePostForm } from '../../component/standalone/ArticlePostForm'
import { GlassSwitch } from '../../component/atom/switchs'

const postCreate: NextPage = () => {
  // ログアウト時のリダイレクト処理
  // const { userState } = useContext(AuthContext);
  const router = useRouter()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(() => { if (userState !== 'isUser')  router.replace('/') }, [userState])


  const handlePublish = (e: any) => {
    console.log(e.target.checked)
  }

  return (
    <>
      <PostHeader title={"文章で記録"}>
        <GlassSwitchButton
        variant={"outline"} fontSize={".9rem"} 
        >
          公開中
        </GlassSwitchButton>
        <GlassButton 
        _hover={{
          bgGradient: "linear(to-l, tipsy_color_1, tipsy_color_2)",
          color: "bg_switch",
          border: "none"
        }}
        fontSize=".9rem"
        variant="outline"
        color={"tipsy_color_2"}
        >
          保存
        </GlassButton>
      </PostHeader>
      <Flex 
      className="page"
      direction="column" 
      justify="center" 
      align="center"
      pt={"100px"}
      >
        <ArticlePostForm/>
        {/* <PostPage/> */}
      </Flex>
    </>
  )
}
export default postCreate

type TypeSetButtonProptype =  {setType: any, name: string, height: number, children?: any, bg: string, shadow: string, border: string, minW?: number, Mx?: number}
const BlogFromContainer = dynamic(() => import("../../components/Forms/BlogForm"), { ssr: false });

const PostPage = () => {
  
  const [postProcess, setPostProcess] = useState<PostProcessType>("postTopForm")
  const [progressValue, setProgressValue] = useState(0)
  const [postType, setPostType] = useState<PostType>(null)
  const [postTopInfo, setPostTopInfo] = useState<PostTopInfoType>()

  return (
    <>
      <Progress mt={5} colorScheme="red" w={300} hasStripe value={progressValue} />
      {postProcess == "postTopForm" && <PostTopForm progressValue={progressValue} setProgressValue={ setProgressValue } setPostProcess={setPostProcess} setPostTopInfo={ setPostTopInfo } postTopInfo={postTopInfo}/> }
      {postProcess == "postTypeSelect" && <SetTypeButtonContainer setProgressValue={ setProgressValue } setPostType={setPostType} setPostProcess={setPostProcess}/> }
      {postProcess == "contentForm" && postType == "blog" && <BlogFromContainer setProgressValue={ setProgressValue } setPostType={setPostType} progressValue={progressValue} setPostProcess={setPostProcess}/>}
    </>
  )
}

const SetTypeButtonContainer = ({setPostType, setPostProcess, setProgressValue}: any) => {

  const setTypeToBlog = () => {
    setPostType("blog")
    setPostProcess("contentForm")
    setProgressValue(50)
  }
  const setTypeToSlide = () => {
    setPostType("slide")
    setPostProcess("contentForm")
    setProgressValue(60)
  }
  const setTypeToLinkOnly = () => {
    setPostType("linkOnly")
    setPostProcess("contentForm")
    setProgressValue(90)
  }

  return (
    <>
      <Heading mt={7} me={20}>
        <PageBackButton beforePageForm={"postTopForm"} beforeProcessValue={0} setProgressValue={ setProgressValue } setPostProcess={setPostProcess} />
        Post Tips
      </Heading>     
      <Flex mt={3} h="90vh" w="100vw" justify="center" align="center" flexWrap="wrap"> 
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