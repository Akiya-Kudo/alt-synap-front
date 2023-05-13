import { rejects } from "assert";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ArticlePostData } from "../../type/page"
import { auth, storage } from "../../util/firebase/init";

export const usePostCreate = () => {
    const createArticlePost = async (articlePost: ArticlePostData) => {
        if (articlePost.top_image_file) {
            try {
                let thumbnail_url = ""
                const storageRef = ref(storage, "posts/" + articlePost.pid_uuid + "/thumbnail/");
                await uploadBytes(storageRef, articlePost.top_image_file)
                console.log('strage Uploaded a blob or file!');
            } catch (error){
                console.log(error);
                throw error
            }
            // .then((snapshot) => {
            //     getDownloadURL(storageRef)
            //     .then((url) => {
            //         thumbnail_url = url
            //         console.log(url);
                    
                    // サーバーにapiを叩く
                    // userInfoUpdater({ 
                    //     variables: { 
                    //         updateUserInfoData: {
                    //             firebase_id: userInfo?.firebase_id,
                    //             photo_url: thumbnail_url,
                    //         }
                    //     }
                    // })
                    // .then((data: any) => {
                    //     console.log('db image path insert cleared')
                    //     reset({inputText7: ""})
                    //     setUserInfo(data.data.updateUserInfo)
                    // })
                    // .catch((error: { message: any; }) => {
                    //     console.log(error.message)
                    // })
            //     })
            //     .catch((error) => {console.log(error.message)});
            // })
            // .catch((error) => {console.log(error.message)});
        }
        
    }
    return { createArticlePost }
}