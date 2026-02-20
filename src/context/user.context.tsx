import { Context, createContext, PropsWithChildren, ReactComponentElement, useContext, useEffect, useState } from "react";
import { SafeUser } from "../shared/types/user";
import { UseMe } from "../shared/hooks/api";


interface UserContextContract {
    user: SafeUser | null;
    setUser: (newUser: SafeUser) => void;
    token: string | null;
    setToken: (token: string | null) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextContract | null>(null)

export function UserContextProvider({children}: PropsWithChildren){
    const [user, setUser] = useState<SafeUser | null>(null)
    const [token, setToken1] = useState<string | null>(null)
    const {update: getMe, user: userData} = UseMe()
    function setToken (token: string | null){
        if (!token) return
        console.log("I HAVE SETTED THE TOKEN", token)
        setToken1(token)
        localStorage.setItem("token", token)
        getMe(token)
        setUser(user)
    }
    async function setUserFromServer() {
        if( !token) return;
        await getMe(token);
        if (!userData) return;
        if ("message" in userData) return;
        if ("id" in userData) setUser(userData)
    }
    function logout(){
        setUser(null);
        localStorage.removeItem('token');
        setToken(null)
    }
    useEffect( () => {
        const token = localStorage.getItem('token');
        console.log("I GOT THE TOKEN", token)
        if (!token) return;
        setToken(token)
    },[])

    useEffect( () => {
        if (!token) return
        setUserFromServer()
    }, [token])
    return <UserContext value = {{user, setUser, token, setToken, logout}}>
            {children}
        </UserContext>
}

export function useUserContext(): UserContextContract {
    const newContext = useContext(UserContext)
    if (!newContext) throw new Error("NO")
    return newContext
}