import { Product } from "../../../types"


export interface UseGetProductsGeneral {
    products: Product[] | undefined
    isLoad: boolean
    error: string | null
    update: () => void
}