import { createContext, useState } from "react";

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

    return <AuthContext.Provider value={{userState, setUserState}}>{children}</AuthContext.Provider>;
}