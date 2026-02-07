import { ProductDetailData } from "../../../shared/types"
import styles from "./characteristic-block.module.css"


interface CharacteristicBlockProps{
    detailDataBlock: ProductDetailData
}


export function CharacteristicBlock(props: CharacteristicBlockProps){
    const {detailDataBlock} = props
    const blocks = []
    for (let rBlock of detailDataBlock.productDetailBasics){
        blocks.push({...rBlock, type: "Regular"})
    }
    for (let bBlock of detailDataBlock.productDetailBolds){
        blocks.push({...bBlock, type: "Bold"})
    }
    blocks.sort((aEl, bEl) => +aEl.orderNum - +bEl.orderNum)
    return (
        <div className={styles.productCharBlock}>
            <div className = {styles.productCharTop}>
                {blocks.map(el => {
                    return <p className = {styles[`productCharText${el.type}`]} key = {`${el.id}-${el.type}`}>{el.text}</p>
                })}
            </div>
            <p className = {styles.productCharName}>{detailDataBlock.name}</p>
        </div>
    )
}