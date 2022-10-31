import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithRedirect, signOut } from "firebase/auth";
import { userStateType } from "../../types/user";
import { auth, githubProvider, googleProvider } from '../firebase/init';

export const signUpFunc = ( email: string, password: string, changeUserState: (state: userStateType) => void ) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        VarifiedNotifySendEmail()
        const user = userCredential.user;
        changeUserState('isUser')
        console.log(user)
    })
    .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
        changeUserState('guest');
    });
}

export const logInFunc = ( email: string, password: string, changeUserState: (state: userStateType) => void ) => {


    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("user logged in");
        changeUserState('isUser');
    })
    .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
        changeUserState('guest');
    });
}

export const logOutFunc = (changeUserState: (state: userStateType) => void ) => {
    signOut (auth).then(() => {
        console.log('sign out successed');
        console.log(auth);
        changeUserState('guest')
    }).catch((error) => {
        changeUserState('isUser');
        console.log(error.message)
        alert(error.message)
    });
}

export const googleLoginFunc = () => {
    signInWithRedirect(auth, googleProvider)
};

export const githubLoginFunc = () => {
    signInWithRedirect(auth, githubProvider)
};

export const VarifiedNotifySendEmail = () => {
    if(auth.currentUser) {
        sendEmailVerification(auth.currentUser)
        .then(() => {
            console.log('Email verification sent!')
        });
    }
}

export const PassChangeSendEmail = (email: string, changeUserState: (state: userStateType) => void) => {
    sendPasswordResetEmail(auth, email)
    .then(() => {
        alert(`
        パスワード変更用のEメールを送りました。
        迷惑メールに送られているかもしれません。ご確認お願いします。
        We Sent a Email. Please Change your Passeword from It !
        It may be in Scam mail Box.
        `)
        changeUserState('isUser');
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
        console.log(errorCode)
        changeUserState('isUser');
    });
}

export const GuestPassChangeSendEmail = (email: string, changeUserState: (state: userStateType) => void ) => {

    sendPasswordResetEmail(auth, email)
    .then(() => {
        alert(`
        パスワード変更用のEメールを送りました。
        迷惑メールに送られているかもしれません。ご確認お願いします。
        We Sent a Email. Please Change your Passeword from It !
        It may be in Scam mail Box.
        `)
        changeUserState('guest');
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
        console.log(errorCode)
        changeUserState('guest');
        // ..
    });
}