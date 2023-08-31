import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/init";

import { Box, Toast, useToast } from "@chakra-ui/react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { USER_QUERY } from "../graphql/queries/users.query.schema";
import { USER_MUTATION } from "../graphql/mutation/users.mutation.scheme";
import {v4 as uuid_v4} from 'uuid'
import { useCustomToast } from "./useCustomToast";
import { UserStateStringType } from "../../type/global";

export const AuthContext = createContext({} as {userState : UserStateStringType});
export const setAuthContext = createContext({} as {setUserState : React.Dispatch<React.SetStateAction<UserStateStringType>>});

export const AuthProvider = (props: any) => {
    const [userState, setUserState] = useState<UserStateStringType>(undefined)
    const [getLoginUserInfo] = useLazyQuery(USER_QUERY);
    const [userRegister] = useMutation(USER_MUTATION);
    const {toastNetDisconnectedError} = useCustomToast()
    
    useEffect(()=>{
        onAuthStateChanged(auth, async (user)=>{
            try {
                if (user) {
                    console.log(user);
                    
                    const result = await getLoginUserInfo( {
                        variables: {"uid" : user.uid}
                    })
                    if(!result.data.user){
                        const result_m = await userRegister({
                            variables: {
                                "userData": {
                                    "uid": user.uid,
                                    "uuid_uid": uuid_v4(),
                                }
                            }
                        })
                        console.log("未設定のユーザ情報をサーバーに保存しました");
                        console.log(result_m);
                    }
                    setUserState("isUser")
                    console.log("is user");
                    console.log(result);
                    
                } else {
                    setUserState("guest")
                    console.log("guest");
                }
            } catch (error) {
                setUserState("guest")
                console.log("onstatechanged error");
                console.log(error);
            }
        })
    },[])



    //ネットワーク監視処理(トースト表示)
    const toast = useToast()
    const [isOnline, setIsOnline] = useState<boolean>(true)
    useEffect(() => {
        setIsOnline(navigator.onLine)
        window.addEventListener('offline', ()=>setIsOnline(false));
        window.addEventListener('online', ()=>setIsOnline(true));
        // cleanup if we unmount
        return () => {
        window.removeEventListener('offline', ()=>setIsOnline(false));
        window.removeEventListener('online', ()=>setIsOnline(true));
        }
    }, []);
    useEffect(()=>{
        !isOnline && toastNetDisconnectedError()
    isOnline && toast.closeAll()
    },[isOnline])

    return(
        <AuthContext.Provider value={{userState}}>
            <setAuthContext.Provider value={{setUserState}}>
                        {props.children}
            </setAuthContext.Provider>
        </AuthContext.Provider>
    )
}