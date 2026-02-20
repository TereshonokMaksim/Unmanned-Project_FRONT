import { useForm } from "react-hook-form"
import styles from "./register-form.module.css"
import { RegFormProps, RegistrationFormProps } from "./register-form.types"
import { UseReg } from "../../../shared/hooks/api"
import { forwardRef, useEffect, useImperativeHandle } from "react"
import { Input } from "../../../shared/ui"
import { useUserContext } from "../../../context"


export const RegisterForm = forwardRef<HTMLFormElement, RegFormProps>((props: RegFormProps, ref) => {
    const { setToken } = useUserContext()
    const { onSuccess } = props
    const FORM_WIDTH = 388//px
    const {register, formState, handleSubmit, setError} = useForm<RegistrationFormProps>()
    const [sendRegReq, {isLoading, error}] = UseReg()
    async function onRegSubmit(data: RegistrationFormProps){
        if (data.password != data.passwordConfirm){
            setError("password", {message: "Паролі мають збігатися!"})
            setError("passwordConfirm", {message: "Паролі мають збігатися!"})
            return
        }
        const dataToSend = {name: data.name, email: data.email, password: data.password}
        const res = await sendRegReq(dataToSend)
        if ("message" in res){
            setError("root", {message: res.message})
            return
        }
        console.log("WHAT IS THE 2222", res.token, "\\", res)
        setToken(res.token)
        onSuccess()
    }
    useEffect(() => {
        if (!error) return;
        setError('root', {message: error})
    }, [error])
    const nameError = formState.errors.name?.message
    const emailError = formState.errors.email?.message
    const passwordError = formState.errors.password?.message
    const passwordConfirmError = formState.errors.passwordConfirm?.message
    return (
        <form onSubmit={handleSubmit(onRegSubmit)} className = {styles.feedbackForm} ref = {ref} id = "regFormPlease">
            <Input label="Ім'я" placeholder = "Введіть Ім'я" width={FORM_WIDTH} error={nameError} registerData={register("name", {
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
            <Input label="Пароль" type = "password" placeholder = "Введіть пароль" width={FORM_WIDTH} error={passwordError} registerData={register("password", {
                required: {
                    value: true,
                    message: "Пароль обов'язковий"
                },
                maxLength: {
                    value: 63,
                    message: "Довжина вашого паролю повинна бути менше 63 символів."
                },
                minLength: {
                    value: 4,
                    message: "Довжина вашого пароля повинна бути вище 4 символа."
                }
            })}/>
            <Input label="Підтвердження пароля" type = "password" placeholder = "Повторіть пароль" width={FORM_WIDTH} error={passwordConfirmError} registerData={register("passwordConfirm", {
                required: {
                    value: true,
                    message: "Підтвердження паролю є обов'язкове"
                },
                maxLength: {
                    value: 63,
                    message: "Довжина вашого паролю повинна бути менше 63 символів."
                },
                minLength: {
                    value: 4,
                    message: "Довжина вашого пароля повинна бути вище 4 символа."
                }
            })}/>
        </form>
    )
})