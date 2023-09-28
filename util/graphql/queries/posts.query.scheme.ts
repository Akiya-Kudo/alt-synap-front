import { gql } from '@apollo/client';

//post searchで使用 => 検索ワードで投稿を取得する Query
export const POSTS_SEARCH = gql`
    query post_search($searchString: String, $selectedTagId: Int, $offset: Int!, $sortType: Int!) {
        search_post (
            searchString: $searchString, 
            selectedTagId: $selectedTagId,
            offset: $offset,
            sortType: $sortType
        ) {
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
            folder_posts {
                fid
                uuid_pid
                uuid_uid
                timestamp
            }
        }
        count_total_posts ( searchString: $searchString, selectedTagId: $selectedTagId )
    }
`

export const GET_POSTS_NEW = gql`
    query post_search($searchString: String, $selectedTagId: Int, $offset: Int!, $sortType: Int!) {
        search_post (
            searchString: $searchString, 
            selectedTagId: $selectedTagId,
            offset: $offset,
            sortType: $sortType
        ) {
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
            folder_posts {
                fid
                uuid_pid
                uuid_uid
                timestamp
            }
        }
    }
`

export const GET_USER_PUBLISHED_POSTS = gql`
    query get_posts_made_by_user_and_count($uuid_uid: String!, $selectedTagIds: [Int], $offset: Int!, $no_pagenation: Boolean! ) {
        get_posts_made_by_user (
            uuid_uid: $uuid_uid, 
            selectedTagIds: $selectedTagIds,
            offset: $offset,
            no_pagenation: $no_pagenation
        ) {
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
            folder_posts {
                fid
                uuid_pid
                uuid_uid
                timestamp
            }
        }
        count_posts_made_by_user ( uuid_uid: $uuid_uid, selectedTagIds: $selectedTagIds )
    }
`

export const GET_USER_LIKED_POSTS = gql`
    query get_posts_user_liked($selectedTagIds: [Int], $offset: Int! ) {
        get_posts_user_liked (
            selectedTagIds: $selectedTagIds,
            offset: $offset,
        ) {
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
            folder_posts {
                fid
                uuid_pid
                uuid_uid
                timestamp
            }
        }
        count_posts_user_liked (selectedTagIds: $selectedTagIds)
    }
`

export const GET_FOLLOWEES_POSTS = gql`
    query get_posts_user_follow( $offset: Int! ) {
        get_posts_user_follow (
            offset: $offset
        ) {
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
            folder_posts {
                fid
                uuid_pid
                uuid_uid
                timestamp
            }
        }
    }
`

export const POST_CONTENT_QUERY = gql`
    query post_content_query($uuid_pid: String!) {
        post (
            uuid_pid: $uuid_pid
        ) {
            uuid_pid
            title
            top_image
            top_link
            content_type
            likes_num
            timestamp
            publish
            deleted
            article_contents {
                uuid_pid
                content
            }
            users {
                uuid_uid
                user_name
                user_image
                comment
            }
            post_tags {
                tags {
                    tid
                    tag_name
                    display_name
                    tag_image
                    tag_content_num
                }
            }
            likes {
                uuid_pid
                uuid_uid
            }
            folder_posts {
                fid
                uuid_pid
                uuid_uid
                timestamp
            }
        }
    }
`