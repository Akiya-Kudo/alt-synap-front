import { createContext, ReactNode, useEffect, useState } from "react";

// コンテクストを作成
export const AuthContext = createContext({} as {
    userState : boolean 
    setUserState: React.Dispatch<React.SetStateAction<boolean>>
});

export const AuthProvider = (props: any) => {

    const { children } = props;

    const [userState, setUserState] = useState(false);

    return <AuthContext.Provider value={{userState, setUserState}}>{children}</AuthContext.Provider>;
}