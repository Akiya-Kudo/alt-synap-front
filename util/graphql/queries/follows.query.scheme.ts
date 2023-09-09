import { gql } from "@apollo/client";

export const GET_FOLLW_LIST = gql`
    query (
        $uuid_uid: String!, 
        $is_follower_list: Boolean!, 
        $offset: Int! 
    ) {
        get_follow_list(
            uuid_uid: $uuid_uid,
            is_follower_list: $is_follower_list,
            offset: $offset
        ) {
            follower_uuid
            followee_uuid
            users_follows_followee_uuidTousers {
                uuid_uid
                user_name
                user_image
                follows_follows_followee_uuidTousers {
                    follower_uuid
                    followee_uuid
                }
            }
            users_follows_follower_uuidTousers {
                uuid_uid
                user_name
                user_image
                follows_follows_followee_uuidTousers {
                    follower_uuid
                    followee_uuid
                }
            }
        }
    }
`