import { gql } from '@apollo/client';
import { User} from '../../../types/user'

export const USER_QUERY = gql`
    query Query($userId: ID!) {
        user(id: $userId) {
            firebase_id
            user_name
            photo_url
            comment
        }
    }
`;

export interface UserData {
    user: User[];
}
