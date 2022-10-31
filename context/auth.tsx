import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../utils/firebase/init";

import { useLazyQuery } from '@apollo/client';
import { User } from "../types/user";
import { USER_QUERY } from '../utils/graphql/queries/users.query';


// type UserStateStringType = 'isUser' | 'guest' | 'loading'; 
type UserStateStringType = string; 
type UserInfoType = User | null;

export const AuthContext = createContext({} as {userState : UserStateStringType});
export const setAuthContext = createContext({} as {setUserState : React.Dispatch<React.SetStateAction<string>>});
export const UserInfoContext = createContext({} as {userInfo : UserInfoType});
export const setUserInfoContext = createContext({} as {setUserInfo : React.Dispatch<React.SetStateAction<any>>});


export const AuthProvider = (props: any) => {
    const { children } = props;

    const [userState, setUserState] = useState<string>('guest');
    const [userId, setUserId] = useState<string | null>(null);
    const [userInfo, setUserInfo] = useState<any>(null);

    useEffect(() => {
        setUserState('loading')
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('logging in')
                console.log(user)
                setUserState('isUser')
                setUserId(user.uid)
            } else {
                console.log('not logged in')
                setUserState('guest')
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    // apollo client query 処理    
    const [getUserInfo, { loading, error, data }] = useLazyQuery(USER_QUERY, {
        variables: {
            "userId" : userId,
        }
    });
    
    useEffect(() => {
        getUserInfo()
        .then(({data}) => {
            setUserInfo(data?.user[0])
        }).catch(({error}) => {
            alert("query error happend check the console ");
            console.log(error)
        }).finally(() => {
            // console.log(userInfo)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId])


    return(
        <AuthContext.Provider value={{userState}}>
            <setAuthContext.Provider value={{setUserState}}>
                <UserInfoContext.Provider value={{userInfo}}>
                    <setUserInfoContext.Provider value={{setUserInfo}}>
                        {children}
                    </setUserInfoContext.Provider>    
                </UserInfoContext.Provider>
            </setAuthContext.Provider>
        </AuthContext.Provider>
    )
}