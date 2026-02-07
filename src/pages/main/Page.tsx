import styles from "./main.module.css"
import { useNavigate } from 'react-router-dom'
import { IMAGES } from '../../shared'
import { Button, Title, Text } from "../../shared/ui"
import { UseGetSpecialProducts } from "../../shared"
import { NewCardList, CatalogueCardList } from "../../components"
import { UseLoadPage } from "../../shared/api/hooks"

export function MainPage(){
    const {products: newProducts, isLoad: newProdLoad, error: newProdError} = UseGetSpecialProducts(true, false)
    const {products: popProducts, isLoad: popProdLoad, error: popProdError} = UseGetSpecialProducts(false, true)
    const navigate = useNavigate()
    UseLoadPage()   
    
    return (
        <div className={styles["page"]}>
            <section className={styles.land}>
                <h1>ТЕХНОЛОГІЇ<br/> ЯКІ ЗМІНЮЮТЬ РЕАЛЬНІСТЬ</h1>
                <img src={IMAGES.DroneLandImage} alt = "COOL LAND :fire:" />
                <div className = {styles.absLandBlock}>
                    <p>
                        Передові технології в одному місці. Обирай найкраще для найважливішого.
                    </p>
                    <Button onClick = {() => {navigate("/catalog/")}} variant = "primary" isBgOn = {true} isArrowShown = {false}>
                        До каталогу
                    </Button>
                </div>
            </section>

            <section className={styles.about}>
                <Title>ПРО НАС</Title>
                <Text variant = "primary">
                    Ми — команда, що об'єднує технології та надійність. <br/>
                    Пропонуємо дрони й тепловізори, перевірені у найскладніших умовах. <br/>
                    Обираємо тільки те, чому довіряємо самі.
                </Text>
                <Button onClick = {() => {navigate("/about")}} variant = "primary" isBgOn = {false} isArrowShown = {true}>
                    Читати більше
                </Button>
            </section>

            <section className={styles.new}>
                <Title>НОВЕ НА САЙТІ</Title>
                <NewCardList error = {newProdError} load = {newProdLoad} products = {newProducts}/>
            </section>


            <section className={styles.catalog}>
                <Title>КАТАЛОГ</Title>
                <CatalogueCardList error = {popProdError} load = {popProdLoad} products = {popProducts}/>
                <Button onClick = {() => {navigate("/catalog")}} variant = "primary" isBgOn = {true} isArrowShown = {true}>
                    ДИВИТИСЬ ВСІ
                </Button>
            </section>
      </div>

    
)}