import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
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

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
            const uid = user.uid;
            setUserState('isUser');
            console.log('logging in')
            console.log(user);
            
            } else {
            setUserState('guest');
            console.log('not logged in')
            }
        });
    },[])

    return <AuthContext.Provider value={{userState, setUserState}}>{children}</AuthContext.Provider>;
}