import { gql } from '@apollo/client';
// import { User} from '../../../type/user'

export const USER_QUERY = gql`
    query ($userId: String!){
        user(firebase_id: $userId) {
            firebase_id
            user_name
            photo_url
            comment
            followee_num
            follower_num
            lang_type
        }
    }
`;

export const USERS_ALL_QUERY = gql`
    query {
        users_all {
            firebase_id
            user_name
            photo_url
            comment
        }
    }`