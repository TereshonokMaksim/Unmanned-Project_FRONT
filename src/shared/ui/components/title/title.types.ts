import { HTMLAttributes, DetailedHTMLProps } from "react";

/*
    variant primary - Серый жирный заголовок
    variant secondary - Синий обычный заголовок
*/

export interface TitleProps extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>{
    variant?: "primary" | "secondary"
}