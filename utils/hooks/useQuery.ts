import { useLazyQuery } from "@apollo/client";
import { auth } from "../firebase/init";
import { USER_QUERY } from "../graphql/queries/users.query.schema";

export const useUserInfoQuery = () => {
    // apollo client query 処理    
    const [getUserInfo, { loading, error, data }] = useLazyQuery(USER_QUERY, {
        variables: {
            "userId" : auth.currentUser?.uid,
        }
    });
    return {getUserInfo,loading, error, data};
}
