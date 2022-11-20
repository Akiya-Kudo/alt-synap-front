import { gql } from "@apollo/client";

export const USER_MUTATION = gql`
    mutation($user : UserInsertType!) {
        userRegister(user : $user) {
            firebase_id
            user_name
            photo_url
            comment
            pinterest_user_id
        }
    }
`

export interface UserInsertType {
        firebase_id: string;
        user_name?: string;
        photo_url?: string;
        comment? : string;
        pinterest_user_id?: string;
}
