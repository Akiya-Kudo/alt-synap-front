import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, signOut, updateProfile } from "firebase/auth";
import { useContext, useEffect } from "react";
import { AuthContext, setAuthContext } from "./authContext";
import { auth, githubProvider, googleProvider } from '../firebase/init';
import { useUserRegister } from "./useMutation";
import { useUserInfoQuery } from "./useQuery";
import { useMutation } from "@apollo/client";
import { USER_QUERY } from "../graphql/queries/users.query.schema";
import { USER_MUTATION } from "../graphql/mutation/users.mutation.scheme";
import {v4 as uuid_v4} from 'uuid'
import { Box, Flex, Spinner } from "@chakra-ui/react";
import { UserStateStringType } from "../../type/global";
import { useRouter } from "next/router";

export const useSignUpFunc = () => {
    const { setUserState } = useContext(setAuthContext);
    const [userRegister, { data, loading, error }] = useMutation(USER_MUTATION);

    const VarifiedNotifySendEmail = async () => {
        if(auth.currentUser) {
            sendEmailVerification(auth.currentUser)
            .then(() => {
                console.log('verification successfully done! we send Email!')
            });
        }
    }

    const execute = async (email: string, password: string, user_name: string) => {
        setUserState('loading')
        try {
            // Firebase　新規登録処理
            const result = await createUserWithEmailAndPassword(auth, email, password)
            const user = result.user
            //firebase user name　update
            await updateProfile(user, {displayName: user_name})
            // back end server data store
            const result_m = await userRegister({
                variables: {
                    "userData": {
                        "uid": user.uid,
                        "uuid_uid": uuid_v4(),
                    }
                }
            })
            console.log('sign in server data store done')
            //firebase email send
            await VarifiedNotifySendEmail()
            setUserState('isUser')
        } catch (error) {
            console.error("sign in error");
            alert(error);
            setUserState('guest')
        }
    }
    return {execute};
}

export const useLogInFunc = () => {

    const { setUserState } = useContext(setAuthContext);

    const {getLoginUserInfo} = useUserInfoQuery();

    const execute = async (email: string, password: string) => {
        setUserState('loading')
        try {
            const result = await signInWithEmailAndPassword(auth, email, password)
            const result_m = await getLoginUserInfo({
                variables: {"uid": result.user.uid}
            })
            setUserState("isUser")
        } catch (error) {
            console.error("log in error");
            alert(error);
            setUserState('guest')
        }
    }
    return {execute};
}

export const useLogOutFunc = () => {
    const { setUserState } = useContext(setAuthContext);

    const execute = async () => {
        setUserState('loading')
        return signOut(auth)
        .then(() => {
            setUserState('guest');
            console.log('sign out successed');
            // console.log(auth);
        }).catch((error) => {
            setUserState('isUser');
            console.log(error.message)
            alert(error.message)
        });
    }
    return {execute};
}

export const useSocialLoginFunc = () => {
    const { setUserState } = useContext(setAuthContext);
    
    const executeGoogle = async () => {
        setUserState("loading")
        const result = await signInWithPopup(auth, googleProvider)
        .then((result) => {
            setUserState("isUser")
            const credential = GoogleAuthProvider.credentialFromResult(result); // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            const token = credential?.accessToken;
            const user = result.user; // The signed-in user info.
        }).catch((error) => {
            setUserState("guest")
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email; // The email of the user's account used.
            const credential = GoogleAuthProvider.credentialFromError(error); // The AuthCredential type that was used.
        });
    }
    
    const executeGithub = async () => {
        setUserState("loading")
        const result = await signInWithPopup(auth, githubProvider)
        .then((result) => {
            setUserState("isUser")
            const credential = GithubAuthProvider.credentialFromResult(result); // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            const token = credential?.accessToken;
            const user = result.user; // The signed-in user info.
        }).catch((error) => {
            setUserState("guest")
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email; // The email of the user's account used.
            const credential = GithubAuthProvider.credentialFromError(error); // The AuthCredential type that was used.
            console.log(errorCode);
            console.log(errorMessage);
        });
    }
    return {executeGoogle, executeGithub }

}

export const usePassChangeSendEmail = () => {
    
    const executeSendEmail = (email: string | null | undefined) => {
        email && sendPasswordResetEmail(auth, email)
        .then(() => {
            alert(`
            パスワード変更用のEメールを送りました。受け取れていないメールは迷惑メールBOXを確認ください。
            パスワードは8文字以上、大文字アルファベット、小文字アルファベット、数字を一文字以上含めてください。
            `)
        })
        .catch((error) => {
            alert(error.message)
            console.log(error.code)
        });
    }
    return {executeSendEmail};
}

export const useLoading = () => {
    return (
        <Flex zIndex={10000} backgroundColor={"rgba(133, 133, 133, 0.5)"} 
            position={"fixed"} top={0} left={0} w="100vw" h="100vh" justify={"center"} align="center">
            <Spinner thickness='5px'speed='0.65s' size='xl' color='tipsy_color_3' />
        </Flex>
    )
}