import { useEffect } from "react"


export function UseLoadPage(): () => void {
    function goBack(){
        window.scrollTo(0, 0)
    }
    useEffect(() => {
        goBack()
    }, [])
    return goBack
}