import { gql } from "@apollo/client";

export const POST_UPSERT_MUTATION = gql`
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