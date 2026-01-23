import styles from "./main.module.css"
import { useNavigate } from 'react-router-dom'
import { IMAGES, Product, VECTORS } from '../../shared'
import { UseGetSpecialProducts } from "../../shared"
import { NewProductCard, CatalogueProductCard } from "../../components"

export function MainPage(){
    const {products, isLoad: newProdLoad, error: newProdError} = UseGetSpecialProducts(true, false)
    const {products: popProducts, isLoad: popProdLoad, error: popProdError} = UseGetSpecialProducts(false, true)
    const navigate = useNavigate()
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
    
    return (
        <div className={styles["page"]}>
            <section className={styles.land}>
                <h1>ТЕХНОЛОГІЇ<br/> ЯКІ ЗМІНЮЮТЬ РЕАЛЬНІСТЬ</h1>
                <img src={IMAGES.DroneLandImage} alt = "COOL LAND :fire:" />
                <div className = {styles.absLandBlock}>
                    <p>
                        Передові технології в одному місці. Обирай найкраще для найважливішого.
                    </p>
                    <button>До каталогу</button>
                </div>
            </section>

            <section className={styles.about}>
                <h2>ПРО НАС</h2>
                <p className = {styles.aboutMainText}>
                    Ми — команда, що об'єднує технології та надійність. <br/>
                    Пропонуємо дрони й тепловізори, перевірені у найскладніших умовах. <br/>
                    Обираємо тільки те, чому довіряємо самі.
                </p>
                <button onClick = {() => {navigate("/about")}}>
                    <p>Детальніше</p>
                    <VECTORS.ButtonArrowVector/>
                </button>
            </section>

            <section className={styles.new}>
                <h2>НОВЕ НА САЙТІ</h2>

                <div className={styles.cards}>
                    {
                    newProdLoad ? 
                        <div>wait 2 sec pls</div> :
                    newProdError ?
                        <div>Oh no, {newProdError}</div> 
                    :
                    preSetProductData.map((el) => {
                        const productByIndex = products[el.index]
                        console.log(productByIndex)
                        return <NewProductCard 
                                bgImage = {el.bgImage} 
                                gcolor = {el.gcolor} 
                                productImage = {el.droneImage} 
                                productTitle = {productByIndex.name}
                                productDescription = {productByIndex.description}
                                productPrice = {productByIndex.price}
                                id = {productByIndex.id}
                                key = {productByIndex.id}/>
                    })}
                </div>
            </section>


            <section className={styles.catalog}>
                <h2>КАТАЛОГ</h2>
                <div className = {styles.catalogueList}>
                    {
                    popProdLoad ? 
                        <div>wait 1 sec pls</div> :
                    popProdError ?
                        <div>Oh dang, {newProdError}</div> 
                    :
                    preSetPopProdData.map((el) => {
                        const productByIndex = products[el.index]
                        console.log(productByIndex)
                        return <CatalogueProductCard 
                                image = {el.image} 
                                title = {productByIndex.name}
                                price = {productByIndex.price}
                                priceWithDiscount = {productByIndex.price - productByIndex.discount}
                                key = {productByIndex.id}/>
                    })}
                </div>

                <button onClick = {() => {navigate("/catalog")}}>
                    <p>ДИВИТИСЬ ВСІ</p>
                    <VECTORS.ButtonArrowVector/>
                </button>
            </section>

      </div>

    
)}