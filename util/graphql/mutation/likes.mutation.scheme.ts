import { gql } from "@apollo/client";

export const TOGGLE_LIKE = gql`
    mutation ($uuid_pid: String!) {
        like_toggle(uuid_pid: $uuid_pid) {
            uuid_pid
            uuid_uid
            timestamp
        }
    }
`