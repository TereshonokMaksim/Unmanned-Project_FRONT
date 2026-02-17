import React, { useState } from "react";
import styles from "./NewPasswordModal.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (password: string) => void;
}

const NewPasswordModal: React.FC<Props> = ({ isOpen, onClose, onSave }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  if (!isOpen) return null;

  const handleSave = () => {
    if (!password || password !== confirmPassword) {
      alert("Паролі не співпадають");
      return;
    }

    console.log("New password saved:", password);
    onSave(password);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose}>✕</button>

        <h2>Новий пароль</h2>

        <label>Пароль</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label>Підтвердження пароля</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <div className={styles.buttons}>
          <button className={styles.cancel} onClick={onClose}>
            СКАСУВАТИ
          </button>
          <button className={styles.primary} onClick={handleSave}>
            ЗБЕРЕГТИ НОВИЙ ПАРОЛЬ
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPasswordModal;

// import { useState } from "react";
// import styles from "./newPasswordCreate.module.css";

// interface Props {
//     isOpen: boolean;
//     onClose: () => void;
//     onSuccess: () => void;
// }

// const NewPasswordCreate = ({  isOpen, onClose, onSuccess}: Props) => {
//     const [password, setPassword] = useState<string>("");
//     const [confirm, setConfirm] = useState<string>("");

//   if (!isOpen) return null;

//   const handleSave = () => {
//       if (!password || !confirm) return;
//       if (password !== confirm) return;
//       onSuccess();
//   };

//   return(
//       <div className={styles.overlay} onClick={onClose}>
//         <div
//           className={styles.modal}
//           onClick={(e) => e.stopPropagation()}
//           >
//         <button className={styles.close} onClick={onClose}>
//           ✕
//         </button>

//         <h2 className={styles.title}>Новий пароль</h2>

//         <label className={styles.label}>Пароль</label>
//         <input
//           type="password"
//           className={styles.input}
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <label className={styles.label}>Підтвердження пароля</label>
//         <input
//           type="password"
//           className={styles.input}
//           value={confirm}
//           onChange={(e) => setConfirm(e.target.value)}
//         />

//         <div className={styles.buttons}>
//           <button className={styles.outline} onClick={onClose}>
//             СКАСУВАТИ
//           </button>
//           <button className={styles.primary} onClick={handleSave}>
//             ЗБЕРЕГТИ НОВИЙ ПАРОЛЬ
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }
// export default NewPasswordCreate;