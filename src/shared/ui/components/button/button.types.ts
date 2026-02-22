import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

/*
    variant - Решает какой padding и font-weight у текста внутри
    variant: "primary" делает текст жирным и паддинги большими 
*/

export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{
    variant: "primary" | "secondary"
    isArrowShown: boolean
    isBgOn: boolean
}