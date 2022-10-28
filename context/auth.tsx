import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../utils/firebase/init";

import { useQuery } from '@apollo/client';
import { USER_QUERY, UserData } from '../utils/graphql/queries/users.query';

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

    // let uid: null | string = null
    // const user = auth.currentUser;
    // if (user !== null) {
    //     uid = user.uid;
    // }
    // // apollo client query 処理
    // const { loading, error, data } = useQuery<UserData>(USER_QUERY, {
    //     variables: {
    //         "userId" : uid,
    //     }
    // });

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