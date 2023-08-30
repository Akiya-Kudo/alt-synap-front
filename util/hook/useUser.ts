import { useMutation } from "@apollo/client";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { EditingUser } from "../../type/global";
import { storage } from "../firebase/init";
import { USER_INFO_MUTATION } from "../graphql/mutation/users.mutation.scheme";

export const useUser = () => {
    const [editUserInfo, { data, loading, error }] = useMutation(USER_INFO_MUTATION);

    const updateUserInfo = async (currentUserInfo: EditingUser) => {
        try {
            let new_image_url = currentUserInfo.user_image
            if (currentUserInfo.image_file) {
                let storage_path = "user/thumbnail/" + currentUserInfo.uuid_uid
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
            return data.update_user_info
        } catch (error) {
            throw error
        }
    }
    return {  updateUserInfo }
}