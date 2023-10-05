import { gql } from '@apollo/client';
import { LINK_FRAG } from '../fragment/fragment.scheme';

export const GET_PUBLISHED_LINKS = gql`
    query {
        get_published_links {
            lid
            link_name
            image_path
            explanation
            genre
            is_path_search
            publish
            timestamp
            url_scheme
            query
            joint
            other_queries
            uuid_uid
            users {
                uuid_uid
                user_name
                user_image
            }
        }
    }
`

export const GET_USER_MADE_LINKS = gql`
    query($uuid_uid: String!) {
        get_link_made_by_user(uuid_uid: $uuid_uid) {
            lid
            uuid_uid
            link_name
            image_path
            explanation
            genre
            is_path_search
            publish
            timestamp
            url_scheme
            query
            joint
            other_queries
        }
    }
`

export const GET_LINKCOLLECTION_HISTORY = gql`
    query($uuid_uid: String!) {
        get_link_collections_used(uuid_uid: $uuid_uid) {
            lid
            cid
            uuid_uid
            deleted
            links {
                lid
                uuid_uid
                link_name
                image_path
                explanation
                genre
                is_path_search
                publish
                timestamp
                url_scheme
                query
                joint
                other_queries
                users {
                    uuid_uid
                    user_name
                    user_image
                }
            }
        }
    }
`

export const GET_HOT_LINKS = gql`
    query {
        hot_links {
            lid
            uuid_uid
            link_name
            image_path
            explanation
            genre
            is_path_search
            publish
            timestamp
            url_scheme
            query
            joint
            other_queries
            users {
                uuid_uid
                user_name
                user_image
            }
        }
    }
`

export const GET_GUEST_COLLECTIOINS = gql`
    query {
        get_guest_collections {
            cid
            collection_name
            link_collections {
                lid
                cid
                uuid_uid
                deleted
                links {
                    lid
                    link_name
                    image_path
                    explanation
                    url_scheme
                    query
                    joint
                    other_queries
                    genre
                    is_path_search
                    publish
                    timestamp
                }
            }
        }
    }
`