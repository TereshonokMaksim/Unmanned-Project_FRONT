import { useState, useEffect } from "react"
import { Category } from "../../types"
import { API_URL } from "../api-url"

interface UseGetCategoriesReturn {
    categories: Category[]
    isLoad: boolean
    error: string | null
}

export function UseGetCategories(): UseGetCategoriesReturn {
    const [categories, setCategories] = useState<Category[]>([])
    const [isLoad, setIsLoad] = useState<boolean>(true)
    const [error, setError] = useState<string| null>(null)

    useEffect(() => {
        async function getProduct(){
            try {
                setIsLoad(true)
                let link = `${API_URL}/categories`
                const response = await fetch(link, {method: "GET"})
                const allCategories = await response.json()
                setCategories(allCategories)
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
    return { categories, isLoad, error}
}