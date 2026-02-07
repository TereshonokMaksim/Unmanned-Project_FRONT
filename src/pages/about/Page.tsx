import styles from "./about.module.css"
import { IMAGES } from "../../shared"
import { UseLoadPage } from "../../shared/api/hooks"
import { Title, Text } from "../../shared/ui"


export function AboutPage(){
    UseLoadPage()
    return (
        <div className={styles.page}>
            <section className={styles.aboutSection}>
                <div className = {styles.aboutTextPart}>
                    <Title>ПРО НАС</Title>
                    <Text variant = "secondary">
                        Ми — команда, яка об'єднана спільною метою: зробити передові технології доступними для кожного, хто потребує точності, безпеки та інновацій. <br/>
                        З 2022 року ми спеціалізуємось на постачанні дронів і тепловізорів для професійного, цивільного та волонтерського використання.
                    </Text>
                </div>

                <div className={styles.heroImageSection}>
                    <img src={IMAGES.aboutimg} alt="Building" />
                </div>
            </section>

            <section className={styles.missionSection}>
                <div className={styles.missionText}>
                    <Title variant = "secondary" className = {styles.sectionSubTitle}>НАША МІСІЯ</Title>
                    <Text variant = "secondary">
                        Допомагати тим, хто стоїть на передовій — у прямому й переносному сенсі. <br/>
                        Ми обираємо тільки надійну техніку, яку перевіряємо самі. Наша мета — якість, простота, і підтримка на кожному етапі: від покупки до використання.
                    </Text>
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
                    <Title variant = "secondary" className = {styles.sectionSubTitle}>КОМАНДА, ЯКІЙ МОЖНА ДОВІРЯТИ</Title>
                    <Text variant = "secondary">
                        Ми — не просто магазин. Ми — фахівці, які самі працюють із цією технікою й консультують з досвіду. Засновники проєкту — волонтери, військові та IT-спеціалісти, які об'єднали зусилля задля важливої справи.
                    </Text>
                </div>
            </section>
        </div>
    )
}