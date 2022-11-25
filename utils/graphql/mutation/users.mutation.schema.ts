import { gql } from "@apollo/client";

export const USER_MUTATION = gql`
  mutation ($firebase_id: String!){
    registerUser(firebase_id: $firebase_id ) {
      firebase_id
    }
  }
`
export const USER_INFO_MUTATION = gql`
  mutation ($updateUserInfoData: updateUserInfoInput!){
    updateUserInfo(updateUserInfoData: $updateUserInfoData) {
      firebase_id
      user_name
      comment
      pinterest_user_id
    }
  }
  `
  
  // mutation ($updateUserInfoData: updateUserInfoInput){
  //   updateUserInfo(updateUserInfoData: {firebase_id: "a", user_name: "akaka", comment: "ksdfjnnv"}) {
  //     firebase_id
  //     user_name
  //     comment
  //     pinterest_user_id
  //   }
  // }

  // input updateUserInfoInput {
  //   comment: String
  //   firebase_id: String!
  //   pinterest_user_id: String
  //   user_name: String
  // }
// apollo client cache確認
// __APOLLO_CLIENT__.cache.data.data