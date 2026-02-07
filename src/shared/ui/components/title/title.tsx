import { TitleProps } from "./title.types";
import styles from "./title.module.css"


export function Title(props: TitleProps){
    const {className, variant, ...attributes} = props
    const variantTitleClass = `${variant ? variant : "primary"}TitleVariant`
    return <h2 className = {`${styles.titleGenericStyle} ${styles[variantTitleClass]} ${className}`} {...attributes}/>
}