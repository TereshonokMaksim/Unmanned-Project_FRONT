import { CatalogCategoryList, CatalogueCardList, CatalogPaginationList } from "../../components"
import { UseGetCategories, UseGetProducts, UseGetProductsAmount, UseLoadPage } from "../../shared/hooks"
import { Title } from "../../shared/ui"
import styles from "./catalog.module.css"
import { useEffect, useState } from "react"


export function CatalogPage(){
    const goBack = UseLoadPage()
    const [pageNum, setPageNum]= useState(0)
    const [activeCategory, setActiveCategory] = useState(-1)
    const perPage = 20
    const {amount, update: amountUpdate} = UseGetProductsAmount(activeCategory === -1 ? undefined : activeCategory)
    const {products, isLoad: prodIsLoad, error: prodError, update: prodUpdate} = UseGetProducts(pageNum, perPage, activeCategory === -1 ? undefined : activeCategory)
    const {categories, isLoad: catIsLoad, error: catError} = UseGetCategories()
    
    useEffect(() => {
        amountUpdate()
        prodUpdate()
        goBack()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNum, activeCategory])
    
    useEffect(() => {
        setPageNum(0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeCategory])
    
    return (
        <div className = {styles.page}>
            <Title>КАТАЛОГ</Title>
            <CatalogCategoryList categories = {categories} activeCategory = {activeCategory} setActiveCategory = {setActiveCategory} error = {catError} load = {catIsLoad}/>
            <CatalogueCardList products = {products} load = {prodIsLoad} error = {prodError}/>
            <CatalogPaginationList totalAmount = {amount} perPage = {perPage} currentPage = {pageNum+1} setCurrentPage = {setPageNum}/>
        </div>
    )
}