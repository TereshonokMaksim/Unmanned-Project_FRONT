import { IMAGES, Product } from "../../shared";
import { CatalogueProductCard } from "../catalogProductCard";
import styles from "./catalogue-card-list.module.css"


interface CatalogueCardListProps {
    load: boolean,
    error: string | null,
    products: Product[]
}

export function CatalogueCardList(props: CatalogueCardListProps){
    const {load, error, products} = props
    return (
        <div className = {styles.catalogueList}>
            {
            load ? 
                <div><i>Завантаження...</i></div> :
            error ?
                <div style={{color: "red"}}>Не вдалося завантажити товари</div> 
            :
            products.map((el) => {
                return <CatalogueProductCard 
                        image = {el.media} 
                        title = {el.name}
                        price = {el.price}
                        priceWithDiscount = {el.price - el.discount}
                        id = {el.id}
                        key = {el.id}/>
            })}
        </div>
    )
}