import styles from "./modal.module.css"
import { createPortal } from "react-dom"
import { ModalProps } from "./modal.types"
import { useEffect, useRef } from "react"
import { VECTORS } from "../../vectors"


export function Modal(props: ModalProps){
    const { children, className, doBlurBackground, show, setVisibility, onClose, isOutsideClickAutoClose } = props
    const modalRef = useRef<HTMLDivElement>(null)
    function closeModal(){
        setVisibility(false)
        if (onClose) onClose()
    }
    useEffect(()=>{
        function handleClick(event: MouseEvent) {
            if (!isOutsideClickAutoClose || !modalRef.current) return
            const target = event.target as HTMLElement
            if (!modalRef.current.contains(target)) closeModal()
        }
        document.body.addEventListener('click', handleClick)
        return () => {
            document.body.removeEventListener('click', handleClick)
            document.body.style.overflow = "scroll"
        }
    }, [])
    if (!show){
        return null
    }
    let comp=null;
    if (doBlurBackground) {
        document.body.style.overflow = "hidden"
        comp = (
            <div className = {styles.modalBackBlur}>
                <div className = {`${styles.modalGenericStyles} ${className}`}>
                    <VECTORS.ModalCloseButton className = {styles.modalCloseButton} onClick = {closeModal}/>
                    {children}
                </div>
            </div>
        )
    }
    else {
        comp = (
            <div className = {`${styles.modalGenericStyles} ${className}`}>
                <VECTORS.ModalCloseButton className = {styles.modalCloseButton} onClick = {closeModal}/>
                {children}
            </div>
        )
    }
    console.log("ASJDOIJASPO")
    return createPortal(comp, document.body)
}