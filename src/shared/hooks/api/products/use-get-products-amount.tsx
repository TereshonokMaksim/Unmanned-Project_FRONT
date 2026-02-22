import { UseFetch } from "../genericGetHook"


export interface UseGetProductsAmountReturn {
    amount: number | undefined
    isLoad: boolean
    error: string | null
    update: () => void
}

export function UseGetProductsAmount(categoryId?: number): UseGetProductsAmountReturn{
    let link = "products/total_amount"
    if (categoryId) {
        link += `?productCategory=${categoryId}`
    }
    const [getAmount, {data: amount, isLoad, error}] = UseFetch<number>(link, 0)
    return { amount, isLoad, error, update: getAmount }
}