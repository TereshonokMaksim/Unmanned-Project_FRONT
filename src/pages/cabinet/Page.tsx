import styles from "./cabinet.module.css"
import { Input } from "../../shared/ui"
import { Link, useNavigate } from "react-router-dom"
import { useUserContext } from "../../context"
import { useForm } from "react-hook-form"
import { UseEditUser } from "../../shared/hooks/api/user"
import { UseLoadPage } from "../../shared/hooks"


interface ContactsCabinetFormProps {
    surname: string
    name: string
    patronymic: string
    birthday: string
    phone: string
    email: string
}

export function CabinetPage(){
    const { user, logout, token } = useUserContext()
    UseLoadPage()
    const FORM_WIDTH = 668//px
    const {register, formState, handleSubmit} = useForm<ContactsCabinetFormProps>()
    const [sendEditReq, {isLoading, error}] = UseEditUser()
    const navigate = useNavigate()
    console.log(user, "USER")
    async function onEditSubmit(data: ContactsCabinetFormProps){
        const res = await sendEditReq({partonymic: data.patronymic, name: data.name, surname: data.surname, birthday: `${data.birthday.split("/").toReversed().join("-")}T00:00:00.000Z`, email: data.email, phoneNumber: data.phone})
    }

    const nameError = formState.errors.name?.message
    const emailError = formState.errors.email?.message

    if (!token) {navigate("/")}

    return (
        <div className={styles.page}>
            <div className = {styles.cabinetPageLeft}>
                <h1 className = {styles.cabinetTitle}>ОСОБИСТИЙ КАБІНЕТ</h1>
                <Link className = {`${styles.linkLeft} ${styles.linkSelected}`} id = "linkSelected" to = "cabinet/contacts">КОНТАКТНІ ДАНІ</Link>
                <Link className = {styles.linkLeft} to = "cabinet/orders">МОЇ ЗАМОВЛЕННЯ</Link>
                <Link className = {styles.linkLeft} to = "cabinet/addresses">АДРЕСА ДОСТАВКИ</Link>
                <hr />
                <button className = {styles.linkLeft} onClick = {() => {logout(); navigate("/")}}>ВИЙТИ</button>
            </div>
            <form onSubmit={handleSubmit(onEditSubmit)} className = {styles.cabForm}>
                <h2 className = {styles.cabFormHeader}>Контактні дані</h2>
                <div className = {styles.cabFormBlock}>
                    <Input label = "Призвіще" placeholder = "Ваше призвіще" width = {FORM_WIDTH} defaultValue = {user?.surname} registerData = {register("surname",{
                        required: false
                    }                        
                    )}></Input>
                    <Input label = "Ім'я" placeholder = "Ваше Ім'я" width = {FORM_WIDTH} error = {nameError} defaultValue = {user?.name} registerData = {register("name",{
                        required: {
                            value: true,
                            message: "Ім'я обов'язкове!"
                        }
                    }                        
                    )}></Input>
                    <Input label = "По батькові" placeholder = "По батькові" width = {FORM_WIDTH} defaultValue = {user?.partonymic} registerData = {register("patronymic",{
                        required: false
                    }                        
                    )}></Input>
                    <Input label = "День народження" placeholder = "DD / MM / YYYY" width = {FORM_WIDTH} defaultValue = {user?.birthday ? String(user?.birthday) : ""} registerData = {register("birthday",{
                        required: false
                    }                        
                    )}></Input>
                    <Input label = "Телефон" placeholder = "+38 0" width = {FORM_WIDTH} defaultValue = {user?.phoneNumber} registerData = {register("phone",{
                        required: false
                    }                        
                    )}></Input>
                    <Input label = "E-mail" placeholder = "Ваш E-mail" width = {FORM_WIDTH} error = {emailError} defaultValue = {user?.email} registerData = {register("email",{
                        required: {value: true, message: "E-mail є обов'язковим"}
                    }                        
                    )}></Input>
                </div>
                <button className = {styles.cabFormButton} type = "submit" disabled = {!formState.isDirty}>ЗБЕРЕГТИ ЗМІНИ</button>
            </form>
        </div>
    )
}