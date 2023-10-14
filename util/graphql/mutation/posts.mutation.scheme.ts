import { gql } from "@apollo/client";

export const ARTICLE_POST_UPSERT_MUTATION = gql`
    mutation ($postData: upsertArticlePostInput!) {
        upsert_article_post(postData: $postData) {
            post {
                uuid_pid
                uuid_uid
                title
                top_image
                top_link
                content_type
                publish
                deleted
                timestamp
                article_contents {
                    content
                }
            }
            tags {
                tid
                tag_name
            }
        }
    }
`

export const LINK_POST_UPSERT_MUTATION = gql`
    mutation ($postData: upsertLinkPostInput!) {
        upsert_link_post(postData: $postData) {
            post {
                uuid_pid
                uuid_uid
                title
                top_link
                content_type
                publish
                deleted
                timestamp
            }
        }
    }
`

export const DELETE_POST = gql`
    mutation ($uuid_pid: String!) {
        delete_post(uuid_pid: $uuid_pid) {
            uuid_pid
            uuid_uid
            content_type
            publish
            deleted
            top_image
        }
    }
`