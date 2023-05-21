import { useMutation } from "@apollo/client";
import { rejects } from "assert";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ArticlePostData } from "../../type/global"
import { auth, storage } from "../../util/firebase/init";
import { POST_UPSERT_MUTATION } from "../graphql/mutation/posts.mutation.scheme";

export const usePost = () => {
    const [upsertPost, { data, loading, error }] = useMutation(POST_UPSERT_MUTATION);
    const upsertArticlePost = async (articlePost: ArticlePostData) => {
        try {
            //画像strage保存
            let thumbnail_url = null;
            if (articlePost.top_image_file) {
                const storageRef = ref(storage, "posts/" + articlePost.uuid_pid + "/thumbnail/");
                await uploadBytes(storageRef, articlePost.top_image_file)
                thumbnail_url = await getDownloadURL(storageRef)
                console.log('strage Uploaded a blob or file!');
            }

            //graphql schemeに調整する(top_image_fileをtop_imageとしundefined)
            articlePost.top_link = articlePost.top_link==""  ? null : articlePost.top_link
            delete articlePost["top_image_file"]
            articlePost.top_image = thumbnail_url

            //保存mutation
            const a = await upsertPost({ variables: { upsertPostValue: {...articlePost} }} )
            console.log("🚀 ~ file: usePost.tsx:26 ~ upsertArticlePost ~ a:", a)
            return articlePost
        } catch (error) { 
            throw error
        }
    }
    return { upsertArticlePost }
}