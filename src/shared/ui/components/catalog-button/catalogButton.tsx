import styles from "./catalog-button.module.css"
import { CatalogButtonProps } from "./catalog-button.types"
import { VECTORS } from "../../vectors"


export function CatalogButton(props: CatalogButtonProps){
    const {className, ...attributes} = props
    return (
        <button className = {`${styles.catalogButtonContainer} ${className}`} {...attributes}>
            <VECTORS.CatalogVector className = {styles.catalogButtonSVG}/>
        </button>
    )
}