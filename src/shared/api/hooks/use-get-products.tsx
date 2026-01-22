import { useState, useEffect } from "react"
import { Product } from "../../types"
import { API_URL } from "../api-url"

interface UseGetProducts {
    products: Product[]
    isLoad: boolean,
    error: string | null
}

export function UseGetProducts(): UseGetProducts{
    const [products, setProducts] = useState<Product[]>([])
    const [isLoad, setIsLoad] = useState<boolean>(false)
    const [error, setError] = useState<string| null>(null)

    useEffect(() => {
        async function getProduct(){
            try {
                setIsLoad(true)
                const respose = await fetch(`${API_URL}/products`, {method: "GET",})
                setProducts()
            } catch (error) {
               console.error(error)
                if (error instanceof Error) {
                    setError(error.message)
                } 
            } finally{
                setIsLoad(false)
            }
        }
        getProduct()
    }, [])
    return { products, isLoad, error}
}