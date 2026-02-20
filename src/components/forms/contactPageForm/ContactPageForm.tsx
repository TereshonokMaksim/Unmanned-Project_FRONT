import { useForm } from "react-hook-form"
import { ContactPageFormProps } from "./contactPageForm.types"
import { Button, Input } from "../../../shared/ui"
import { TextArea } from "../../../shared/ui"
import { UseSendFeedback } from "../../../shared/hooks/api" 
import { useEffect, useRef } from "react"
import styles from "./contact-page-form.module.css"


export function ContactPageForm(){
    const FORM_WIDTH = 668//px
    const refF = useRef<HTMLFormElement>(null)
    const {register, formState, handleSubmit, setError} = useForm<ContactPageFormProps>()
    const [sendFeedback, {isLoading, error}] = UseSendFeedback()
    async function onFeedbackSubmit(data: ContactPageFormProps){
        const res = await sendFeedback(data)
        if ("message" in res){
            setError("root", {message: res.message})
        }
        if (refF && refF.current) refF.current.reset()
    }
    useEffect(() => {
        if (!error) return;
        setError('root', {message: error})
    }, [error])
    const emailError = formState.errors.email?.message
    const nameError = formState.errors.name?.message
    const bodyError = formState.errors.body?.message
    const phoneError = formState.errors.phone?.message
    return (
        <form onSubmit={handleSubmit(onFeedbackSubmit)} className = {styles.feedbackForm} ref = {refF}>
            <h3 className = {styles.formHeaderFeedback}>Зв'язатися з нами</h3>
            <div className = {styles.innerFeedbackForm}>
                <Input label="Ім'я" placeholder = "Ваше Ім'я" width={FORM_WIDTH} error={nameError} registerData={register("name", {
                    required: {
                        value: true,
                        message: "Ім'я обов'язкове"
                    },
                    maxLength: {
                        value: 255,
                        message: "Довжина вашого імені повинна бути менше 255 символів."
                    },
                    minLength: {
                        value: 1,
                        message: "Довжина вашого імені повинна бути вище 1 символа."
                    }
                })}/>
                <Input label="Телефон" placeholder = "+38 0" width={FORM_WIDTH} type="tel" error={phoneError} registerData={register("phone", {
                    required: {
                        value: true,
                        message: "Телефон обов'язковий"
                    },
                    maxLength: {
                        value: 15,
                        message: "Довжина вашого номеру телефону повинна бути менше 15 символів."
                    },
                    minLength: {
                        value: 3,
                        message: "Довжина вашого номеру телефону повинна бути вище 3 символа."
                    },
                    validate: (value) => {
                        let newVal = value
                        if (newVal.slice(0, 1)==="+"){newVal=newVal.slice(1,newVal.length)}
                        const newValSS=newVal.split('-')
                        let newValFin = []
                        for (let nvss of newValSS){
                            newValFin.push(...nvss.split(" "))
                        }
                        if (newValFin.includes(""))return "Номер телефону невірний"
                        let finalString = newValSS.join("")
                        const ALLOWED_SYMBOLS = ['0', '1','2','3','4','5','6','7','8','9']
                        for (let s of ALLOWED_SYMBOLS){finalString=finalString.replaceAll(s,"")}
                        if(finalString.length>0){
                            console.log(finalString)
                            return `Номер телефону може тільки містити цифри, " " та "-"`
                        }
                    }
                })}/>
                <Input label="E-mail" placeholder = "Ваше E-mail" width={FORM_WIDTH} type="email" error={emailError} registerData={register("email", {
                    required: {
                        value: true,
                        message: "Адреса електронної скриньки обов'язкове"
                    },
                    maxLength: {
                        value: 63,
                        message: "Довжина вашої електронної скриньки повинна бути менше 63 символів."
                    },
                    minLength: {
                        value: 3,
                        message: "Довжина вашої електронної скриньки повинна бути вище 3 символів."
                    },
                    validate: (value) => {
                        const checkValue1=value.split("@")
                        if (checkValue1.length!=2)return `У електронній адресі може бути тільки одна "@"`
                        if (!checkValue1[1].includes("."))return `Електронна адреса повинна бути прив'язана до доменного імені`
                    }
                })}/>
                <TextArea label="Повідомлення" placeholder = "Ваше повідомлення" width={FORM_WIDTH} error={bodyError} registerData={register("body", {
                    required: {
                        value: true,
                        message: "Повідомлення обов'язкове"
                    },
                    maxLength: {
                        value: 2047,
                        message: "Довжина вашого повідомлення повинна бути менше 2047 символів."
                    },
                    minLength: {
                        value: 10,
                        message: "Довжина вашого повідомлення повинна бути вище 10 символа."
                    }
                })}/>
            </div>
            <Button variant = "primary" type = "submit" isArrowShown = {false} isBgOn = {true}>НАДІСЛАТИ</Button>
        </form>
    )
}