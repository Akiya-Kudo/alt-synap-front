import { getRedirectResult, GoogleAuthProvider, onAuthStateChanged, updateProfile } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/init";

import { Box, Toast, useToast } from "@chakra-ui/react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { USER_QUERY } from "../graphql/queries/users.query.schema";
import { USER_MUTATION } from "../graphql/mutation/users.mutation.scheme";
import {v4 as uuid_v4} from 'uuid'

// require('dotenv').config({ path: '.env.development' });

type UserStateStringType = 'isUser' | 'guest' | 'loading'; 

export const AuthContext = createContext({} as {userState : UserStateStringType});
export const setAuthContext = createContext({} as {setUserState : React.Dispatch<React.SetStateAction<UserStateStringType>>});


export const AuthProvider = (props: any) => {
    // console.log("auth Contextが呼び出されました")
    // console.log(auth);
    
    const [userState, setUserState] = useState<UserStateStringType>("guest")
    const [getLoginUserInfo] = useLazyQuery(USER_QUERY);
    const [userRegister] = useMutation(USER_MUTATION);
    
    useEffect(()=>{
        console.log("context useEffect発火")
        onAuthStateChanged(auth, async (user)=>{
            console.log("onAuthStateChanged実行");
            try {
                if (user) {
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
                        console.log("onstatechange server data store done");
                        console.log(result_m);
                    }
                    setUserState("isUser")
                }
            } catch (error) {
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
        !isOnline && toast({
            position: "bottom-left",
            duration:null,
            render: () => (
                <Box fontSize={"0.8rem"}>
                    <Toast title="ネットワークが接続されていません" status='error' variant={"subtle"} />
                </Box>
            ),
        })
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