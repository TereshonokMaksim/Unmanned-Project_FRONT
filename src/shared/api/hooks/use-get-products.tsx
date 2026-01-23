import { useState, useEffect } from "react"
import { Product } from "../../types"
import { API_URL } from "../api-url"

interface UseGetProductsGeneral {
    products: Product[]
    isLoad: boolean,
    error: string | null
}

export function UseGetSpecialProducts(newProducts: boolean, popularProducts: boolean): UseGetProductsGeneral{
    const [products, setNewProducts] = useState<Product[]>([])
    const [isLoad, setIsLoad] = useState<boolean>(true)
    const [error, setError] = useState<string| null>(null)

    useEffect(() => {
        async function getProduct(){
            try {
                setIsLoad(true)
                let link = `${API_URL}/products/suggestions`
                if (popularProducts){
                    link += `?popular=true&page=0&perPage=4`
                }
                else if (newProducts){
                    link += "?new=true&page=0&perPage=3"
                }
                const response = await fetch(link, {method: "GET"})
                const Nproducts = await response.json()
                setNewProducts(Nproducts)
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