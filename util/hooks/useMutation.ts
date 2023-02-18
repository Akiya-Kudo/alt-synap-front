import { useMutation } from "@apollo/client";
import { USER_INFO_MUTATION, USER_MUTATION } from "../graphql/mutation/users.mutation.schema";

export const useUserRegister = () => {
    const [userRegister, { data, loading, error }] = useMutation(USER_MUTATION);
    return {userRegister, error, data, loading};
}

export const useUserInfoUpdater = () => {
    const [userInfoUpdater, { data, loading, error }] = useMutation(USER_INFO_MUTATION);
    return {userInfoUpdater, error, data, loading};
}

