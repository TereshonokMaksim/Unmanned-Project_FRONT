import styles from "./orders-footer.module.css"
import { IMAGES } from "../../shared"


export function OrdersFooter(){
    return (
        <footer className = {styles.footer}>
            <img src = {IMAGES.Drones} alt="DRONES" className = {styles.footerImg} />
			<p className = {styles.footerEnd}>© 2025 Drones Всі права захищені.</p>
        </footer>
    )
}