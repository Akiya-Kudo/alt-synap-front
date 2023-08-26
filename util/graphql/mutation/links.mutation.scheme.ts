import { gql } from "@apollo/client";

export const REMOVE_LINK_FROM_COLLECTION = gql`
    mutation (
        $lid: Int!,
        $cid: Int!
    ) {
        remove_link_from_collection(
            lid: $lid,
            cid: $cid,
        ) {
            lid
            cid
            uuid_uid
            deleted
        }
    }
`

export const ADD_LINK_TO_COLLECTION = gql`
    mutation(
        $lid: Int!,
        $cid: Int!,
        $uuid_uid: String!
    ) {
        add_link_to_collection(
            lid: $lid,
            cid: $cid,
            uuid_uid: $uuid_uid
        ) {
            lid
            cid
            uuid_uid
            deleted
            links { lid }
        }
    }
`

export const DELETE_LINK_COLLECTION = gql`
    mutation($lid: Int!, $uuid_uid: String!) {
        delete_link_collection(lid: $lid, uuid_uid: $uuid_uid) {
            lid
            cid
            uuid_uid
            deleted
        }
    }
`

export const DELETE_LINK = gql`
    mutation(
        $lid: Int!
    ) {
        delete_link(
            lid: $lid
        ) {
            lid
        }
    }
`

export const CREATE_LINK = gql`
    mutation ($linkData: createLinkInput!) {
        create_link(linkData: $linkData) {
            lid
            link_name
            url_scheme
            genre
            image_path
            explanation
            query
            joint
            other_queries
            publish
            timestamp
            is_path_search
            uuid_uid
            users {
                uuid_uid
                user_name
            }
        }
    }
`