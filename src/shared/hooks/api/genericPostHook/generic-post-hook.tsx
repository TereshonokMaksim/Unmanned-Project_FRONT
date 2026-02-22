import { useEffect, useState } from "react";
import { API_URL } from "../api-url";
import { GenericPostHookOutput, ErrorResponse } from "./generic-post-hook.types";


export function UsePost<dataType>(linkEnding: string, defaultValue?: dataType): GenericPostHookOutput<dataType> {
    const [data, setData] = useState<dataType | ErrorResponse | undefined>(defaultValue)
    const [isLoad, setLoad] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    async function sendData(reqBody: object, customMethod?: string, token?: string): Promise<dataType | void> {
        try {
            setLoad(true)
            const link = `${API_URL}/${linkEnding}`
            let heads: {"Content-Type": string, "Authorization"?: string} = {"Content-Type": "application/json"}
            if (token) {heads["Authorization"] = `Bearer ${token}`}
            const response = await fetch(link, {
                method: customMethod ? customMethod : "POST", 
                body: JSON.stringify(reqBody), 
                headers: heads})
            const Ndata = await response.json()
            console.log(Ndata,"NDATA")
            if (String(response.status).slice(0, 1)!="2"){
                setData({code: response.status, message: Ndata.message})
                return
            }
            setData(Ndata)
            return Ndata
        } catch (error) {
            console.error(error)
            if (error instanceof Error) {
                setError(error.message)
            } 
        } finally{
            setLoad(false)
        }
    }
    return [sendData, {data, isLoad, error}]
}