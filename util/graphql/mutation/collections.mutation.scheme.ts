import { gql } from "@apollo/client";

export const REMOVE_COLLECTION = gql`
    mutation ( $cid: Int! ) {
        remove_collection( cid: $cid ) {
            cid
            collection_name
            deleted
            link_collections {
                lid
                cid
                uuid_uid
                deleted
            }
        }
    }
`

export const CREATE_COLLECTION = gql`
    mutation ( $collection_name: String!, $uuid_uid: String! ) {
        create_collection( collection_name: $collection_name, uuid_uid: $uuid_uid ) {
            cid
            collection_name
            deleted
            uuid_uid
        }
    }
`