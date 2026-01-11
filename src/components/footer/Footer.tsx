import styles from './footer.module.css'
import { IMAGES } from '../../shared'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <img src={IMAGES.footerimg} alt="footer" />
      
    </footer>
  )
}
