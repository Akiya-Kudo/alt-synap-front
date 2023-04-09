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
import { ClickButton_icon } from '../../component/atom/buttons'
import { ArrowBackIcon } from '@chakra-ui/icons'

const postCreate: NextPage = () => {
  // ログアウト時のリダイレクト処理
  // const { userState } = useContext(AuthContext);
  const router = useRouter()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(() => { if (userState !== 'isUser')  router.replace('/') }, [userState])

  return (
    <>
      <Flex 
      className="page" 
      direction="column" 
      justify="center" 
      align="center"
      >
        <Heading 
        size="lg"
        mb={1} mt={10} 
        position="relative"
        >
          <ClickButton_icon 
          icon={<ArrowBackIcon/>}
          aria-label='ページを戻る'
          size={"sm"}
          position="absolute" left="-60px" top="3px"
          onClick={() => {router.back()}}
          >
            こんにちは
          </ClickButton_icon>
        {/* <PageBackButton beforePageForm={"postTopForm"} beforeProcessValue={0} /> */}
          Tipsを記録
        </Heading>
        <Center
        fontSize='sm'  
        color={"text_light"}
        m={1}
        >
          何を記録しますか？
        </Center>
        {/* <FloatingPHInput/> */}
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

  const FaPenIcon = () => <FaPen size={45}/>
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