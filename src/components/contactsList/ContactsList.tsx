import styles from "./contacts-list.module.css"
import { CONTACTS_VECTORS } from "../../shared/ui/contactsIcon"


export function ContactsList(){
    return (
        <div className = {styles.contactListMain}>
            <h2 className = {styles.contactListHeader}>Наші контакти</h2>
            <div className = {styles.contactListInner}>
                <div className = {styles.contactListBlock}>
                    <CONTACTS_VECTORS.TelVector className = {styles.contactListVector}/>
                    <p className = {styles.contactListDesc}>+38 (067) 123-45-67</p>
                </div>
                <div className = {styles.contactListBlock}>
                    <CONTACTS_VECTORS.MailVector className = {styles.contactListVector}/>
                    <p className = {styles.contactListDesc}>info@dronex.com.ua</p>
                </div>
                <div className = {styles.contactListBlock}>
                    <CONTACTS_VECTORS.LocationVector className = {styles.contactListVector}/>
                    <p className = {styles.contactListDesc}>вул. Університетська, 22, м. Дніпро, 49000, Україна</p>
                </div>
                <div className = {styles.contactListBlock}>
                    <CONTACTS_VECTORS.ScheduleVector className = {styles.contactListVector}/>
                    <p className = {styles.contactListDesc}>Пн–Пт: 10:00 — 18:00, Сб–Нд: вихідні</p>
                </div>
            </div>
            <div className = {styles.contactsListBottom}>
                <h6 className = {styles.contactsListFinishingH}>Ми в соцмережах:</h6>
                <div className = {styles.contactsListSocNetworks}>
                    <CONTACTS_VECTORS.FacebookVector className = {styles.contactListVector}/>
                    <CONTACTS_VECTORS.TelegramVector className = {styles.contactListVector}/>
                    <CONTACTS_VECTORS.InstagramVector className = {styles.contactListVector}/>
                </div>
            </div>
        </div>
    )
}