import React from 'react';
import styles from './authModal.module.css';

interface authModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToRegister: () => void;
}

export const authModal: React.FC<authModalProps> = ({ isOpen, onClose, onSwitchToRegister }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.content} onClick={e => e.stopPropagation()}>
                <div className={styles.header}>
                    <span className={styles.activeTab}>Авторизація</span>
                    <span className={styles.inactiveTab}>/</span>
                    <span className={styles.inactiveTab} onClick={onSwitchToRegister}>Реєстрація</span>
                </div>
                <form className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Email</label>
                        <input type="email" placeholder="Введіть email" className={styles.input} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Пароль</label>
                        <input type="password" placeholder="Введіть пароль" className={styles.input} />
                        <button type="button" className={styles.forgotBtn}>Забули пароль?</button>
                    </div>
                    <div className={styles.actions}>
                        <button type="button" className={styles.cancelBtn} onClick={onClose}>Скасувати</button>
                        <button type="submit" className={styles.submitBtn}>Увійти</button>
                    </div>
                </form>
            </div>
        </div>
    )};