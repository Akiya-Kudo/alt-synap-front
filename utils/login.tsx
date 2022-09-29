import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../context/auth";
import { auth } from '../utils/firebase/init';

export const signUpFunc = ( email: string, password: string, changeUserState: any ) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        changeUserState()
        console.log(user)
    })
    .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
        console.log(error);
    });
}

export const logInFunc = ( email: string, password: string, changeUserState: any ) => {


    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log("user logged in");
        changeUserState();
    })
    .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
        console.log(error);
    });
}

export const logOutFunc = (changeUserState: any ) => {
    signOut (auth).then(() => {
        console.log('sign out successed');
        console.log(auth);
        changeUserState()
    }).catch((error) => {
        console.log(error.message)
    });
}