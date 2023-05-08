import { Box, Center, Flex, Heading, IconButton, Progress, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { PostHeader } from '../../component/layout/Header'
import { GlassButton, GlassSwitchButton } from '../../component/atom/buttons'
import { ArticlePostForm } from '../../component/standalone/ArticlePostForm'
import { ArticlePostData } from '../../type/page'
import { useForm } from 'react-hook-form'

const PostCreate: NextPage = () => {
  // ログアウト時のリダイレクト処理
  // const { userState } = useContext(AuthContext);
  const router = useRouter()

  //投稿stateの管理
  const  { register, formState: { errors }, formState, } = useForm({mode: "all"});
  const [currentPost, setCurrentPost] = useState<ArticlePostData>({
    uid: undefined,
    title: "",
    top_image: "",
    top_link: "",
    content_type: undefined,
    publish: false,
    deleted: false,
    content: {
      blocks:[],
      time: undefined,
      version: "2.26.5",
    },
    tags: [],
  })
  const handleClick_publish = () => setCurrentPost((preV)=>({...preV, publish: !preV.publish}))
  const handleClick_save = async (e:any) => {
    console.log("apiをたったきます!")
    console.log(currentPost)
  }
  return (
    <>
      <PostHeader title={"文章で記録"}>
        <GlassSwitchButton
        getState={handleClick_publish} defStateValue={false}
        variant={"outline"} fontSize={".9rem"} 
        SBgGradient={"linear(to-tl, tipsy_color_2, tipsy_color_3)"} SHBgGradient={"linear(to-tl, tipsy_color_active_2, tipsy_color_active_3)"}
        Scolor={"bg_switch"} Acolor={"tipsy_color_active_3"} Hcolor={"tipsy_color_3"}
        Schildren={"公開中"}
        >
          公開する
        </GlassSwitchButton>
        <GlassButton
        disabled={!(!formState.errors.input_article_title && currentPost.title && currentPost.title.length!=0 && !formState.errors.input_top_link)}
        onClick={handleClick_save}
        _hover={{
          bgGradient: "linear(to-bl, tipsy_color_1, tipsy_color_2)",
          color: "bg_switch",
          border: "none"
        }}
        fontSize=".9rem"
        variant="outline"
        color={"tipsy_color_2"}
        >
          { currentPost.publish ? "変更を保存" : "下書き保存" }
        </GlassButton>
      </PostHeader>

      <Flex 
      className="page"
      direction="column" 
      justify="center" 
      align="center"
      my={2}

      >
        <ArticlePostForm 
        register={register} 
        errors={errors} 
        formState={formState}
        stateValue={currentPost}
        setStateValue={setCurrentPost}
        />
        {/* <PostPage/> */}
      </Flex>
    </>
  )
}
export default PostCreate

// type TypeSetButtonProptype =  {setType: any, name: string, height: number, children?: any, bg: string, shadow: string, border: string, minW?: number, Mx?: number}
// const BlogFromContainer = dynamic(() => import("../../components/Forms/BlogForm"), { ssr: false });

// const PostPage = () => {
  
//   const [postProcess, setPostProcess] = useState<PostProcessType>("postTopForm")
//   const [progressValue, setProgressValue] = useState(0)
//   const [postType, setPostType] = useState<PostType>(null)
//   const [postTopInfo, setPostTopInfo] = useState<PostTopInfoType>()

//   return (
//     <>
//       <Progress mt={5} colorScheme="red" w={300} hasStripe value={progressValue} />
//       {postProcess == "postTopForm" && <PostTopForm progressValue={progressValue} setProgressValue={ setProgressValue } setPostProcess={setPostProcess} setPostTopInfo={ setPostTopInfo } postTopInfo={postTopInfo}/> }
//       {postProcess == "postTypeSelect" && <SetTypeButtonContainer setProgressValue={ setProgressValue } setPostType={setPostType} setPostProcess={setPostProcess}/> }
//       {postProcess == "contentForm" && postType == "blog" && <BlogFromContainer setProgressValue={ setProgressValue } setPostType={setPostType} progressValue={progressValue} setPostProcess={setPostProcess}/>}
//     </>
//   )
// }

// const SetTypeButtonContainer = ({setPostType, setPostProcess, setProgressValue}: any) => {

//   const setTypeToBlog = () => {
//     setPostType("blog")
//     setPostProcess("contentForm")
//     setProgressValue(50)
//   }
//   const setTypeToSlide = () => {
//     setPostType("slide")
//     setPostProcess("contentForm")
//     setProgressValue(60)
//   }
//   const setTypeToLinkOnly = () => {
//     setPostType("linkOnly")
//     setPostProcess("contentForm")
//     setProgressValue(90)
//   }

//   return (
//     <>
//       <Heading mt={7} me={20}>
//         <PageBackButton beforePageForm={"postTopForm"} beforeProcessValue={0} setProgressValue={ setProgressValue } setPostProcess={setPostProcess} />
//         Post Tips
//       </Heading>     
//       <Flex mt={3} h="90vh" w="100vw" justify="center" align="center" flexWrap="wrap"> 
//         <TypeSetButton setType={setTypeToBlog} name={"blog"} height={250} bg={"gray.50"} shadow={"inner"} border={"0px"}><FaPen size={45}/></TypeSetButton>
//         <TypeSetButton setType={setTypeToSlide} name={"Slides & Movies"} height={250} bg={"white"} shadow={"xl"} border={"1px solid #eaeaea"}><AiOutlinePicture size={70} /></TypeSetButton>
//         <TypeSetButton setType={setTypeToLinkOnly} name={"Link only"} height={75} bg={"white"} shadow={"xl"} border={"1px solid #eaeaea"} minW={250} Mx={10000}/>
//         {/* 余白調整の空タグ */}
//         <Box w="100%"></Box>
//         <Box w="100%"></Box>
//         <Box w="100%"></Box>
//       </Flex>
//     </>
//   )
// }

// const TypeSetButton = ({setType, name, height, children, bg, shadow, border, minW = 250, Mx = 10}: TypeSetButtonProptype) => {
//   return (
//     <Center 
//     onClick={ setType }
//     display="flex"
//     flexDir="column"
//     bg={bg}
//     h={height} w={250} mx={Mx} my={2} minW={minW}
//     boxShadow={shadow} borderRadius={30}
//     border={border}
//     _hover={{ 
//       bg: "yellow.100",
//       filter: "grayscale(0.3)",
//       transition: ".7s",
//     }}
//     >
//       { children ? <Center color="orange.300" mb={10}>{children}</Center> : null } 
//       <Text fontSize="1.3rem">{name}</Text>
//     </Center>
//   )
// }