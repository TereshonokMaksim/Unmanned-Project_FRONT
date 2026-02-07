interface ProductDetail {
    id: number
    text: string
    orderNum: string
    detailData: number
}

export interface ProductDetailData {
    id: number
    name: string
    orderNum: number
    productMainBlockId: number
    productDetailBasics: ProductDetail[] 
    productDetailBolds: ProductDetail[]
}

export interface ProductMainBlockInter{
    id: number
    productId: number
    title: string
    description: string
    media: string
    align: "column" | "row" | "rowReversed"
    orderNum: number
    productDetailDatas: ProductDetailData[]
}

export interface ProductFull {
    id: number
    name: string
    description: string
    price: number
    categoryId?: number
    discount: number
    media: string
    count: number
    productMainBlocks: ProductMainBlockInter[]
}