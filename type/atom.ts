import { MouseEventHandler, ReactNode } from "react"

export interface StyleProps {
    h: string | number,
    w: string | number,
    minH?: string | number,
    minW?: string | number,
    maxH?: string | number,
    maxW?: string | number,
    m?: string | number,
    p?: string | number,
    bg?: string, 
    color?: string,
    fontSize?: string | number, 
    borderR?: string | number, 
    children?: string | ReactNode,
    
}

export interface ButtonProps extends StyleProps {
    onClick?: MouseEventHandler<HTMLDivElement>,
    hovCol?: string
}

export interface TextProps extends StyleProps {
    letterSpacing?: string,
}

export interface BordProps extends StyleProps {

}