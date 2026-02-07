import styles from "./new-card-list.module.css"
import { NewProductCard } from "../newProductCard"
import { IMAGES, Product, DEBUG } from "../../shared"



interface NewCardListProps {
    load: boolean,
    error: string | null,
    products: Product[] | undefined
}

export function NewCardList(props: NewCardListProps){
    const {load, error, products} = props

    const preSetProductData = [
        {
            "gcolor": "#F5BE4F", 
            "bgImage": IMAGES.desertBG,
            "droneImage": IMAGES.Drone_DJIMini4K,
            "index": 0
        },
        {
            "gcolor": "#1A271B", 
            "bgImage": IMAGES.forestBG,
            "droneImage": IMAGES.Drone_DJIMini4Pro,
            "index": 1
        },
        {
            "gcolor": "#4F94A4", 
            "bgImage": IMAGES.lakeBG,
            "droneImage": IMAGES.Drone_DJIMini4K,
            "index": 2
        }
    ]

    return (
        <div className={styles.cards}>
            {
            load ? 
                <div><i>Завантаження...</i></div> :
            (error || !products) ?
                <div style={{color: "red"}}>Не вдалося завантажити товари</div>
            :
            preSetProductData.map((el) => {
                const productByIndex = products[el.index]
                return <NewProductCard 
                        bgImage = {el.bgImage} 
                        gcolor = {el.gcolor} 
                        productImage = {DEBUG ? el.droneImage : productByIndex.media} 
                        productTitle = {productByIndex.name}
                        productDescription = {productByIndex.description}
                        productPrice = {productByIndex.price}
                        id = {productByIndex.id}
                        key = {productByIndex.id}/>
            })}
        </div>
    )
}