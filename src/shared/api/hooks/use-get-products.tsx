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
        console.log("asd")
        async function getProduct(){
            console.log("WHAT IS THAT")
            try {
                setIsLoad(true)
                let link = `${API_URL}/products`
                if (popularProducts){
                    link += `?popular=true`
                }
                else if (newProducts){
                    link += "?new=true"
                }
                const response = await fetch(link+"&take=4", {method: "GET"})
                const Nproducts = await response.json()
                console.log(Nproducts   )
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