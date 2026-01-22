import styles from "./main.module.css"
import { useNavigate } from 'react-router-dom'
import { IMAGES, VECTORS } from '../../shared'
import { UseGetProducts } from "../../shared/api/hooks/use-get-products"

export function MainPage(){
    const navigate = useNavigate()
    // const { products, isLoad, error} = UseGetProducts() ///////////////////////////////////////////////////////////////////////////////////////////
    return (
        <div className={styles["page"]}>
            <section className={styles.land}>
                <h1>ТЕХНОЛОГІЇ<br/> ЯКІ ЗМІНЮЮТЬ РЕАЛЬНІСТЬ</h1>
                <img src={IMAGES.DroneLandImage} alt = "COOL LAND :fire:" />
                <div className = {styles.absLandBlock}>
                    <p>
                        Передові технології в одному місці. Обирай найкраще для найважливішого.
                    </p>
                    <button>До каталогу</button>
                </div>
            </section>

            <section className={styles.about}>
                <h2>ПРО НАС</h2>
                <p className = {styles.aboutMainText}>
                    Ми — команда, що об'єднує технології та надійність. <br/>
                    Пропонуємо дрони й тепловізори, перевірені у найскладніших умовах. <br/>
                    Обираємо тільки те, чому довіряємо самі.
                </p>
                <button onClick = {() => {navigate("/about")}}>
                    <p>Детальніше</p>
                    <VECTORS.ButtonArrowVector/>
                </button>
            </section>

            <section className={styles.new}>
                <h2>НОВЕ НА САЙТІ</h2>

                <div className={styles.cards}>
                    <div className={styles.card} style = {{"--gcolor": "#F5BE4F"} as React.CSSProperties}>
                        <img src={IMAGES.Drone_DJIMini4K} alt="Drone" className = {styles.cardDroneImg} />
                        <div className = {styles.cardBGLimiter}>
                            <img className = {styles.cardBGimg} src = {IMAGES.desertBG} alt="BG" />    
                        </div>
                        <div className = {styles.titleCard}>
                            <h3>DJI Mini 4K</h3>
                            <p>Easy-To-Use Mini Camera Drone</p>
                        </div>
                        <div className = {styles.dataCard}>
                            <span>from to 299$</span>
                            <button>
                                <p>КУПИТИ</p>
                                <VECTORS.ButtonArrowVector/>
                            </button>
                        </div>
                    </div>

                    <div className={styles.card} style = {{"--gcolor": "#1A271B"} as React.CSSProperties}>
                        <img src={IMAGES.Drone_DJIMini4Pro} alt="Drone" className = {styles.cardDroneImg} />
                        <div className = {styles.cardBGLimiter}>
                            <img className = {styles.cardBGimg} src = {IMAGES.forestBG} alt="BG" />
                        </div>
                        <div className = {styles.titleCard}>
                            <h3>DJI Mini Pro</h3>
                            <p>Easy-To-Use Mini Camera Drone</p>
                        </div>
                        <div className = {styles.dataCard}>
                            <span>from to 299$</span>
                            <button>
                                <p>КУПИТИ</p>
                                <VECTORS.ButtonArrowVector/>
                            </button>
                        </div>
                    </div>

                    <div className={styles.card} style = {{"--gcolor": "#4F94A4"} as React.CSSProperties}>
                        <img src={IMAGES.Drone_DJIMini4K} alt="Drone" className = {styles.cardDroneImg} />
                        <div className = {styles.cardBGLimiter}>
                            <img className = {styles.cardBGimg} src = {IMAGES.lakeBG} alt="BG" />
                        </div>
                        <div className = {styles.titleCard}>
                            <h3>DJI Mini 4K</h3>
                            <p>Easy-To-Use Mini Camera Drone</p>
                        </div>
                        <div className = {styles.dataCard}>
                            <span>from to 299$</span>
                            <button>
                                <p>КУПИТИ</p>
                                <VECTORS.ButtonArrowVector/>
                            </button>
                        </div>
                    </div>
                </div>
            </section>


            <section className={styles.catalog}>
                <h2>КАТАЛОГ</h2>
                <div className = {styles.catalogueList}>
                    <div className = {styles.catalogItem}>
                        <img src={IMAGES.Drone_DJIMini4Pro} alt="drone" className={styles.catalogItem}/>
                        <h6 className = {styles.catalogItemTitle}>DJI Mini 4K</h6>
                        <span className = {styles.catalogItemPrice}>
                            <span className = {styles.oldPrice}>29 901 ₴</span>
                            <span className = {styles.newPrice}>29 900 ₴</span>
                        </span>
                    </div>
                    <div className = {styles.catalogItem}>
                        <img src={IMAGES.drone2} alt="drone" className={styles.catalogImg}/>
                        <h6 className = {styles.catalogItemTitle}>DJI Mini 4K</h6>
                        <span className = {styles.catalogItemPrice}>29 900 ₴</span>
                    </div>
                    <div className = {styles.catalogItem}>
                        <img src={IMAGES.drone3} alt="drone" className={styles.catalogImg}/>
                        <h6 className = {styles.catalogItemTitle}>DJI Mini 4K</h6>
                        <span className = {styles.catalogItemPrice}>29 900 ₴</span>
                    </div>
                    <div className = {styles.catalogItem}>
                        <img src={IMAGES.drone4} alt="drone" className={styles.catalogImg}/>            
                        <h6 className = {styles.catalogItemTitle}>DJI Mini 4K</h6>
                        <span className = {styles.catalogItemPrice}>29 900 ₴</span>
                    </div>
                </div>

                <button onClick = {() => {navigate("/catalog")}}>
                    <p>ДИВИТИСЬ ВСІ</p>
                    <VECTORS.ButtonArrowVector/>
                </button>
            </section>

      </div>

    
)}