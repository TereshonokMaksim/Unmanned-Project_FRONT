import styles from "./catalogue-product-card.module.css"

interface CatalogueProductCardProps {
    image: string,
    title: string,
    price: number,
    priceWithDiscount: number
}

export function CatalogueProductCard(props: CatalogueProductCardProps){
    const {image, title, price, priceWithDiscount} = props

    return (
        <div className = {styles.catalogItem}>
            <img src={image} alt="drone" className={styles.catalogItem}/>
            <h6 className = {styles.catalogItemTitle}>{title}</h6>
            {priceWithDiscount < price ?
            <span className = {styles.catalogItemPrice}>
                <span className = {styles.oldPrice}>{price} $</span>
                <span className = {styles.newPrice}>{priceWithDiscount} $</span>
            </span>
            :
            <span className = {styles.catalogItemPrice}>{price} $</span>}
        </div>
    )
}