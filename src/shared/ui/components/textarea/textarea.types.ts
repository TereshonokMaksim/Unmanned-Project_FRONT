import { DetailedHTMLProps, TextareaHTMLAttributes } from "react";


export interface TextAreaProps extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>{
    label: string,
    placeholder: string,
    registerData: object,
    width: number,
    error?: string
}