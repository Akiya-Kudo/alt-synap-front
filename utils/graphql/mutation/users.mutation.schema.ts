import { gql } from "@apollo/client";

export const USER_MUTATION = gql`
  mutation ($createUserInfoData: createUserInfoInput!){
    registerUser(createUserInfoData: $createUserInfoData ) {
      firebase_id
      user_name
    }
  }
`
export const USER_INFO_MUTATION = gql`
  mutation ($updateUserInfoData: updateUserInfoInput!){
    updateUserInfo(updateUserInfoData: $updateUserInfoData) {
      firebase_id
      user_name
      comment
      photo_url
      followee_num
      follower_num
      lang_type
    }
  }
  `

// apollo client cache確認
// __APOLLO_CLIENT__.cache.data.data