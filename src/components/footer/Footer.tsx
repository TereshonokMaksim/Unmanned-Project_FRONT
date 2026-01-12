import styles from './footer.module.css'
import { IMAGES } from '../../shared'

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
				<a href = "#">КАТАЛОГ</a>
				<a href = "#">ПРО НАС</a>
				<a href = "#">КОНТАКТИ</a>
				<a href = "#">КОШИК</a>
				<a href = "#">КАБІНЕТ</a>
			</div>

			<p className = {styles.footerEnd}>© 2025 Drones Всі права захищені.</p>
		</footer>
	)
}
