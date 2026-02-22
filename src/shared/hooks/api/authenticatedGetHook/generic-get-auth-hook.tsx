import { useEffect, useState } from "react";
import { API_URL } from "../api-url";
import { GenericHookOutput } from "./generic-get-auth-hook.types";
import { AuthErrorResponse } from "../user/creds-out";


export function UseAuthFetch<dataType>(linkEnding: string, defaultValue?: dataType): GenericHookOutput<dataType> {
    const [data, setData] = useState<dataType | AuthErrorResponse | undefined>(defaultValue)
    const [isLoad, setLoad] = useState<boolean>(true)
    const [error, setError] = useState<string| null>(null)
    async function getData(token: string){
        try {
            setLoad(true)
            const link = `${API_URL}/${linkEnding}`
            const response = await fetch(link, {
                method: "GET", 
                headers: {
                    "Authorization": `Bearer ${token}`
                }})
            if (response.status === 401){
                const message = "Invalid Token"
                setError(message)
                setData({message})
                return {
                    message
                }
            }
            const data = await response.json()
            setData(data)
        } catch (error) {
            console.error(error)
            if (error instanceof Error) {
                setError(error.message)
            } 
        } finally{
            setLoad(false)
        }
    }
    return [getData, {data, isLoad, error}]
}