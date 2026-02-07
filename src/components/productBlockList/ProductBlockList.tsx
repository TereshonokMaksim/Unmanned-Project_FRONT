import { ProductFull } from "../../shared/types"
import { ProductMainInfoBlock } from "./productMainInfoBlock"
import styles from "./product-block-list.module.css"


interface ProductBlockListProps {
    product: ProductFull
}

export function ProductBlockList(props: ProductBlockListProps){
    const {product} = props
    const blocks = product.productMainBlocks
    blocks.sort((elA, elB) => {return elA.orderNum - elB.orderNum})
    return (
        <div className={styles.productBlockList}>
            {blocks.map(el => 
                <ProductMainInfoBlock block = {el} key = {el.id}/>
            )}
        </div>
    )
}