import React from "react";
import styles from "./PasswordSuccessModal.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const PasswordSuccessModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onLogin,
}) => {
  if (!isOpen) return null;

  const handleLogin = () => {
    console.log("User can login now");
    onLogin();
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose}>✕</button>

        <h2>Новий пароль</h2>

        <p className={styles.text}>
          Пароль успішно змінено! <br />
          Тепер ви можете увійти з новим паролем.
        </p>

        <button className={styles.primary} onClick={handleLogin}>
          УВІЙТИ
        </button>
      </div>
    </div>
  );
};

export default PasswordSuccessModal;

// import styles from "./newPassword.module.css";

// interface Props {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const NewPassword = ({ isOpen, onClose }: Props) => {
//   if (!isOpen) return null;

//   return
// }