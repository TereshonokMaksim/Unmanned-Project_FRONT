import { useState, useEffect } from "react"
import { API_URL } from "../api-url"


export interface UseGetProductsAmountReturn {
    amount: number
    isLoad: boolean
    error: string | null
    update: () => void
}

export function UseGetProductsAmount(categoryId?: number): UseGetProductsAmountReturn{
    const [amount, setAmount] = useState(0)
    const [isLoad, setIsLoad] = useState<boolean>(true)
    const [error, setError] = useState<string| null>(null)
    async function getAmount(){
        try {
            setIsLoad(true)
            let link = `${API_URL}/products/total_amount`
            if (categoryId){
                link += `?productCategory=${categoryId}`
            }
            const response = await fetch(link, {method: "GET"})
            const allProducts = await response.json()
            console.log(allProducts)
            setAmount(allProducts)
        } catch (error) {
        console.error(error)
            if (error instanceof Error) {
                setError(error.message)
            } 
        } finally{
            setIsLoad(false)
        }
    }
    useEffect(() => {
        getAmount()
        }, [])
    return { amount, isLoad, error, update: getAmount }
}