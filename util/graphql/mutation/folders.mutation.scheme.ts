import { gql } from "@apollo/client";

export const UPSERT_FOLDER = gql`
    mutation ($folderData: upsertFolderInput!) {
        upsert_folder( folderData: $folderData ) {
            fid
            uuid_uid
            title
            top_image
            timestamp
        }
    }
`

export const DELETE_FOLDER = gql`
    mutation($fid: Int!) {
        delete_folder(
            fid: $fid
        ) {
            fid
            uuid_uid
            title
            top_image
            timestamp
        }
    }
`