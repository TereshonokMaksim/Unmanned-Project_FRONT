import { CatalogCategoryList, CatalogueCardList, CatalogPaginationList } from "../../components"
import { UseGetCategories, UseGetProducts, UseGetProductsAmount, UseLoadPage } from "../../shared/api/hooks"
import { useNavigate } from "react-router-dom"
import styles from "./catalog.module.css"
import { use, useEffect, useState } from "react"


export function CatalogPage(){
    UseLoadPage()
    const [pageNum, setPageNum]= useState(0)
    const [activeCategory, setActiveCategory] = useState(-1)
    const perPage = 20
    const {amount, isLoad: amountIsLoad, error: amountError, update: amountUpdate} = UseGetProductsAmount(activeCategory == -1 ? undefined : activeCategory)
    const {products, isLoad: prodIsLoad, error: prodError, update: prodUpdate} = UseGetProducts(pageNum, perPage, activeCategory == -1 ? undefined : activeCategory)
    const {categories, isLoad: catIsLoad, error: catError} = UseGetCategories()
    useEffect(() => {
        amountUpdate()
        prodUpdate()
    }, [pageNum, activeCategory])
    useEffect(() => {
        setPageNum(0)
    }, [activeCategory])
    
    return (
        <div className = {styles.page}>
            <h1>КАТАЛОГ</h1>
            <CatalogCategoryList categories = {categories} activeCategory = {activeCategory} setActiveCategory = {setActiveCategory} error = {catError} load = {catIsLoad}/>
            <CatalogueCardList products = {products} load = {prodIsLoad} error = {prodError}/>
            <CatalogPaginationList totalAmount = {amount} perPage = {perPage} currentPage = {pageNum+1} setCurrentPage = {setPageNum}/>
        </div>
    )
}