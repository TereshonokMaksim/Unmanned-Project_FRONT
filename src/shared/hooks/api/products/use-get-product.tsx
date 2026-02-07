import { ProductFull } from "../../../types"
import { UseFetch } from "../generic"


interface UseGetProductReturn {
    product: ProductFull | null | undefined
    isLoad: boolean
    error: string | null
    update: () => void
}

export function UseGetProduct(id: number): UseGetProductReturn {
    const [getProduct, {data: product, isLoad, error}] = UseFetch<ProductFull>(`products/${id}`)
    return {product, isLoad, error, update: getProduct}
}