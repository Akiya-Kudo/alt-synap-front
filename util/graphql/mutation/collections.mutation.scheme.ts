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