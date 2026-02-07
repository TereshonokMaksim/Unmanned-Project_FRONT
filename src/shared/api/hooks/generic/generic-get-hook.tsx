import { useEffect, useState } from "react";
import { API_URL } from "../../api-url";
import { GenericHookOutput } from "./generic-get-hook.types";


export function UseFetch<dataType>(linkEnding: string, defaultValue?: dataType): GenericHookOutput<dataType> {
    const [data, setData] = useState<dataType | undefined>(defaultValue)
    const [isLoad, setLoad] = useState<boolean>(true)
    const [error, setError] = useState<string| null>(null)
    async function getData(){
        try {
            setLoad(true)
            const link = `${API_URL}/${linkEnding}`
            const response = await fetch(link, {method: "GET"})
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
    useEffect(() => {
        getData()
    }, [])
    return [getData, {data, isLoad, error}]
}