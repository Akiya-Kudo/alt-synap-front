import { gql } from '@apollo/client';
// import { User} from '../../../type/user'

export const USER_QUERY = gql`
    query login_user_info_query($uid: String!) {
        user(uid: $uid) {
            uid
            uuid_uid
            comment
            followee_num
            follower_num
            lang_type

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