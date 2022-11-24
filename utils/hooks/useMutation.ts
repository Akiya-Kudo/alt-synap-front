import { useMutation } from "@apollo/client";
import { auth } from "../firebase/init";
import { USER_MUTATION } from "../graphql/mutation/users.mutation.schema";

export const useUserRegister = () => {
    const [userRegister, { data, loading, error }] = useMutation(USER_MUTATION);
    return {userRegister, error, data, loading};
}