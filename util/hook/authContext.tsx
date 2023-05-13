import { getRedirectResult, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/init";

import { User, UserStateType } from "../../type/user";
import { useUserInfoQuery } from "./useQuery";
import { useUserRegister } from "./useMutation";
import { FaCommentDollar } from "react-icons/fa";
import { Box, Toast, useToast } from "@chakra-ui/react";

// require('dotenv').config({ path: '.env.development' });

// type UserStateStringType = 'isUser' | 'guest' | 'loading'; 
type UserStateStringType = string ; 
type UserInfoType = User | null;

export const AuthContext = createContext({} as {userState : UserStateStringType});
export const setAuthContext = createContext({} as {setUserState : React.Dispatch<React.SetStateAction<UserStateType>>});
export const UserInfoContext = createContext({} as {userInfo : UserInfoType});
export const setUserInfoContext = createContext({} as {setUserInfo : React.Dispatch<React.SetStateAction<any>>});


export const AuthProvider = (props: any) => {
    console.log("auth Contextが呼び出されました")

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



    const { userRegister } = useUserRegister();

    const [userState, setUserState] = useState<UserStateType>("pendding");
    const [userInfo, setUserInfo] = useState< User | null >(null);

    const {getLoginUserInfo,loading, error, data} = useUserInfoQuery();

    useEffect(() => {
        //firebase auth　snsログイン リダイレクト判定
        getRedirectResult(auth)
        .then((result) => {
            if(result != null) {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                const user = result.user;
                const userName = user.displayName ? user.displayName : 'Guest';

                //サーバからログインユーザの情報を取得
                getLoginUserInfo()
                .then(({data}) => {
                    // console.log("authのユーザ情報をDBから取得する関数が起動しています")
                    // console.log(userInfo);

                    // データベース内にユーザ情報がなかった場合、新しくユーザーを登録する
                    if (!data.user) {
                        userRegister({ 
                            variables: {
                                createUserInfoData: {
                                    firebase_id: user.uid,
                                    user_name: user.displayName,
                                }
                            }
                        })
                        .then(() => {
                            // console.log("authのユーザ情報をDBに登録する関数が起動しています")
                            
                            console.log('insert cleared')
                            setUserInfo({
                                firebase_id: user.uid,
                                user_name: userName,
                                followee_num: 0,
                                follower_num: 0
                            })
                        }).catch((error: { message: any; }) => {
                            console.log(error.message)
                        })
                    }
                })
                .catch(({error}) => {
                    alert("query error happend check the console");
                    console.log(error)
                })
            }
        })   
        .catch((error) => {
            alert("ソーシャルログインに失敗しました。| social login failed")
            const {errorCode, errorMessage, email }  = error;
            //const credential = GoogleAuthProvider.credentialFromError(error);
        })

        ///リロード時firebase auth　ログイン判定
        onAuthStateChanged(auth, (user) => {
            setUserState('pendding');
            if (user) {
                console.log(auth)
                console.log('logging in');
                setUserState('isUser');
                
                getLoginUserInfo()
                .then(({data}) => {
                    setUserInfo(data.user);
                }).catch(({error}) => {
                    alert("query error happend check the console ");
                    console.log(error)
                })

            } else {
                console.log('not logged in')
                setUserState('guest')
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return(
        <AuthContext.Provider value={{userState}}>
            <setAuthContext.Provider value={{setUserState}}>
                <UserInfoContext.Provider value={{userInfo}}>
                    <setUserInfoContext.Provider value={{setUserInfo}}>
                        {props.children}
                    </setUserInfoContext.Provider>    
                </UserInfoContext.Provider>
            </setAuthContext.Provider>
        </AuthContext.Provider>
    )
}