import { Product } from "../../types"


export interface UseGetProductsGeneral {
    products: Product[]
    isLoad: boolean
    error: string | null
    update: () => void
}