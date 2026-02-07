import { useEffect } from "react"


export function UseLoadPage(){
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
}