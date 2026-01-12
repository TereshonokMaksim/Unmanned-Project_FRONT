import styles from './footer.module.css'
import { IMAGES } from '../../shared'
import { Link } from 'react-router-dom'

export function Footer() {
	return (
		<footer className={styles.footer}>
			<div className = {styles.statisticBlock}>
				<div className = {styles.statsData}>
					<h4>
						1K+
					</h4>
					<p>
						Успішних відправок
					</p>
				</div>
				<div className = {styles.statsData}>
					<h4>
						1.5K+
					</h4>
					<p>
						Задоволених клієнтів
					</p>
				</div>
				<div className = {styles.statsData}>
					<h4>
						24/7
					</h4>
					<p>
						Підтримка клієнтів
					</p>
				</div>
			</div>

			<img src = {IMAGES.Drones} alt="DRONES" />

			<div className = {styles.footerLinkBlock}>
				<Link to = "/catalog	">КАТАЛОГ</Link>
				<Link to = "/about">ПРО НАС</Link>
				<Link to = "/contacts">КОНТАКТИ</Link>
				<Link to = "/cart">КОШИК</Link>
				<Link to = "/cabinet">КАБІНЕТ</Link>
			</div>

			<p className = {styles.footerEnd}>© 2025 Drones Всі права захищені.</p>
		</footer>
	)
}
