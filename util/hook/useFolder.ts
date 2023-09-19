import { useMutation } from "@apollo/client";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { EditingFolder, Folder, User } from "../../type/global";
import { storage } from "../firebase/init";
import { UPSERT_FOLDER } from "../graphql/mutation/folders.mutation.scheme";
import {v4 as uuid_v4} from 'uuid'
import { USER_FOLDER_FRAG, USER_FOLLOWEE_FRAG } from "../graphql/fragment/fragment.scheme";

export const useFolder = () => {
    const [editFolder, { data, loading, error }] = useMutation(UPSERT_FOLDER, {
        update( cache, { data: { upsert_folder } } ) {
            cache.updateFragment(
                { 
                    id: `User:{"uuid_uid":"${upsert_folder.uuid_uid}"}`,
                    fragment: USER_FOLDER_FRAG
                },
                (data_user) => {
                    let new_folders = data_user.folders

                    const is_existing = !!new_folders.find((folder: Folder) => folder.fid == upsert_folder.fid)
                    if (is_existing) {
                        new_folders = new_folders.filter((folder: Folder) => folder.fid != upsert_folder.fid)
                    }
                    new_folders = [upsert_folder, ...new_folders]
                    return ({ folders: new_folders })
                }
            )
        }
    });

    const upsertFolder = async (currentFolder: EditingFolder) => {
        try {
            let new_image_url = currentFolder.top_image
            if (currentFolder.image_file) {
                let storage_path = "folder/" + uuid_v4()
                const storageRef = ref(storage, storage_path);

                await uploadBytes(storageRef, currentFolder.image_file)
                new_image_url = await getDownloadURL(storageRef)
                console.log('strage Uploaded a blob or file! :', new_image_url);
            } else if (!currentFolder.image_file && currentFolder.new_image_url && currentFolder.new_image_url!="") {
                new_image_url = currentFolder.new_image_url
            }
            const { data } = await editFolder({
                variables: {
                    folderData: {
                        fid: currentFolder.fid ? currentFolder.fid : null,
                        title: currentFolder.title,
                        top_image: new_image_url,
                    }
                }
            })
            return data.upsert_folder
        } catch (error) {
            throw error
        }
    }
    return { upsertFolder }
}