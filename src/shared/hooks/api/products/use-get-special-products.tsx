import { Product } from "../../../types"
import { UseFetch } from "../generic"
import { UseGetProductsGeneral } from "./product-types"


export function UseGetSpecialProducts(newProducts: boolean, popularProducts: boolean): UseGetProductsGeneral{
    let link = "products/suggestions"
    if (popularProducts)  link += `?popular=true&page=0&perPage=4`
    else if (newProducts) link += "?new=true&page=0&perPage=3"
    const [getProducts, {data: products, isLoad, error}] = UseFetch<Product[]>(link, [])
    return { products, isLoad, error, update: getProducts}
}
