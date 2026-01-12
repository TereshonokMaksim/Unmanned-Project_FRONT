import styles from "./about.module.css"
import { IMAGES } from "../../shared"


export function AboutPage(){
    return (
        <div className={styles.page}>
            <section className={styles.aboutSection}>
                <div className = {styles.aboutTextPart}>
                    <h1>ПРО НАС</h1>
                    <p>
                        Ми — команда, яка об'єднана спільною метою: зробити передові технології доступними для кожного, хто потребує точності, безпеки та інновацій. <br/>
                        З 2022 року ми спеціалізуємось на постачанні дронів і тепловізорів для професійного, цивільного та волонтерського використання.
                    </p>
                </div>

                <div className={styles.heroImageSection}>
                    <img src={IMAGES.aboutimg} alt="Building" />
                </div>
            </section>

            <section className={styles.missionSection}>
                <div className={styles.missionText}>
                    <h2>НАША МІСІЯ</h2>
                    <p>
                        Допомагати тим, хто стоїть на передовій — у прямому й переносному сенсі. <br/>
                        Ми обираємо тільки надійну техніку, яку перевіряємо самі. Наша мета — якість, простота, і підтримка на кожному етапі: від покупки до використання.
                    </p>
                </div>

                <div className={styles.missionImage} style = {{"--grad-color": "#9C9088"} as React.CSSProperties}>
                    <img src={IMAGES.ourmissionimg} alt="Office" />
                </div>
            </section>

            <section className={styles.missionSection}>
                <div className={styles.missionImage} style = {{"--grad-color": "#CDD5DD"} as React.CSSProperties}>
                    <img src={IMAGES.trustteamimg} alt="Team" />
                </div>

                <div className={styles.missionText}>
                    <h2>КОМАНДА, ЯКІЙ МОЖНА ДОВІРЯТИ</h2>
                    <p>
                        Ми — не просто магазин. Ми — фахівці, які самі працюють із цією технікою й консультують з досвіду. Засновники проєкту — волонтери, військові та IT-спеціалісти, які об'єднали зусилля задля важливої справи.
                    </p>
                </div>
            </section>
        </div>
    )
}