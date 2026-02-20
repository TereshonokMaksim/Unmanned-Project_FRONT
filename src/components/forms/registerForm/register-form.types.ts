export interface RegistrationFormProps{
    name: string
    email: string
    password: string
    passwordConfirm: string
}

export interface RegFormProps{
    onSuccess: () => void
}