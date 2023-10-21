import { gql } from "@apollo/client";

export const ADD_POSTS_TO_FOLDER = gql`
    mutation($fid: Int!, $uuid_pids: [String!]!) {
        add_posts_to_folder(
            fid: $fid, uuid_pids: $uuid_pids
        ) {
            fid
            uuid_pid
            uuid_uid
            timestamp
        }
    }
`

export const DELETE_POSTS_FROM_FOLDER = gql`
    mutation($fid: Int!, $uuid_pids: [String!]!) {
        delete_posts_from_folder(
            fid: $fid, uuid_pids: $uuid_pids
        ) {
            fid
            uuid_pid
            uuid_uid
            timestamp
        }
    }
`

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