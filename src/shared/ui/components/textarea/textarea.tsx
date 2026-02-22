import { TextAreaProps } from "./textarea.types"
import styles from "./textarea.module.css"


export function TextArea(props: TextAreaProps){
    const {className, registerData, label, error, width, ...attributes} = props
    return (     
        <label className = {styles.inputLabelBlock} style={{width: `${width}px`}}>
            {label}
            <textarea   
                className = {`${className} ${styles.textareaGenericStyles} ${error ? styles.errorTextareaGen : ""}`} 
                {...registerData} 
                {...attributes}
            />
            {error && (<p className = {styles.errorTextareaText}>{error}</p>)}
        </label>
    )
}