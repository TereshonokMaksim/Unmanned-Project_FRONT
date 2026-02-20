import styles from './log-modal.module.css'
import { Modal, Button } from '../../../shared/ui/components'
import { LogForm } from '../../forms'
import { useRef, useState } from 'react'
import { LogModalProps } from './log-modal.types'


export function LogModal(props: LogModalProps) {
    const { setCurrentModal } = props
    const [show, setShow] = useState<boolean>(true)
    const regFormRef = useRef<HTMLFormElement>(null)
    function cleanForm(){
        if (regFormRef && regFormRef.current) {regFormRef.current.reset()}
    }
    function successForm(){
        cleanForm()
        setCurrentModal("none")

    }
    return (
        <Modal doBlurBackground = {true} show = {show} setVisibility = {(show: boolean) => {setCurrentModal("none")}} onClose = {cleanForm} className = {styles.regModal}>
            <p className = {styles.regFormHeader}>
                Авторизація/
                <span onClick={() => {setCurrentModal("reg")}}>Реєстрація</span>
            </p>
            <div className = {styles.regFormInner}>
                <LogForm onSuccess={successForm}/>
                <p onClick = {() => {setCurrentModal("pass-reset-start")}} className = {styles.regFormGoLogin}>Забули пароль?</p>
            </div>
            <div className = {styles.regModalBottom}>
                <div className = {styles.regModalButtons}>
                    <Button variant='secondary' onClick = {() => {setCurrentModal("none")}} isBgOn = {false} isArrowShown = {false}>СКАСУВАТИ</Button>
                    <Button variant='secondary' type = "submit" form = 'logFormPlease' isBgOn = {true} isArrowShown = {false}>НАДІСЛАТИ</Button>
                </div> 
            </div>
        </Modal>
    )   

}