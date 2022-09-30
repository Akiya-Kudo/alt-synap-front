import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithRedirect, signOut } from "firebase/auth";
import { userStateType } from "../types/user";
import { auth, githubProvider, googleProvider } from '../utils/firebase/init';

export const signUpFunc = ( email: string, password: string, changeUserState: (state: userStateType) => void ) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
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
        // ...
        console.log("user logged in");
        changeUserState('isUser');
    })
    .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
        changeUserState('guest');
        console.log(error);
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
    });
}

export const googleLoginFunc = () => {
    signInWithRedirect(auth, googleProvider)
};

export const githubLoginFunc = () => {
    signInWithRedirect(auth, githubProvider)
};