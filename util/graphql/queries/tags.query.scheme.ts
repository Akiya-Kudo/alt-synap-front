import { gql } from '@apollo/client';

//post searchで使用 => 検索ワードで投稿を取得する Query
export const TAG_SEARCH = gql`
    query tag_search($searchString: String!) {
        search_tag (
            searchString: $searchString
        ) {
            tid
            display_name
            tag_image
            tag_content_num
        }
    }
`

export const GET_TAG = gql`
    query get_tag_info($tid: Int!) {
        tag ( tid: $tid ) {
            tid
            display_name
            tag_name
            tag_image
        }
    }
`