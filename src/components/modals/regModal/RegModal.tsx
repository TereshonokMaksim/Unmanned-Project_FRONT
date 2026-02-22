import styles from "./reg-modal.module.css";
import {Modal, Button} from "../../../shared/ui/components";
import {RegisterForm} from "../../forms";
import {useRef, useState} from "react";
import {GenericModalProps} from "../generic-modal.types";

export function RegModal(props: GenericModalProps) {
	const {setCurrentModal} = props;
	const [show, setShow] = useState<boolean>(true);
	const regFormRef = useRef<HTMLFormElement>(null);
	function cleanForm() {
		if (regFormRef && regFormRef.current) {
			regFormRef.current.reset();
		}
	}
	function successForm() {
		cleanForm();
		setCurrentModal("reg-suc");
	}
	return (
		<Modal
			doBlurBackground={true}
			show={show}
			setVisibility={(show: boolean) => {
				setCurrentModal("none");
			}}
			onClose={cleanForm}
			className={styles.regModal}
		>
			<p className={styles.regFormHeader}>
				<span
					onClick={() => {
						setCurrentModal("login");
					}}
				>
					Авторизація
				</span>
				/Реєстрація
			</p>
			<div className={styles.regFormInner}>
				<RegisterForm onSuccess={successForm} ref={regFormRef} />
				<p
					onClick={() => {
						setCurrentModal("login");
					}}
					className={styles.regFormGoLogin}
				>
					Вже є акаунт? Увійти
				</p>
			</div>
			<div className={styles.regModalBottom}>
				<div className={styles.regModalButtons}>
					<Button
						variant="secondary"
						onClick={() => {
							setCurrentModal("none");
						}}
						isBgOn={false}
						isArrowShown={false}
						type="button"
					>
						СКАСУВАТИ
					</Button>
					<Button
						variant="secondary"
						isBgOn={true}
						isArrowShown={false}
						type="submit"
						form="regFormPlease"
					>
						НАДІСЛАТИ
					</Button>
				</div>
				<p className={styles.regFormDoc}>
					При вході або реєстрації, я підтверджую згоду <br />з
					умовами{" "}
					<span className={styles.regFormWarn}>
						публічного договору
					</span>
				</p>
			</div>
		</Modal>
	);
}
