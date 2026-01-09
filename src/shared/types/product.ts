// Пример файла в типах


export interface Product {
    name: string
    id: number
    description: string
    price: number
    categoryId: number | null
    discount: number
    media: string
    count: number
}