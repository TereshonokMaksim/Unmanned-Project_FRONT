import { useState, useEffect } from "react"
import { Product } from "../../types"
import { API_URL } from "../api-url"

interface UseGetSameProductsReturn {
    products: Product[]
    isLoad: boolean
    error: string | null
}

export function UseGetSameProducts(id: number): UseGetSameProductsReturn {
    const [products, setProducts] = useState<Product[]>([])
    const [isLoad, setIsLoad] = useState<boolean>(true)
    const [error, setError] = useState<string| null>(null)

    useEffect(() => {
        async function getProducts(){
            try {
                setIsLoad(true)
                const link = `${API_URL}/products?sameAs=${id}&page=0&perPage=4`
                const response = await fetch(link, {method: "GET"})
                const products = await response.json()
                setProducts(products)
            } catch (error) {
               console.error(error)
                if (error instanceof Error) {
                    setError(error.message)
                } 
            } finally{
                setIsLoad(false)
            }
        }
        getProducts()
    }, [])
    return {products, isLoad, error}
}