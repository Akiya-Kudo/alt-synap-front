import { useMutation } from "@apollo/client";
import { rejects } from "assert";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ArticlePostData, Post, Post_with_imageFile } from "../../type/global"
import { auth, storage } from "../../util/firebase/init";
import { POST_UPSERT_MUTATION } from "../graphql/mutation/posts.mutation.scheme";
import {v4 as uuid_v4} from 'uuid'

export const usePost = () => {
    const [upsertPost, { data, loading, error }] = useMutation(POST_UPSERT_MUTATION);

    const upsertArticlePost = async (articlePost: ArticlePostData) => {
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
            const result = await upsertPost({ variables: { postData: {...reqPost} }} )
            return result
        } catch (error) {
            throw error
        }
    }
    return { upsertArticlePost }
}