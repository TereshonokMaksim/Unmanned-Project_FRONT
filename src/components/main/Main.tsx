import styles from './main.module.css'
import { main } from './main.types'

export function Main(props: main) {
    const {children} = props
    return (
		<main className={styles.main}>
			{children}
		</main>
	)
}
