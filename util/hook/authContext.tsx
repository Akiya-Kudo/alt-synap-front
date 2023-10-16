import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/init";
import { Box, useDisclosure, useToast } from "@chakra-ui/react";
import { makeVar, useLazyQuery, useMutation } from "@apollo/client";
import { USER_QUERY } from "../graphql/queries/users.query.schema";
import { USER_MUTATION } from "../graphql/mutation/users.mutation.scheme";
import {v4 as uuid_v4} from 'uuid'
import { useCustomToast } from "./useCustomToast";
import { User, UserStateStringType } from "../../type/global";
import { useRouter } from "next/router";
import { LoginModal } from "../../component/standalone/LoginModal";

// for the search page proccessing
// to prevent refetching of useEffect(of IsUser in search page) : refetch of useQuery will difinitly fetch from server, so the cached data(search query's merged posts array will deleted)
export const IsAlreadyFirstFetchedAsIsUserVar = makeVar(false as boolean)
export const loginUserInfoVar = makeVar(null as User | null);

export const AuthContext = createContext({} as {userState : UserStateStringType});
export const setAuthContext = createContext({} as {setUserState : React.Dispatch<React.SetStateAction<UserStateStringType>>});
export const LoginToggleContext = createContext({} as { onOpen_login : () => void });

export const AuthProvider = (props: any) => {
    const router = useRouter()
    const [userState, setUserState] = useState<UserStateStringType>("loading") // if there is any discomfort, change def to undefined
    const [getLoginUserInfo] = useLazyQuery(USER_QUERY);
    const [userRegister] = useMutation(USER_MUTATION);
    const {toastNetDisconnectedError} = useCustomToast()
    const { onOpen: onOpen_login, onClose: onClose_login, isOpen: isOpen_login } = useDisclosure()
    
    useEffect(()=>{
        // for load time auth check ( this func will called all the time when auth state is changed regurdless useEffect isn't called)
        onAuthStateChanged(auth, async (user)=>{
            try {
                if (user) {
                    console.log("is user in firebase");
                    console.log(user);
                    const result = await getLoginUserInfo()
                    if (result?.data?.user) {
                        loginUserInfoVar(result.data.user)
                    }

                    if(result.data==undefined){
                        console.log("未設定のユーザ情報をサーバーに保存します。");
                        const result_m = await userRegister({
                            variables: {
                                "userData": {
                                    "uid": user.uid,
                                    "uuid_uid": uuid_v4(),
                                    "user_name": user.displayName,
                                    "user_image": user.photoURL,
                                }
                            }
                        })
                        console.log(result_m);
                        if (result_m?.data?.create_user) {
                            loginUserInfoVar(result_m.data.create_user)
                        }
                    }
                    setUserState("isUser")
                    console.log("is user in Apollo");



                    // the case under path page is rendering, the reactive value will changed in the PostsBoard's useEffect
                    const isPostsFetchPage = 
                        router.pathname=='/search' 
                        || router.pathname=='/users/[uuid_uid]' 
                        || router.pathname=='/posts/[uuid_pid]' 
                        || router.pathname=='/topics/[tid]' 
                        || router.pathname=='/'
                    if (!isPostsFetchPage) IsAlreadyFirstFetchedAsIsUserVar(true)
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
                <LoginToggleContext.Provider value={{onOpen_login}}>
                    { userState=='guest' && <LoginModal onClose={onClose_login} isOpen={isOpen_login}/> }
                    {props.children}
                </LoginToggleContext.Provider>
            </setAuthContext.Provider>
        </AuthContext.Provider>
    )
}