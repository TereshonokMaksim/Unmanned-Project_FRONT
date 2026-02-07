import styles from './main.module.css'
import { MainProps } from './main.types'

export function Main(props: MainProps) {
    const {children} = props
    return (
		<main className={styles.main}>
			{children}
		</main>
	)
}
