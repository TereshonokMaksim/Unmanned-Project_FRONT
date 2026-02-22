import { ErrorResponse } from "react-router-dom";
import { UseAuthFetch } from "../authenticatedGetHook";
import { UseMeOut } from "./creds-out";




export function UseMe(){
    const [getMe, {data: user, isLoad, error}] = UseAuthFetch<UseMeOut | ErrorResponse | null>(`users/me`, null)
    return {user, isLoad, error, update: getMe}
}