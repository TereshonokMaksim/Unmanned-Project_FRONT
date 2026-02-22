import styles from "./pass-change-start.module.css"
import { GenericModalProps } from "../generic-modal.types"
import { Modal } from "../../../shared/ui/components"
import { useRef } from "react";


export function PassChangeStart(props: GenericModalProps){
    const {setCurrentModal} = props
    // PSS - Password Change Start (PassChangeStart)
    const PSSFormRef = useRef<HTMLFormElement>(null);
    function cleanForm() {
        if (PSSFormRef && PSSFormRef.current) {
            PSSFormRef.current.reset();
        }
    }
    function successForm() {
        cleanForm();
        setCurrentModal("pass-change-new");
    }
    return (
        <Modal 
			doBlurBackground={true}
			show={true}
			setVisibility={(show: boolean) => {
				setCurrentModal("none");
			}}
			onClose={cleanForm}
			className={styles.regModal}
        >
            <p>placeholder</p>
        </Modal>
    )
}