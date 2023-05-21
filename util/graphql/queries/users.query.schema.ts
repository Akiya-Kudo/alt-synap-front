import { gql } from '@apollo/client';
// import { User} from '../../../type/user'

export const USER_QUERY = gql`
    query($uid: String!) {
        user(uid: $uid) {
            uid
            uuid_uid
            comment
            followee_num
            follower_num
            lang_type
        }
    }
`;

