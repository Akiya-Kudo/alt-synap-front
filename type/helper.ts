import { ObjectArrayProps } from "./atom";

export interface HelperProps {
    m?: string | number | ObjectArrayProps,
}

export interface RadioGroupProps extends HelperProps {
    getValue: (args: any) => any,
    direction?: "column" | "row",
    colorScheme?: string[],
    colorRandom?: boolean,
    options: string[],
    defValue: string,
    space?: number | string,
    size?: "sm" | "md" | "lg",
}