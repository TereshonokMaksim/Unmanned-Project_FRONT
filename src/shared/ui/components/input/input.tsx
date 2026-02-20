import styles from "./input.module.css"
import { InputProps } from "./input.types"


export function Input(props: InputProps){
    const { label, registerData, inputType, className, width, error, type, ...attributes } = props
    return (
        <label className = {styles.inputLabelBlock} style = {{width: `${width}px`}}>
            {props.label}
            <input 
                type = {inputType ? inputType : "text"} 
                className = {`${className} ${styles.inputGenericStyles} ${error? styles.errorInputGen:""}`} 
                {...registerData} 
                {...attributes}
            />
            {error && (<p className = {styles.errorInputText}>{error}</p>)}
        </label>
    )
}