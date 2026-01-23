import { DEBUG, IMAGES, Product } from "../../shared";
import { CatalogueProductCard } from "../catalogueProductCard";
import styles from "./catalogue-card-list.module.css"


interface CatalogueCardListProps {
    load: boolean,
    error: string | null,
    products: Product[]
}

export function CatalogueCardList(props: CatalogueCardListProps){
    const preSetPopProdData = [
        {
            "image": IMAGES.Drone_DJIMini4K,
            "index": 0
        },
        {
            "image": IMAGES.Drone_DJIMini4Pro,
            "index": 1
        },
        {
            "image": IMAGES.Drone_DJIMini4K,
            "index": 2
        },
        {
            "image": IMAGES.Drone_DJIMini4K,
            "index": 3
        },
    ]

    const {load, error, products} = props

    return (
        <div className = {styles.catalogueList}>
            {
            load ? 
                <div><i>Завантаження...</i></div> :
            error ?
                <div style={{color: "red"}}>Не вдалося завантажити товари</div> 
            :
            preSetPopProdData.map((el) => {
                const productByIndex = products[el.index]
                return <CatalogueProductCard 
                        image = {DEBUG ? el.image : productByIndex.media} 
                        title = {productByIndex.name}
                        price = {productByIndex.price}
                        priceWithDiscount = {productByIndex.price - productByIndex.discount}
                        key = {productByIndex.id}/>
            })}
        </div>
    )
}