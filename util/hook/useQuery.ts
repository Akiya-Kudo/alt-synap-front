import { useLazyQuery } from "@apollo/client";
import { auth } from "../firebase/init";
import { USER_QUERY } from "../graphql/queries/users.query.schema";

export const useUserInfoQuery = () => {
    // apollo client query 処理    
    const [getLoginUserInfo, { loading, error, data }] = useLazyQuery(USER_QUERY, {
        variables: {
            "uid" : auth.currentUser?.uid,
        }
    });
    return {getLoginUserInfo,loading, error, data};
}

