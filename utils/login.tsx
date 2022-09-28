import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase/init';

export const signIn = ( email: string, password: string ) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
    })
    .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
        console.log(error);
    });
}

export const logIn = () => {
    
}