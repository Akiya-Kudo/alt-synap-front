import { gql } from '@apollo/client';
// import { User} from '../../../type/user'

export const USER_QUERY = gql`
    query login_user_info_query($uid: String!) {
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

export const READ_USER_UUID = gql`
    query login_user_uuid_query($uid: ID!) {
        user(uid: $uid) {
            uuid_uid
        }
    }
`