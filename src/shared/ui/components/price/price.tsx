import styles from "./price.module.css"
import { PriceProps } from "./price.types"


export function Price(props: PriceProps){
    const {className, price, discount, ...attributes} = props
    return (
        <p className = {`${styles.priceBlockGeneric} ${className}`}>
            {discount == 0 ?
                <span className = {styles.priceGeneric}>{price} $</span> :
            <p className = {styles.priceCombination}>
                <span className = {styles.oldPriceOverline}>{price} $</span>
                <span className = {styles.newPrice}>{price - discount} $</span>
            </p>}
        </p>
    )
}