import { gql } from '@apollo/client';

//post searchで使用 => 検索ワードで投稿を取得する Query
export const POSTS_SEARCH = gql`
    query ($searchString: String!, $selectedTagIds: [Int]!, $pgNum: Int!, $sortType: Int!) {
        search_post_tag (
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
                }   
            }
            total_count
        }
    }
`