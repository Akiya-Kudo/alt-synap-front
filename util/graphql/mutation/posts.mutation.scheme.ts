import { gql } from "@apollo/client";

export const POST_UPSERT_MUTATION = gql`
    mutation ($upsertPostValue: upsertPostInput!) {
        upsertPost(upsertPostValue: $upsertPostValue) {
            uid
            title
            top_image
            top_link
            content_type
            publish
            deleted
            post_tags {
                id
                tid
                pid
            }
        }
    }
`