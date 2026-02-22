import {Button, Modal} from "../../../shared/ui/components";
import styles from "./reg-suc-modal.module.css";
import {GenericModalProps} from "../generic-modal.types";

export function RegSucModal(props: GenericModalProps) {
	const {setCurrentModal} = props;
	return (
		<Modal
			doBlurBackground={true}
			show={true}
			setVisibility={(show: boolean) => {
				setCurrentModal("none");
			}}
			className={styles.regModal}
			onClose={() => {}}
		>
			<h2 className={styles.regSucTitle}>Реєстрація</h2>
			<p className={styles.regSucText}>Акаунт успішно створено!</p>
			<Button
				variant="secondary"
				onClick={() => {
					setCurrentModal("none");
				}}
				isArrowShown={false}
				isBgOn={true}
			>
				ПЕРЕЙТИ НА САЙТ
			</Button>
		</Modal>
	);
}
