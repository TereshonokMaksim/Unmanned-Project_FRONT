import { ProductMainBlockInter } from "../../shared/types"
import { CharacteristicBlock } from "./characteristicBlock"
import styles from "./product-main-info-block.module.css"


interface ProductMainBlockProps{
    block: ProductMainBlockInter
}

export function ProductMainInfoBlock(props: ProductMainBlockProps){
    const {block} = props
    const directionClassName = `productAligning${block.align}`
    return (
        <div className = {`${styles.productMainBlock} ${styles[directionClassName]}`}>
            <div className = {styles.auxiliaryMainBlockContent}>
                <div className = {styles.productBlockTextInfo}>
                    <h2 className = {styles.productBlockTitle}>{block.title}</h2>
                    <p className = {styles.productBlockDescription}>{block.description}</p>
                </div>
                {block.productDetailDatas.length > 0 && (
                    <div className = {styles.productDetailDataList}>
                        {block.productDetailDatas.map(el => {
                            return <CharacteristicBlock key = {el.id} detailDataBlock = {el}/>
                        })}
                    </div>
                )}
            </div>
            <img src = {block.media} alt = "Your advertisement can be here" className = {styles.productMainMedia}/>
        </div>
    )
}