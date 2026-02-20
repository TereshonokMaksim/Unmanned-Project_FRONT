/*

*/

import { ReactNode } from "react"

export interface ModalProps {
    show: boolean
    setVisibility: (show: boolean) => void
    doBlurBackground: boolean
    children: ReactNode
    className?: string
    isOutsideClickAutoClose?: boolean
    onClose?: () => void 
}