import { HTMLAttributes, DetailedHTMLProps } from "react";

/*
    variant primary - Текст синий
    variant secondary - Текст серый
*/

export interface TextProps extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>{
    variant: "primary" | "secondary"
}