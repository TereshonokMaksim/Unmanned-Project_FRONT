import { useForm } from "react-hook-form"
import styles from "./log-form.module.css"
import { LogFormProps, LoginFormProps } from "./log-form.types"
import { forwardRef, useEffect } from "react"
import { Input } from "../../../shared/ui"
import { UseLogin } from "../../../shared/hooks/api"
import { useUserContext } from "../../../context"


export const LogForm = forwardRef<HTMLFormElement, LogFormProps>((props: LogFormProps, ref) => {
    const { setToken } = useUserContext()
    const { onSuccess } = props
    const FORM_WIDTH = 388//px
    const {register, formState, handleSubmit, setError} = useForm<LoginFormProps>()
    const [sendLogReq, {isLoading, error}] = UseLogin()
    async function onLogSubmit(data: LoginFormProps){
        const dataToSend = {email: data.email, password: data.password}
        const res = await sendLogReq(dataToSend)
        if ("message" in res){
            setError("root", {message: res.message})
            return
        }
        console.log("WHAT IS THE PROBLEM", res.token, "\\", res)
        setToken(res.token)
        onSuccess()
    }
    useEffect(() => {
        if (!error) return;
        setError('root', {message: error})
    }, [error])
    const emailError = formState.errors.email?.message
    const passwordError = formState.errors.password?.message
    return (
        <form onSubmit={handleSubmit(onLogSubmit)} className = {styles.feedbackForm} ref = {ref} id = "logFormPlease">
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
            <Input label="Пароль" placeholder = "Введіть пароль" type = "password" width={FORM_WIDTH} error={passwordError} registerData={register("password", {
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
        </form>
    )
})
