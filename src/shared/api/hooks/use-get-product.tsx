import { useState, useEffect } from "react"
import { ProductFull } from "../../types"
import { API_URL } from "../api-url"

interface UseGetProductReturn {
    product: ProductFull | null | undefined
    isLoad: boolean
    error: string | null
}

export function UseGetProduct(id: number): UseGetProductReturn {
    const [product, setProduct] = useState<ProductFull | null>()
    const [isLoad, setIsLoad] = useState<boolean>(true)
    const [error, setError] = useState<string| null>(null)

    useEffect(() => {
        async function getProduct(){
            try {
                setIsLoad(true)
                const link = `${API_URL}/products/${id}`
                const response = await fetch(link, {method: "GET"})
                const product = await response.json()
                setProduct(product)
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
    return {product, isLoad, error}
}