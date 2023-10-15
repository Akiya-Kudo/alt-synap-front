import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, signOut, updateProfile } from "firebase/auth";
import { useContext } from "react";
import { setAuthContext } from "./authContext";
import { auth, githubProvider, googleProvider } from '../firebase/init';
import { useUserInfoQuery } from "./useQuery";
import { Flex, Spinner } from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { USER_INFO_MUTATION } from "../graphql/mutation/users.mutation.scheme";
import { client } from "../../pages/_app";
import { READ_USER_UUID } from "../graphql/queries/users.query.schema";

export const useSignUpFunc = () => {
    const { setUserState } = useContext(setAuthContext);
    const [updateUserName] = useMutation(USER_INFO_MUTATION)

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

            // update user info (user name)
            const res_with_user_name = await updateUserName({variables: {
                userData: {
                    user_name: user_name,
                }
            }})
            
            //firebase email send
            await VarifiedNotifySendEmail()
            setUserState('isUser')
        } catch (error) {
            console.error("sign in error");
            console.log(error);
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

        const data = client.readQuery({ query: READ_USER_UUID });
        if (data?.user) {
            const delete_user = client.cache.evict({id: client.cache.identify(data.user), broadcast: false})
        }

        return signOut(auth)
        .then(() => {
            setUserState('guest');
            console.log('sign out successed');

            
            console.log("cache reseted");
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