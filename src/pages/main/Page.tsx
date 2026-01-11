import styles from "./main.module.css"
import { Link, useNavigate } from 'react-router-dom'
import { IMAGES, VECTORS } from '../../shared'

export function MainPage(){
    const navigate = useNavigate()
    return (
        <div className={styles["page"]}>
            <div className={styles.header}>
                <nav className={styles.nav}>
                    <Link to="/catalog">КАТАЛОГ</Link>
                    <Link to="/about">ПРО НАС</Link>
                    <Link to="/contacts">КОНТАКТИ</Link>
                </nav>

                <div className={styles.logoBlock} onClick={() => navigate('/')}>
                    <img src={IMAGES.logo} alt="Logo" />
                </div>


                <div className={styles.profileBlock}>
                    <VECTORS.profilesvector className={styles.profileIcon} />
                    <VECTORS.shopvector className={styles.profileIcon} />
                </div>
            </div>
            <section className={styles.hero}>
                <h1>ТЕХНОЛОГІЇ ЯКІ ЗМІНЮЮТЬ РЕАЛЬНІСТЬ</h1>
                <p>
                  Передові технології в одному місці. Обирай найкраще для найважливішого.До каталогу
                </p>
                <button>До каталогу</button>
        </section>

        <section className={styles.about}>
                <h2>ПРО НАС</h2>
                <p>
                    Наша компанія спеціалізується на розробці та продажу сучасних безпілотних технологій.
                </p>
                <button>Детальніше</button>
        </section>

        <section className={styles.new}>
            <h2>НОВЕ НА САЙТІ</h2>

            <div className={styles.cards}>
            <div className={styles.card}>
                <div className={styles.cardImage}></div>
                <h3>DJI Mini 4K</h3>
                <span>від 12 000 грн</span>
            </div>

            <div className={styles.card}>
                <div className={styles.cardImage}></div>
                <h3>DJI Mini Pro</h3>
                <span>від 18 000 грн</span>
            </div>

            <div className={styles.card}>
                <div className={styles.cardImage}></div>
                <h3>DJI Mini 4 Pro</h3>
                <span>від 22 000 грн</span>
            </div>
            </div>
        </section>


        <section className={styles.catalog}>
            <h2>КАТАЛОГ</h2>

            <img src={IMAGES.drone1} alt="drone" className={styles.catalogItem}/>
            <img src={IMAGES.drone2} alt="drone" className={styles.catalogItem}/>
            <img src={IMAGES.drone3} alt="drone" className={styles.catalogItem}/>
            <img src={IMAGES.drone4} alt="drone" className={styles.catalogItem}/>            

            <button>Весь каталог</button>
        </section>
        <div className={styles.footer}>
            <img src={IMAGES.footerimg} alt="footer" />
        </div>

      </div>

    
)}