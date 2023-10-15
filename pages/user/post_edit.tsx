import { Flex } from '@chakra-ui/react'
import { NextPage } from 'next'
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { PostHeader } from '../../component/layout/Header'
import { GlassButton, GlassSwitchButton } from '../../component/atom/buttons'
import { ArticlePostForm } from '../../component/standalone/ArticlePostForm'
import { ArticlePostData, PostTag } from '../../type/global'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../util/hook/authContext'
import { usePost } from '../../util/hook/usePost'
import { auth } from '../../util/firebase/init'
import { client } from '../_app'
import { READ_USER_UUID } from '../../util/graphql/queries/users.query.schema'
import { useCustomToast } from '../../util/hook/useCustomToast'
import Head from 'next/head'
import { POST_CONTENT_QUERY } from '../../util/graphql/queries/posts.query.scheme'
import { useLazyQuery } from '@apollo/client'
import { OutputData } from '@editorjs/editorjs'


const PostEdit: NextPage = () => {
    // ログアウト時のリダイレクト処理
    const { userState } = useContext(AuthContext);
    const router = useRouter()
    const query_text = router.query.pid as string
    useEffect(() => { if (userState == 'guest')  router.replace('/') }, [userState])
    
    const { updateArticlePost } = usePost();
    const {toastSuccess, toastError} = useCustomToast()
    const  { register, formState: { errors }, formState, } = useForm({mode: "all"});

    const [getPost, { data, loading, error, fetchMore }] = useLazyQuery(POST_CONTENT_QUERY, {
        variables: {
            uuid_pid: query_text
        },
    })

    //for back button alert validation
    const [isSaved, setIsSaved] = useState<boolean>(false)
    //save button loading処理 (userStateChanging中 + save処理中)
    const [isSaveButtonLoading, setIsSaveButtonLoading] = useState<boolean>(true)
    
    // article content default value
    const [contentDefaultValue, setContentDefaultValue] = useState<OutputData | null>(null)
    //article post 投稿初期値設定 
    const [currentPost, setCurrentPost] = useState<ArticlePostData>({
        uuid_pid: undefined,
        title: "",
        top_image_file: null,
        top_image: null,
        top_link: "",
        content_type: 1,
        publish: true,
        deleted: false,
        articleContent: {
        content: {
            blocks:[],
            time: 1695525214999,
            version: "2.26.5",
        }
        },
        tags: [],
    })
    
    
    // reload時のuserData取得 + isSaveButtonLoading　解除
    useEffect(()=>{
        if (userState=="isUser") {
        const data = client.readQuery({ query: READ_USER_UUID });
        if (data) {
            setIsSaveButtonLoading(false)
            // for setting default value of editing page, when true default value is fetched
            getPost().then((res) => {
                const {uuid_pid, title, top_image, top_link, publish, deleted, article_contents, post_tags} = res.data.post
                setContentDefaultValue(article_contents?.content)
                setCurrentPost({
                    ...currentPost,
                    uuid_pid, title, top_image, top_link, publish, deleted,
                    articleContent: {
                        content: article_contents?.content 
                    },
                    tags: post_tags.map((p_t: PostTag) => ({ tag_name: p_t.tags?.tag_name, tid: undefined}))
                })
            }).catch((error) => {
                console.log(error);
            })
        }
        }
    },[userState])

    const handleClick_publish = () => setCurrentPost((preV)=>({...preV, publish: !preV.publish}))
    const handleClick_save = async (e:any) => {
        setIsSaveButtonLoading(true)
        //currentPostをサーバに保存
        try {
        const res = await updateArticlePost(currentPost);
        setCurrentPost((prev)=>({...prev, uuid_pid: res.data.upsert_article_post.post.uuid_pid}))
        toastSuccess("投稿を正常に保存しました");
        setIsSaved(true)
        } catch (error) {
        toastError("保存に失敗しました", "ネットワーク環境や投稿の内容を確認してください");
        console.log(error);

        } finally {
        setIsSaveButtonLoading(false)

        }
    }

    return (
        <>
        <Head><title>Tipsy | 投稿作成</title></Head>
        <PostHeader title={"文章で記録"}  isBackAlertOn={!isSaved}>
            <GlassSwitchButton
            getState={handleClick_publish} defStateValue={currentPost.publish}
            variant={"outline"} fontSize={".9rem"} 
            SBgGradient={"linear(to-tl, tipsy_color_2, tipsy_color_3)"} SHBgGradient={"linear(to-tl, tipsy_color_active_2, tipsy_color_active_3)"}
            Scolor={"bg_switch"} Acolor={"tipsy_color_active_3"} Hcolor={"tipsy_color_3"}
            Schildren={"公開中"}
            >
            公開する
            </GlassSwitchButton>
            <GlassButton
            isLoading={isSaveButtonLoading}
            // disabled={ isSaveButtonLoading || !(!formState.errors.input_article_title && currentPost.title && currentPost.title.length!=0 && !formState.errors.input_top_link)}
            isDisabled={ (isSaveButtonLoading || !(!errors.input_top_link) || !(!errors.input_article_title) || !currentPost.title || currentPost.title.length==0)}
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
            { currentPost.publish ? "内容を保存" : "下書き保存" }
            </GlassButton>
        </PostHeader>

        <Flex 
        className="page"
        direction="column" 
        align="center"
        mt={5}
        >
            <ArticlePostForm 
            register={register} 
            errors={errors} 
            formState={formState}
            stateValue={currentPost}
            setStateValue={setCurrentPost}
            contentDefaultValue={contentDefaultValue}
            />
        </Flex>
        </>
    )
}
export default PostEdit