import { HTMLAttributes, DetailedHTMLProps } from "react";

export interface PriceProps extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>{
    price: number
    discount: number
}