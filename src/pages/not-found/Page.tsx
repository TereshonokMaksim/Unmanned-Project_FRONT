import { useNavigate } from "react-router-dom"
import styles from "./not-found.module.css"


// nobody is going to notice what im doing in my work time
const errorDescriptions = [
    "Упс! Цю сторінку не знайдено! Перевірте, чи її не перемістили!",
    "Хм, здається, ця сторінка була видалена або переміщена.",
    "Ця сторінка більше не існує, перевірте, чи її не перенесли.",
    "Ой, сторінка не завантажилася! Перевірте, чи правильно ввели URL.",
    "Ну що ж, сторінку не знайдено. Подивіться, чи її не перемістили або не видалили.",
    "Сподіваємось, колись ця сторінка з’явиться. А поки перевірте, чи її не перенесли.",
    "01001000 01101001 00100000 01110100 01101000 01100101 01110010 01100101 00100001"
]

export function NotFoundPage(){
    const navigator = useNavigate()
    let text = errorDescriptions[Math.round(Math.random() * (errorDescriptions.length - 1))]
    return (
        <div className = {styles.page}>
            <div className = {styles.error}>
                <h1>404</h1>
                <p>{text}</p>
            </div>
            <button onClick={() => {navigator("/")}}>
                <p>НА ГОЛОВНУ</p>
            </button>
        </div>
    )
}