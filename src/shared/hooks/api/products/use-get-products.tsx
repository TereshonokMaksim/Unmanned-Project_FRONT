import { Product } from "../../../types"
import { UseFetch } from "../genericGetHook"
import { UseGetProductsGeneral } from "./product-types"


export function UseGetProducts(page?: number, perPage?: number, categoryId?: number): UseGetProductsGeneral{
    if (!perPage) perPage = 20
    if (!page)    page = 0
    let link = `products?page=${page}&perPage=${perPage}`
    if (categoryId || categoryId === 0){
        link += `&productCategory=${categoryId}`
    }
    const [getProducts, {data: products, isLoad, error}] = UseFetch<Product[]>(link, [])
    return { products, isLoad, error, update: getProducts }
}