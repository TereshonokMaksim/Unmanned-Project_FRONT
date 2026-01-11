import styles from "./about.module.css"
import { IMAGES } from "../../shared"


export function AboutPage(){
    return (
        <div>
        <section className={styles.aboutSection}>
            <h1>ПРО НАС</h1>
            <p>
            Ми — команда, яка об’єднує сучасні технології, інновації та досвід,
            щоб створювати ефективні рішення для бізнесу.
            </p>
      </section>

      <section className={styles.heroImageSection}>
        <img src={IMAGES.aboutimg} alt="Building" />
      </section>

      <section className={styles.missionSection}>
        <div className={styles.missionText}>
          <h2>НАША МІСІЯ</h2>
          <p>
            Допомагати клієнтам зростати, впроваджуючи інноваційні рішення
            та забезпечуючи стабільний результат.
          </p>
        </div>

        <div className={styles.missionImage}>
          <img src={IMAGES.ourmissionimg} alt="Office" />
        </div>
      </section>

      <section className={styles.teamSection}>
        <div className={styles.teamImage}>
          <img src={IMAGES.trustteamimg} alt="Team" />
        </div>

        <div className={styles.teamText}>
          <h2>КОМАНДА, ЯКІЙ МОЖНА ДОВІРЯТИ</h2>
          <p>
            Ми — професіонали своєї справи. Наша команда працює злагоджено,
            щоб досягати найкращих результатів.
          </p>
        </div>
      </section>
        </div>
    )
}