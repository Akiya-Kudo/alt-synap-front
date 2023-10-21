import { useMutation } from "@apollo/client";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { EditingUser } from "../../type/global";
import { auth, storage } from "../firebase/init";
import { USER_INFO_MUTATION } from "../graphql/mutation/users.mutation.scheme";

export const useUser = () => {
    const [editUserInfo, { data, loading, error }] = useMutation(USER_INFO_MUTATION);

    const updateUserInfo = async (currentUserInfo: EditingUser) => {
        try {
            let new_image_url = currentUserInfo.user_image
            if (currentUserInfo.image_file) {
                let storage_path =  auth.currentUser?.uid + "/thumbnail"
                const storageRef = ref(storage, storage_path);
                await uploadBytes(storageRef, currentUserInfo?.image_file)
                new_image_url = await getDownloadURL(storageRef)
                console.log('strage Uploaded a blob or file! :', new_image_url);
            } else if (!currentUserInfo.image_file && currentUserInfo.new_image_url && currentUserInfo.new_image_url!="") {
                new_image_url = currentUserInfo.new_image_url
            }
            const { data } = await editUserInfo({
                variables: {
                    userData: {
                        user_name: currentUserInfo.user_name,
                        user_image: new_image_url,
                        comment: currentUserInfo.comment
                    }
                }
            })
            //delete strage image if (new image file wont be uploaded in strage & if pre image_path(currentUserInfo.user_image) is firebase strage)
            const isPreImagePathisinStrage = currentUserInfo.user_image?.startsWith("https://firebasestorage.googleapis.com/v0/b/tipsy-c5831.appspot.com/o/")
            if (isPreImagePathisinStrage && !currentUserInfo.image_file && currentUserInfo.new_image_url && currentUserInfo.new_image_url!="") {
                const storageRef = ref(storage, currentUserInfo.user_image)
                await deleteObject(storageRef)
            }
            
            return data.update_user_info
        } catch (error) {
            throw error
        }
    }
    return {  updateUserInfo }
}