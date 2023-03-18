import { ObjectArrayProps } from "./atom";

export interface HelperProps {
    options: string[],
    defValue: string,
    getValue: (args: any) => any,
    m?: string | number | ObjectArrayProps,
    w?: string | number | ObjectArrayProps,
    h?: string | number | ObjectArrayProps,
    p?: string | number | ObjectArrayProps,
    fs?: string | number | ObjectArrayProps,
}

export interface RadioGroupProps extends HelperProps {
    direction?: "column" | "row",
    colorScheme?: string[],
    colorRandom?: boolean,
    space?: number | string,
    size?: "sm" | "md" | "lg",
}

export interface TabGroupProps extends HelperProps {
    Hcolor?: string, 
    Acolor?: string, 
    fs?: number,
    br?: string | number,
    brCh?: string | number,
    wCh?: string | number | ObjectArrayProps,
    hCh?: string | number | ObjectArrayProps,
    space?: number | string,
}