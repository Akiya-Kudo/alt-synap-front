import { MouseEventHandler, ReactNode } from "react"

export type ObjectArrayProps = 
Array<string | number> | 
{
    base?: string | number,
    sm?: string | number,
    md?: string | number,
    lg?: string | number,
    xl?: string | number,
    "2xl"?: string | number,
}

export interface StyleProps {
    h?: string | number | ObjectArrayProps,
    w?: string | number | ObjectArrayProps,
    minH?: string | number | ObjectArrayProps,
    minW?: string | number | ObjectArrayProps,
    maxH?: string | number | ObjectArrayProps,
    maxW?: string | number | ObjectArrayProps,
    m?: string | number | ObjectArrayProps,
    p?: string | number | ObjectArrayProps,
    bg?: string, 
    bgg?: string, //gackgroundGradient
    color?: string,
    fs?: string | number | ObjectArrayProps, //fontSize
    fw?: string | number | ObjectArrayProps, //fontWeight
    br?: string | number | ObjectArrayProps,  //borderRadius
    children?: string | ReactNode,
}

export interface ButtonProps extends StyleProps {
    onClick?: MouseEventHandler<HTMLButtonElement>,
    Hcolor?: string, //_hover{color}
    Acolor?: string, // _active{color}
    fs?: number,
    children?: string,
    selectedValue?: string,
}

export interface TextProps extends StyleProps {
    letterSpacing?: string,
    neumH?: "shallow" | "tall"
}

export interface BordProps extends StyleProps {
    display?: "center" | "custom" | "column",
    neumH?: "shallow" | "tall"
}

export interface RadioProps extends StyleProps {
    value: string | undefined,
    disabled?: boolean,
    size?: "sm" | "md" | "lg",
}

export interface SwitchProps extends StyleProps {
    id: string,
    children?: string,
    disabled?: boolean,
    checked?: boolean,
    required?: boolean,
    size?: "sm" | "md" | "lg",
    Scolor?: string,
    direction?: "row" | "row-reverse",
    spacing?: string | number | ObjectArrayProps,
}

export interface InputProps extends StyleProps {
    getValue: (e:any) => any,
    placeholder?: string,
    neumH?: "flat" | "dent",
    Pcolor?: string,
    fs?: number,
}
