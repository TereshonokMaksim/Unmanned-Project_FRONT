import { useNavigate, useParams } from "react-router-dom"
import styles from "./product-page.module.css"
import { useEffect } from "react"
import { UseGetProduct, UseGetSameProducts, UseLoadPage } from "../../shared/hooks"
import { Button, CatalogButton, Price, Title } from "../../shared/ui"
import { ProductBlockList, CatalogueCardList } from "../../components"


export function ProductPage(){
    const params = useParams<{id: string}>()
    const navigate = useNavigate()
    const actualProductId = Number(params.id)
    const {product, error, isLoad, update: updateProduct} = UseGetProduct(actualProductId)
    const {products: sameProducts, error: sameProductsError, isLoad: sameProductsIsLoad, update: updateSameProducts} = UseGetSameProducts(actualProductId)
    UseLoadPage()
    useEffect(() => {
        if (Number.isNaN(actualProductId)){
            navigate("/")
        }
        updateProduct()
        updateSameProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [actualProductId])
    return (
            <div className = {styles.page}>
                {isLoad ? 
                    <div>Wait a moment please</div> :
                error ? 
                    <div>An error occured, please try again later!!</div>
                :   
                    <div className = {styles.mainContainer}>
                        <section className={styles.landing}>
                            <div className = {styles.landingTexts}>
                                <h1 className = {styles.landingTitle}>{product?.name}</h1>
                                <p className = {styles.landingDescription}>{product?.description}</p>
                            </div>
                            <img src={product?.media} alt = "COOL LAND :fire:" className = {styles.landMainImg} />
                            <div className = {styles.absLandBlock}>
                                <div className = {styles.absLandPart}>
                                    <img src={product?.media} alt="WHAT" className = {styles.landSmallImg} />
                                    <div className = {styles.descAbsPart}>
                                        <h6 className = {styles.titleAbsPart}>{product?.name}</h6>
                                        <Price discount = {product!.discount} price = {product!.price}/>
                                    </div>
                                    <div className = {styles.buttonsAbsPart}>
                                    </div>
                                </div>
                                <div className = {styles.absLandPart}>
                                    <CatalogButton/>
                                    <Button variant = "secondary" isBgOn = {true} isArrowShown = {true}>
                                        ЗАМОВИТИ
                                    </Button>
                                </div>
                            </div>
                        </section>
                        {product && <ProductBlockList product = {product}/>}
                        <section className = {styles.sameProductsBlock}>
                            <Title>СХОЖІ ТОВАРИ</Title>
                            <CatalogueCardList products = {sameProducts} load = {sameProductsIsLoad} error = {sameProductsError}/>
                            <Button onClick = {() => {navigate("/catalog/")}} variant = "primary" isBgOn = {true} isArrowShown = {true}>
                                ДИВИТИСЬ ВСІ
                            </Button>
                        </section>
                    </div>
                }
            </div>
        )
}