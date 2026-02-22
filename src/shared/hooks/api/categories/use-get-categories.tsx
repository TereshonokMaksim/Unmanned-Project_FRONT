import { Category } from "../../../types"
import { UseFetch } from "../genericGetHook"


interface UseGetCategoriesReturn {
    categories: Category[] | undefined
    isLoad: boolean
    error: string | null
    update: () => void
}

export function UseGetCategories(): UseGetCategoriesReturn {
    const [getCategories, {data: categories, isLoad, error}] = UseFetch<Category[]>("categories")
    return { categories, isLoad, error, update: getCategories}
}