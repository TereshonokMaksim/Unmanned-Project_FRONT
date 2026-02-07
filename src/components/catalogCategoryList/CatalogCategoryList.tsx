import { Category } from "../../shared/types"
import styles from "./catalog-category-list.module.css"


interface CatalogCategoryListProps {
    categories: Category[] | undefined
    activeCategory: number 
    setActiveCategory: (id: number) => void
    error: string | null | undefined
    load: boolean | null | undefined
}

export function CatalogCategoryList(props: CatalogCategoryListProps){
    const {categories, activeCategory, setActiveCategory, error, load} = props
    return (
        <div className = {styles.catList}>
            <p onClick = {() => (setActiveCategory(-1))} className = {activeCategory == -1 ? styles.activeCategory : styles.inactiveCategory}>Всі</p>
            {load ?
            <p><i>Завантаження...</i></p>:
            (error || !categories) ?
                <div style={{color: "red"}}>Не вдалося завантажити категорії!</div> 
            :
            categories!.map((el) => {
                return <img src={el.icon} alt="cat" className = {activeCategory == el.id ? styles.activeCategory : styles.inactiveCategory} onClick = {() => {setActiveCategory(el.id)}} key = {el.id}/>
            })}
        </div>
    )
}