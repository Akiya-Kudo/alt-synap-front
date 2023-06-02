import { Button, Flex } from '@chakra-ui/react'
import { NextPage } from 'next'
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { PostHeader } from '../../component/layout/Header'
import { GlassButton, GlassSwitchButton } from '../../component/atom/buttons'
import { ArticlePostForm } from '../../component/standalone/ArticlePostForm'
import { ArticlePostData } from '../../type/global'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../util/hook/authContext'
import { usePost } from '../../util/hook/usePost'
import { auth } from '../../util/firebase/init'
import { client } from '../_app'
import { READ_USER_UUID } from '../../util/graphql/queries/users.query.schema'
import { useCustomToast } from '../../util/hook/useCustomToast'
import { log } from 'console'
import { onAuthStateChanged } from 'firebase/auth'


const PostCreate: NextPage = () => {
  // ログアウト時のリダイレクト処理
  const { userState } = useContext(AuthContext);
  const router = useRouter()
  useEffect(() => { if (userState == 'guest')  router.replace('/') }, [userState])

  const { upsertArticlePost } = usePost();
  const {toastPostSuccess, toastPostError} = useCustomToast()
  const  { register, formState: { errors }, formState, } = useForm({mode: "all"});

  //save button loading処理 (userStateChanging中 + save処理中)
  const [isSaveButtonLoading, setIsSaveButtonLoading] = useState<boolean>(true) 
  
  //article post 投稿初期値設定 
  const [currentPost, setCurrentPost] = useState<ArticlePostData>({
    uuid_pid: undefined,
    title: "",
    top_image_file: null,
    top_link: "",
    content_type: 1,
    publish: false,
    deleted: false,
    articleContent: {
      content: {
        blocks:[],
        time: undefined,
        version: "2.26.5",
      }
    },
    tags: [],
  })

  // reload時のuserData取得 + isSaveButtonLoading　解除
  useEffect(()=>{
    if (userState=="isUser") {
      const data = client.readQuery({
        query: READ_USER_UUID,
        variables: { uid: auth.currentUser?.uid },
      });
      if (data) {
        setIsSaveButtonLoading(false)
      }
    }
    
  },[userState])

  const handleClick_publish = () => setCurrentPost((preV)=>({...preV, publish: !preV.publish}))
  const handleClick_save = async (e:any) => {
    setIsSaveButtonLoading(true)
    console.log("save function input values ☟")
    console.log(currentPost)
    
    //currentPostをサーバに保存
    try {
      const res = await upsertArticlePost(currentPost);
      setCurrentPost((prev)=>({...prev, uuid_pid: res.data.upsert_article_post.post.uuid_pid}))
      toastPostSuccess();
      console.log("response ☟");
      console.log(res.data.upsert_article_post);
    } catch (error) {
      toastPostError();
      console.log(error);
    } finally {
      setIsSaveButtonLoading(false);
    }
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
        isLoading={isSaveButtonLoading}
        disabled={ isSaveButtonLoading || !(!formState.errors.input_article_title && currentPost.title && currentPost.title.length!=0 && !formState.errors.input_top_link)}
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
      </Flex>
    </>
  )
}
export default PostCreate