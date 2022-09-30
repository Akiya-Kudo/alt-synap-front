import { onAuthStateChanged } from "firebase/auth";
import { createContext, useLayoutEffect, useState } from "react";
import { auth } from "../utils/firebase/init";

// コンテクストを作成
// コンテクストを作成
// type UserStateStringType = 'isUser' | 'guest' | 'loading'; 
type UserStateStringType = string; 

export const AuthContext = createContext({} as {
    userState : UserStateStringType; 
    setUserState: React.Dispatch<React.SetStateAction<string>>
});

export const AuthProvider = (props: any) => {

    const { children } = props;

    const [userState, setUserState] = useState('loading');

    useLayoutEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
        const uid = user.uid;
        setUserState('isUser');
        console.log('hello')
        console.log(userState)
        } else {
        setUserState('guest');
        }
    });
},[])

    return <AuthContext.Provider value={{userState, setUserState}}>{children}</AuthContext.Provider>;
}