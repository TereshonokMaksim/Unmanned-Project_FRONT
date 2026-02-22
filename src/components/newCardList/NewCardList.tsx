import styles from "./new-card-list.module.css"
import { NewProductCard } from "./newProductCard"
import { IMAGES } from "../../shared/ui"
import { Product } from "../../shared/types"



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
            "index": 0
        },
        {
            "gcolor": "#1A271B", 
            "bgImage": IMAGES.forestBG,
            "index": 1
        },
        {
            "gcolor": "#4F94A4", 
            "bgImage": IMAGES.lakeBG,
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
                        productImage = {productByIndex.media} 
                        productTitle = {productByIndex.name}
                        productDescription = {productByIndex.description}
                        productPrice = {productByIndex.price}
                        id = {productByIndex.id}
                        key = {productByIndex.id}/>
            })}
        </div>
    )
}