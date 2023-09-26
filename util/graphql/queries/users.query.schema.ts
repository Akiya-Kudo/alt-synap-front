import { gql } from '@apollo/client';
// import { User} from '../../../type/user'

export const USER_QUERY = gql`
    query login_user_info_query($uid: String!) {
        user(uid: $uid) {
            uid
            uuid_uid
            user_name
            user_image
            comment
            followee_num
            follower_num
            lang_type
            top_collection

            folders {
                fid
                uuid_uid
                title
                top_image
                timestamp
            }

            user_tags {
                uuid_uid
                tid
                timestamp
                
                tags {
                    tid
                    tag_name
                    display_name
                    tag_image
                }
            }

            collections {
                cid
                collection_name
                uuid_uid
                deleted
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
    }
`;

export const READ_USER_UUID = gql`
    query login_user_uuid_query($uid: String!) {
        user(uid: $uid) {
            uuid_uid
        }
    }
`

export const READ_USER_UUID_AND_FOLDERS = gql`
    query login_user_uuid_query($uid: String!) {
        user(uid: $uid) {
            uuid_uid
            folders {
                fid
                uuid_uid
                title
                top_image
                timestamp
            }
        }
    }
`

export const READ_USER_FOLDERS = gql`
    query login_user_uuid_query($uid: String!) {
        user(uid: $uid) {
            folders {
                fid
                uuid_uid
                title
                top_image
                timestamp
            }
        }
    }
`

export const USER_COLLECTION_FRAGMENT = gql`
    fragment UserCollections on User {
        collections {
            cid
            collection_name

            link_collections {
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

export const GET_OTHER_USER_QUERY = gql`
    query other_user_info_query( $uuid_uid: String! ) {
        other_user(uuid_uid: $uuid_uid) {
            uuid_uid
            user_name
            user_image
            comment
            follower_num
            followee_num
            follows_follows_followee_uuidTousers {
                follower_uuid
                followee_uuid
            }
        }
    }
`