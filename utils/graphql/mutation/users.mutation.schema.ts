import { gql } from "@apollo/client";

export const USER_MUTATION = gql`
mutation ($firebase_id: String!){
    registerUser(firebase_id: $firebase_id ) {
      firebase_id
    }
  }
`

export interface UserInsertType {
        firebase_id: string;
}
