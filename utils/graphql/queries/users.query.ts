import { gql } from '@apollo/client';
import { User} from '../../../types/user'

export const USER_QUERY = gql`
    query {
        user {
            firebase_id
            user_name
            photo_url
            comment
            pinterest_user_id
        }
    }
`;

export interface UserData {
    user: User[];
}