import styles from "./contacts.module.css"
import { Title } from "../../shared/ui"
import { ContactPageForm, ContactsList } from "../../components"
import { UseLoadPage } from "../../shared/hooks"


export function ContactsPage(){
    UseLoadPage()
    return (
        <div className = {styles.page}>
            <Title variant="primary">КОНТАКТИ</Title>
            <div className={styles.contactsPageMain}>
                <ContactsList></ContactsList>
                <ContactPageForm></ContactPageForm>
            </div>
        </div>
    )
}