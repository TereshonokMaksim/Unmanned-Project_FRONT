import { useNavigate } from "react-router-dom"
import styles from "./catalog-product-card.module.css"
import { CatalogButton, Price } from "../../../shared/ui"

interface CatalogueProductCardProps {
    image: string,
    title: string,
    price: number,
    discount: number,
    id: number
}

export function CatalogueProductCard(props: CatalogueProductCardProps){
    const {image, title, price, discount, id} = props
    const navigate = useNavigate()

    return (
        <div className = {styles.catalogItem} onClick = {() => {navigate(`/product/${id}`)}}>
            <img src={image} alt="drone" className={styles.catalogItem}/>
            <div className = {styles.catalogItemBottom}>
                <div className = {styles.catalogItemDesc}>
                    <h6 className = {styles.catalogItemTitle}>{title}</h6>
                    <Price discount = {discount} price = {price}/>
                </div>
                <CatalogButton className={styles.catalogItemCatalog}/>
            </div>
        </div>
    )
}