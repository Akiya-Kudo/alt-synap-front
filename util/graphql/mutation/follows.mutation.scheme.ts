import { gql } from "@apollo/client";

export const TOGGLE_FOLLOW = gql`
    mutation($followee_uuid: String!) {
        follow_toggle (followee_uuid: $followee_uuid) {
            followee_uuid
            follower_uuid
        }
    }
`