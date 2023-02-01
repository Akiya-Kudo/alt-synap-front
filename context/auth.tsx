import { getRedirectResult, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../utils/firebase/init";

import { User, UserStateType } from "../types/user";
import { useUserInfoQuery } from "../utils/hooks/useQuery";
import { useUserRegister } from "../utils/hooks/useMutation";


// type UserStateStringType = 'isUser' | 'guest' | 'loading'; 
type UserStateStringType = string; 
type UserInfoType = User | null;

export const AuthContext = createContext({} as {userState : UserStateStringType});
export const setAuthContext = createContext({} as {setUserState : React.Dispatch<React.SetStateAction<UserStateType>>});
export const UserInfoContext = createContext({} as {userInfo : UserInfoType});
export const setUserInfoContext = createContext({} as {setUserInfo : React.Dispatch<React.SetStateAction<any>>});


export const AuthProvider = (props: any) => {
    const { children } = props;

    const { userRegister } = useUserRegister();

    const [userState, setUserState] = useState<UserStateType>('guest');
    const [userInfo, setUserInfo] = useState< User | null >(null);

    const {getUserInfo,loading, error, data} = useUserInfoQuery();

    useEffect(() => {
        // console.log('authのuseEffectが呼び出されました');
        
        //ソーシャルログインのログインのリダイレクトの結果を取得し、していた場合そのユーザ情報がDB内に存在するか判別し、ない場合登録する処理を行う
        getRedirectResult(auth)
        .then((result) => {
            // console.log("authのリダイレクトの結果取得の関数が起動しています")
            // console.log(result);

            //firebaseリダイレクトが行われていた場合、ユーザ情報を取得する関数を呼び出す
            if(result != null) {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                const user = result.user;
                const userName = user.displayName ? user.displayName : 'Guest';

                getUserInfo()
                .then(({data}) => {
                    console.log("authのユーザ情報をDBから取得する関数が起動しています")
                    console.log(userInfo);

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
                            console.log('insert cleared')
                            // console.log("authのユーザ情報をDBに登録する関数が起動しています")
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

        onAuthStateChanged(auth, (user) => {
            setUserState('loading');
            if (user) {
                console.log('logging in');
                setUserState('isUser');
                
                getUserInfo()
                .then(({data}) => {
                    setUserInfo(data.user);
                    console.log(data.user);
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
                        {children}
                    </setUserInfoContext.Provider>    
                </UserInfoContext.Provider>
            </setAuthContext.Provider>
        </AuthContext.Provider>
    )
}