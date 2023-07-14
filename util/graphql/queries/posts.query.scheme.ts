import { gql } from '@apollo/client';

//post searchで使用 => 検索ワードで投稿を取得する Query
export const POSTS_SEARCH = gql`
    query post_search($searchString: String!, $selectedTagIds: [Int]!, $pgNum: Int!, $sortType: Int!) {
        search_post (
            searchString: $searchString, 
            selectedTagIds: $selectedTagIds,
            pgNum: $pgNum,
            sortType: $sortType
        ) {
            posts {
                uuid_uid
                uuid_pid
                title
                top_link
                top_image
                timestamp
                likes_num
                tags {
                    tid
                    tag_name
                    display_name
                    tag_image
                } 
                user {
                    uuid_uid
                    user_name
                    user_image
                }
            }
            total_count
        }
    }
`