import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

/*
    variant - Решает какой padding и font-weight у текста внутри
*/

export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{
    variant: "primary" | "secondary"
    isArrowShown: boolean
    isBgOn: boolean
}