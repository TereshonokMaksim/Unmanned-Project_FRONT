import { useNavigate, useParams } from "react-router-dom"
import styles from "./product-page.module.css"
import { act, useEffect } from "react"
import { UseGetProduct, UseGetSameProducts, UseLoadPage } from "../../shared/api/hooks"
import { VECTORS } from "../../shared"
import { ProductBlockList, CatalogueCardList } from "../../components"


export function ProductPage(){
    const params = useParams<{id: string}>()
    const navigate = useNavigate()
    const actualProductId = Number(params.id)
    UseLoadPage()
    useEffect(() => {
        if (Number.isNaN(actualProductId)){
            navigate("/")
        }
    }, [actualProductId])
    const {product, error, isLoad} = UseGetProduct(actualProductId)
    const {products: sameProducts, error: sameProductsError, isLoad: sameProductsIsLoad} = UseGetSameProducts(actualProductId)
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
                                        {product?.discount == 0 ?
                                            <p className = {styles.priceAbsPart}>{product.price} $</p> :
                                        (<p className = {styles.priceAbsPart}>
                                            <span className = {styles.oldPriceOverlineAbs}>{product?.price} $</span>
                                            <span className = {styles.newPriceAbsPart}>{product!.price - product!.discount} $</span>
                                        </p>)}
                                    </div>
                                    <div className = {styles.buttonsAbsPart}>
                                    </div>
                                </div>
                                <div className = {styles.absLandPart}>
                                    <button className = {styles.catalogueIconAbs}>
                                        <VECTORS.CatalogVector/>
                                    </button>
                                    <button className = {styles.absPartOrder}>ЗАМОВИТИ<VECTORS.ButtonArrowVector/></button>
                                </div>
                            </div>
                        </section>
                        {product && <ProductBlockList product = {product}/>}
                        <section className = {styles.sameProductsBlock}>
                            <h2 className = {styles.sameProductsHeader}>СХОЖІ ТОВАРИ</h2>
                            <CatalogueCardList products = {sameProducts} load = {sameProductsIsLoad} error = {sameProductsError}/>
                            <button className = {styles.sameProductsButton} onClick = {() => {navigate("/catalog/")}}>ДИВИТИСЬ ВСІ<VECTORS.ButtonArrowVector/></button>
                        </section>
                    </div>
                }
            </div>
        )
}