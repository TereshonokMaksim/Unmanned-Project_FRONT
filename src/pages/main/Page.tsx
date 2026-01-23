import styles from "./main.module.css"
import { useNavigate } from 'react-router-dom'
import { IMAGES, Product, VECTORS } from '../../shared'
import { UseGetSpecialProducts } from "../../shared"
import { NewCardList, CatalogueCardList } from "../../components"

export function MainPage(){
    const {products: newProducts, isLoad: newProdLoad, error: newProdError} = UseGetSpecialProducts(true, false)
    const {products: popProducts, isLoad: popProdLoad, error: popProdError} = UseGetSpecialProducts(false, true)
    const navigate = useNavigate()
    
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
                <NewCardList error = {newProdError} load = {newProdLoad} products = {newProducts}/>
            </section>


            <section className={styles.catalog}>
                <h2>КАТАЛОГ</h2>
                <CatalogueCardList error = {popProdError} load = {popProdLoad} products = {popProducts}/>
                <button onClick = {() => {navigate("/catalog")}}>
                    <p>ДИВИТИСЬ ВСІ</p>
                    <VECTORS.ButtonArrowVector/>
                </button>
            </section>

      </div>

    
)}