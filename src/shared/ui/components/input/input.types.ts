import { InputHTMLAttributes, DetailedHTMLProps } from "react";


export interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{
    label: string,
    placeholder: string,
    registerData: object,
    width: number,
    error?: string,
    inputType?: string
}