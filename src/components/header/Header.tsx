import styles from './header.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { IMAGES, VECTORS } from '../../shared/ui'

export function Header() {
  const navigate = useNavigate()

	return <header className={styles.header}>
			<nav className={styles.nav}>
				<Link to={"/catalog"} onClick={() => {window.scrollTo(0, 0)}}>КАТАЛОГ</Link>
				<Link to={"/about"} onClick={() => {window.scrollTo(0, 0)}}>ПРО НАС</Link>
				<Link to={"/contacts"} onClick={() => {window.scrollTo(0, 0)}}>КОНТАКТИ</Link>
			</nav>
			<div className={styles.logoBlock} onClick={() => {navigate('/'); window.scrollTo(0, 0)}} >
				<img src={IMAGES.logo} alt="Logo" />
			</div>
			<div className={styles.profileBlock}>
				<VECTORS.ShopVector className={styles.profileIcon} />
				<VECTORS.ProfilesVector className={styles.profileIcon} />
			</div>
		</header>

}