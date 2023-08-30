import { gql } from "@apollo/client";

export const USER_MUTATION = gql`
  mutation ($userData: createUserInput!) {
    create_user(userData: $userData) {
      uid
      uuid_uid
      comment
      followee_num
      follower_num
      lang_type
    }
  }
`

export const USER_INFO_MUTATION = gql`
  mutation ($userData: updateUserInput!) {
    update_user_info(userData: $userData) {
        uuid_uid
        comment
        user_name
        user_image
    }
}

  `

// apollo client cache確認
// __APOLLO_CLIENT__.cache.data.data