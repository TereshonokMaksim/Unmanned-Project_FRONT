import styles from "./returnPassword.module.css"
import { useState } from "react"

interface returnPasswordProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (email: string) => void;
}

export const ReturnPassword = ({ isOpen, onClose, onSubmit }: returnPasswordProps) => {
    const [email, setEmail] = useState<string>("");
    
    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!email.trim()) return;
        onSubmit(email);
        setEmail("")
    }
    const handleClose = () => {
        setEmail(""); 
        onClose();
    };
    
    return(
        <div className={styles.overlay} onClick={handleClose}>
            <div
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
            >
                <button className={styles.close} onClick={handleClose}>
                ✕
                </button>

                <h2 className={styles.title}>Відновлення пароля</h2>

                <label className={styles.label}>Email</label>
                <input
                type="email"
                placeholder="Введіть email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />

                <div className={styles.buttons}>
                <button className={styles.outline} onClick={handleClose}>
                    СКАСУВАТИ
                </button>
                <button className={styles.primary} onClick={handleSubmit}>
                    НАДІСЛАТИ ЛИСТ
                </button>
                </div>
            </div>
        </div>
    )
}
export default ReturnPassword;