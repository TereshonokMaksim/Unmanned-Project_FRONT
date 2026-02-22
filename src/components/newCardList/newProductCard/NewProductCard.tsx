import { useNavigate } from "react-router-dom"
import { VECTORS } from "../../../shared/ui"
import styles from "./new-product-card.module.css"

export interface NewProductProps {
    bgImage: string,
    gcolor: string, 
    productImage: string,
    productTitle: string,
    productDescription: string,
    productPrice: string | number,
    id: number
}

export function NewProductCard(props: NewProductProps){
    const navigate = useNavigate()
    const {bgImage, gcolor, productDescription, productImage, productTitle, productPrice, id} = props
    return (
        <div className={styles.card} style = {{"--gcolor": gcolor} as React.CSSProperties}>
            <img src={productImage} alt="Drone" className = {styles.cardDroneImg} />
            <div className = {styles.cardBGLimiter}>
                <img className = {styles.cardBGimg} src = {bgImage} alt="BG" />    
            </div>
            <div className = {styles.titleCard}>
                <h3>{productTitle}</h3>
                <p>{productDescription}</p>
            </div>
            <div className = {styles.dataCard}>
                <span>from to {productPrice}$</span>
                <button onClick = {() => {navigate(`product/${id}`)}}>
                    <p>КУПИТИ</p>
                    <VECTORS.ButtonArrowVector/>
                </button>
            </div>
        </div>
    )
}