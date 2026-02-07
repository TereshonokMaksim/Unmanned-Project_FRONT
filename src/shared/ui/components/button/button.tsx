import styles from "./button.module.css"
import { VECTORS } from "../../vectors"
import { ButtonProps } from "./button.types"


export function Button(props: ButtonProps){
    const {variant, isArrowShown, isBgOn, children, className, ...attributes} = props
    const variantClass = `${variant}ButtonVariant`
    const bgClass = `${isBgOn}BgVar`
    return (
        <button className = {`${styles.buttonGeneric} ${styles[variantClass]} ${styles[bgClass]} ${className}`} {...attributes}>
            {children}
            {isArrowShown && <VECTORS.ButtonArrowVector className = {styles.buttonArrowIcon}/>}
        </button>
    )
}