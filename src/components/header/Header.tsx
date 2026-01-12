import styles from './header.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { IMAGES, VECTORS } from '../../shared'

export function Header() {
  const navigate = useNavigate()

	return <header className={styles.header}>
			<nav className={styles.nav}>
				<Link to={"/catalog"}>КАТАЛОГ</Link>
				<Link to={"/about"}>ПРО НАС</Link>
				<Link to={"/contacts"}>КОНТАКТИ</Link>
			</nav>

			<div className={styles.logoBlock} onClick={() => navigate('/')}>
				<img src={IMAGES.logo} alt="Logo" />
			</div>


			<div className={styles.profileBlock}>
				<VECTORS.ShopVector className={styles.profileIcon} />
				<VECTORS.ProfilesVector className={styles.profileIcon} />
			</div>
		</header>

}