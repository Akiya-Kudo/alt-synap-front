import { makeVar, useMutation } from "@apollo/client";
import { rejects } from "assert";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ArticlePostData, LinkPostData, Post, Post_with_imageFile, Tag, User } from "../../type/global"
import { auth, storage } from "../../util/firebase/init";
import { ARTICLE_POST_UPSERT_MUTATION, LINK_POST_UPSERT_MUTATION } from "../graphql/mutation/posts.mutation.scheme";
import {v4 as uuid_v4} from 'uuid'
import { GET_USER_PUBLISHED_POSTS } from "../graphql/queries/posts.query.scheme";
import { READ_USER_UUID } from "../graphql/queries/users.query.schema";

export const isPostCreateWithCacheExistVar = makeVar(false)

export const usePost = () => {
    const [upsertArticlePost_exe] = useMutation(ARTICLE_POST_UPSERT_MUTATION);
    const [upsertLinkPost_exe] = useMutation(LINK_POST_UPSERT_MUTATION);

    const createArticlePost = async (articlePost: ArticlePostData) => {
        let storage_path = articlePost.top_image ? articlePost.top_image : null;
        try {
            //画像strage保存
            // the case new image is setted ( at the first save request, storage_path is "null", from second time it's before storage path )
            if (articlePost.top_image_file && articlePost.top_image_file!=="DELETE") {
                storage_path = articlePost.top_image ? articlePost.top_image : "posts/" + uuid_v4() + "/thumbnail/"
                const storageRef = ref(storage, storage_path);
                await uploadBytes(storageRef, articlePost.top_image_file)
                storage_path = await getDownloadURL(storageRef)
                console.log('strage Uploaded a blob or file! :', storage_path);
            
            // the case image deleted  (at the first save time if user don't set image, this will be gone through)
            } else if (articlePost.top_image_file && articlePost.top_image_file==="DELETE" && storage_path) {
                const storageRef = ref(storage, storage_path)
                await deleteObject(storageRef)
                storage_path = null
            }

            //graphql schemeに調整する(top_image_fileをtop_imageとしundefined)
            articlePost.top_link = articlePost.top_link==""  ? null : articlePost.top_link
            articlePost.top_image_file=null
            articlePost.top_image = storage_path

            const reqPost = articlePost as Post_with_imageFile
            delete reqPost.top_image_file
            //保存mutation
            const result = await upsertArticlePost_exe({ 
                variables: { postData: {...reqPost}},
                update( cache, { data: { upsert_article_post } } ) {
                    const data_user = cache.readQuery<{ user: User }>({ query: READ_USER_UUID, variables: { uid: auth.currentUser?.uid }})
                    //the duplicate post will removed in typePolicy, so only push new post in this func (if the selectedTag args are used, this have to be changed to handle all case)
                    cache.updateQuery(
                        {
                            query: GET_USER_PUBLISHED_POSTS,
                            variables: {
                                uuid_uid: data_user?.user.uuid_uid,
                                selectedTagIds: null,
                                offset: 0,
                                no_pagenation: false
                            }
                        },
                        (data) => {
                            //非解明校のdsave時にdataがnullになっているため、cache updateされていない => 結果オーライ
                            // console.log(data);
                            if (data!=null && data!=undefined) {
                                const {post, tags} = upsert_article_post
                                const isExist = data.get_posts_made_by_user.some((post_inArray: Post)=>post_inArray.uuid_pid===post.uuid_pid)
                                isPostCreateWithCacheExistVar(true)
                                return ({
                                    get_posts_made_by_user: [{
                                        ...post,
                                        likes_num: 0,
                                        post_tags: tags.map((tag: Tag) => ({
                                            __typename: "PostTag",
                                            tags: tag,
                                        }))
                                    }],
                                    count_posts_made_by_user: isExist ? data.count_posts_made_by_user : data.count_posts_made_by_user + 1
                                })
                            }
                        }
                    )
                }
            })
            return result
        } catch (error) {
            throw error
        }
    }

    const updateArticlePost = async (articlePost: ArticlePostData) => {
        let storage_path = articlePost.top_image ? articlePost.top_image : null;
        try {
            //画像strage保存
            // the case new image is setted ( at the first save request, storage_path is "null", from second time it's before storage path )
            if (articlePost.top_image_file && articlePost.top_image_file!=="DELETE") {
                storage_path = articlePost.top_image ? articlePost.top_image : "posts/" + uuid_v4() + "/thumbnail/"
                const storageRef = ref(storage, storage_path);
                await uploadBytes(storageRef, articlePost.top_image_file)
                storage_path = await getDownloadURL(storageRef)
                console.log('strage Uploaded a blob or file! :', storage_path);
            
            // the case image deleted  (at the first save time if user don't set image, this will be gone through)
            } else if (articlePost.top_image_file && articlePost.top_image_file==="DELETE" && storage_path) {
                const storageRef = ref(storage, storage_path)
                await deleteObject(storageRef)
                storage_path = null
            }

            //graphql schemeに調整する(top_image_fileをtop_imageとしundefined)
            articlePost.top_link = articlePost.top_link==""  ? null : articlePost.top_link
            articlePost.top_image_file=null
            articlePost.top_image = storage_path

            const reqPost = articlePost as Post_with_imageFile
            delete reqPost.top_image_file
            //保存mutation
            const result = await upsertArticlePost_exe({ variables: { postData: {...reqPost} }} )
            return result
        } catch (error) {
            throw error
        }
    }

    const createLinkPost = async (linkPost: LinkPostData) => {
        try {
            const result = await upsertLinkPost_exe({ 
                variables: { postData: {...linkPost}},
                update( cache, { data: { upsert_link_post } } ) {
                    const data_user = cache.readQuery<{ user: User }>({ query: READ_USER_UUID, variables: { uid: auth.currentUser?.uid }})
                    //the duplicate post will removed in typePolicy, so only push new post in this func (if the selectedTag args are used, this have to be changed to handle all case)
                    cache.updateQuery(
                        {
                            query: GET_USER_PUBLISHED_POSTS,
                            variables: {
                                uuid_uid: data_user?.user.uuid_uid,
                                selectedTagIds: null,
                                offset: 0,
                                no_pagenation: false
                            }
                        },
                        (data) => {
                            //非解明校のdsave時にdataがnullになっているため、cache updateされていない => 結果オーライ
                            // console.log(data);
                            if (data!=null && data!=undefined) {
                                const {post} = upsert_link_post
                                const isExist = data.get_posts_made_by_user.some((post_inArray: Post)=>post_inArray.uuid_pid===post.uuid_pid)
                                isPostCreateWithCacheExistVar(true)
                                return ({
                                    get_posts_made_by_user: [{
                                        ...post,
                                        likes_num: 0,
                                        top_image: null,
                                        post_tags: []
                                    }],
                                    count_posts_made_by_user: isExist ? data.count_posts_made_by_user : data.count_posts_made_by_user + 1
                                })
                            }
                        }
                    )
                }
            } )

            // return result
        } catch (error) { throw error }
    }

    const updateLinkPost = async (linkPost: LinkPostData) => {
        try {
            const result = await upsertLinkPost_exe({ variables: { postData: {...linkPost} }} )
            // return result
        } catch (error) { throw error }
    }

    return { createArticlePost, updateArticlePost, createLinkPost, updateLinkPost }
}