import styles from "./catalog-pagination-list.module.css"
import { VECTORS } from "../../shared/ui"


interface CatalogPaginationListProps {
    currentPage: number
    totalAmount: number | undefined
    perPage: number
    setCurrentPage: (pageNum: number) => void
}

export function CatalogPaginationList(props: CatalogPaginationListProps){
    const {currentPage, totalAmount, perPage, setCurrentPage} = props
    const totalPages = Math.ceil((totalAmount ? totalAmount : 0) / perPage)
    const LIMIT = 7
    let pagesRange = []
    if (currentPage < LIMIT / 2 + 1){
        for (let i = 1; i <= Math.min(LIMIT, totalPages); i++){pagesRange.push(i)}
    }
    else if (currentPage > totalPages - LIMIT){
        for (let i = Math.min(1, totalPages - LIMIT); i <= Math.min(LIMIT, totalPages); i++){pagesRange.push(i)}
    }
    else {
        for (let i = currentPage - Math.floor(LIMIT / 2); i <= currentPage + Math.ceil(LIMIT / 2); i++){pagesRange.push(i)}
    }
    return (
        <div className = {styles.catPageList}>
            <VECTORS.ToStart onClick={() => {setCurrentPage(0)}}/>
            {pagesRange.map((num) => {
                return <button className = {`${styles.pageNumButton} ${num === currentPage ? styles.activePageNum : false}`} onClick = {() => {if (currentPage !== num) {setCurrentPage(num-1)}}} key = {num}>{num}</button>
            })}
            <VECTORS.ToEnd onClick={() => {setCurrentPage(totalPages-1)}}/>
        </div>
    )
}