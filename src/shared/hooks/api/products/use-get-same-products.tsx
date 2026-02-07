import { Product } from "../../../types"
import { UseFetch } from "../generic"


interface UseGetSameProductsReturn {
    products: Product[] | undefined
    isLoad: boolean
    error: string | null
    update: () => void
}

export function UseGetSameProducts(id: number): UseGetSameProductsReturn {
    const [getProducts, {data: products, isLoad, error}] = UseFetch<Product[]>(`products?sameAs=${id}&page=0&perPage=4`, [])
    return {products, isLoad, error, update: getProducts}
}