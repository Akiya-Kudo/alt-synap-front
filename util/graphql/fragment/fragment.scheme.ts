import { gql } from "@apollo/client";

export const LINK_COLLECTION_FRAGMENT = gql`
    fragment MyCollection on Collection {
        cid
        collection_name
        deleted
        uuid_uid
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
                uuid_uid
            }
        }
    }
`

export const COLLECTION_FRAGMENT_TO_LINKCOLLECTION = gql`
    fragment MyCollectionOnlyLinkCollection on Collection {
        link_collections {
            lid
            cid
            uuid_uid
            deleted
            links {
                lid
            }
        }
    }
`

export const ALL_LINKCOLLECTIONS = gql`
fragment AllLinkCollections on User {
    collections {
        link_collections {
            lid
            cid
            uuid_uid
            deleted
        }
    }
}
`

export const USER_FRAGMENT_COLLECTION_ONLY = gql`
fragment UserCollection on User {
    collections {
        cid
        uuid_uid
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

export const USER_FRAG = gql`
    fragment UserFragment on User {
        uuid_uid
        uid
        comment
        lang_type
        follewer_num
        follewee_num
        user_name
        user_image
    }
`;

export const LINK_FRAG = gql`
    fragment LinkFragment on Link {
        lid
        uuid_uid
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
`

export const LINKCOLLECTION_FRAG = gql`
    fragment LinkCollectionFragment on Linkcollection {
        lid 
        cid
        uuid_uid
        deleted
    }
`

export const COLLECTION_FRAG = gql`
    fragment CollectionFragment on Collection {
        cid
        uuid_uid
        collection_name
        deleted
    }
`

export const USER_FOLLOWEE_FRAG = gql`
    fragment UserFolloweeFragment on User {
        followee_num
        follows_follows_followee_uuidTousers {
            followee_uuid
            follower_uuid
        }
    }
`

export const POSTS_LIKE_FRAG = gql`
    fragment PostLikeFragment on Post {
        likes_num
        likes {
            uuid_pid
            uuid_uid
        }
    }
`

export const POST_ALL_FIELD_FRAG = gql`
    fragment PostAllFieldFragment on Post {
        uuid_uid
        uuid_pid
        title
        top_link
        top_image
        timestamp
        likes_num
        content_type
        publish
        deleted
        post_tags {
            tags {
                tid
                tag_name
                display_name
                tag_image
            }
        } 
        users {
            uuid_uid
            user_name
            user_image
        }
        likes {
            uuid_pid
            uuid_uid
        }
    }
`
