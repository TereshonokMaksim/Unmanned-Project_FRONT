import { TextProps } from "./text.types";
import styles from "./text.module.css"


export function Text(props: TextProps){
    const {className, variant, ...attributes} = props
    const variantTextClass = `${variant}TextVariant`
    return <p className = {`${styles.textStylesGeneric} ${styles[variantTextClass]} ${className}`} {...attributes}/>
}