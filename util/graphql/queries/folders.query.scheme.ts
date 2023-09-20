import { gql } from "@apollo/client";

export const GET_FOLDER_POSTS = gql`
    query get_posts_of_folder (
        $fid: Int!,
        $offset: Int!
    ) {
        get_folder_posts(
            fid: $fid
            offset: $offset
        ) {
            fid
            uuid_pid
            timestamp
            posts {
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
        }
        count_folder_posts(fid: $fid)
    }
`