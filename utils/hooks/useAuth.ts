import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithRedirect, signOut } from "firebase/auth";
import { useContext } from "react";
import { setAuthContext, setUserInfoContext } from "../../context/auth";
import { auth, githubProvider, googleProvider } from '../firebase/init';
import { useUserRegister } from "./useMutation";

export const useSignUpFunc = () => {
    const { setUserState } = useContext(setAuthContext);
    const { userRegister } = useUserRegister();

    const VarifiedNotifySendEmail = async () => {
        if(auth.currentUser) {
            sendEmailVerification(auth.currentUser)
            .then(() => {
                console.log('verification successfully done! we send Email!')
            });
        }
    }

    const execute = async (email: string, password: string) => {
        setUserState('loading')

        // Firebase　新規登録処理
        return createUserWithEmailAndPassword(auth, email, password)
        .then((data) => {
            VarifiedNotifySendEmail()
            const user = data.user;
            console.log(user)
            return user
        }).then((user) => {
            // Firebaseに新規登録後でDatabaseにInsertリクエスト
            userRegister({ variables: { firebase_id :  user.uid } })
            .then(() => {
                console.log('insert cleared')
            }).catch((error) => {
                console.log(error.message)
            })
            setUserState('isUser')
        }).catch((error) => {
            setUserState('guest')
            console.log(error.message)
            alert(error.message)
            // return error
        })
    }
    return {execute};
}

export const useLogInFunc = () => {

    const { setUserState } = useContext(setAuthContext);

    const execute = async (email: string, password: string) => {
        setUserState('loading')
        return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setUserState('isUser');
            // const user = userCredential.user;
            console.log("user logged in");
        })
        .catch((error) => {
            setUserState('guest');
            console.log(error.message)
            alert(error.message)
        });
    }
    return {execute};
}

export const useLogOutFunc = () => {
    const { setUserState } = useContext(setAuthContext);
    const { setUserInfo } = useContext(setUserInfoContext);

    const execute = async () => {
        setUserState('loading')
        return signOut (auth)
        .then(() => {
            setUserInfo(null);
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
    const executeGoogle = async () => {
        return signInWithRedirect(auth, googleProvider)
        // .then(() => console.log('GMail sign in successed'))
        // .catch((error) => {
        //     console.log(error.message)
        //     alert(error.message)
        // });
    }
    
    const executeGithub = async () => {
        return signInWithRedirect(auth, githubProvider)

    }
    return {executeGoogle, executeGithub }

}

export const usePassChangeSendEmail = () => {
    
    const executeSendEmail = (email: string | null | undefined) => {
        email && sendPasswordResetEmail(auth, email)
        .then(() => {
            alert(`
            パスワード変更用のEメールを送りました。
            迷惑メールに送られているかもしれません。ご確認お願いします。
            パスワードは8文字以上、大文字アルファベット、小文字アルファベット、数字を一文字以上含めてください。
            We Sent a Email. Please Change your Passeword from It !
            It may be in Scam mail Box.
            Password needs at least 8 characters, upper & lower case letter & number.
            
            `)
        })
        .catch((error) => {
            alert(error.message)
            console.log(error.code)
        });
    }
    return {executeSendEmail};
}