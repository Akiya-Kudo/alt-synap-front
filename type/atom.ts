import { BoxProps, ButtonProps, FlexProps, InputProps, LinkBoxProps, RadioProps, SwitchProps } from "@chakra-ui/react"
import { MouseEvent, MouseEventHandler, ReactNode } from "react"




export interface NeumButtonProps extends ButtonProps {
    Hcolor?: string, //hover{color}
    Acolor?: string, //active{color}
    fontSize?: number,
}
export interface NeumSwitchButtonTabProps extends NeumButtonProps {
    children: string,
    id: string,
    selectedValue?: string,
}
export interface NeumColorModeButtonProps extends NeumButtonProps {
    onClick?: undefined,
}




export interface NeumTextProps extends BoxProps {
    neumH?: "shallow" | "tall",
}






export interface NeumBordProps extends BoxProps {
    neumH?: "shallow" | "tall",
    boxShadow?: undefined,
}






export interface NeumRadioProps extends RadioProps {
    value: string,
    children: string,
    Rcolor?: string,
}
export interface NeumSwitchRadioProps extends NeumRadioProps {
    getValueState: (state: boolean, value: string) => any
}






export interface NeumSwitchProps extends SwitchProps {
    id: string,
    Scolor?: string,
    swM?: string | number,
    swP?: string | number,
    lbM?: string | number,
    lbP?: string | number,
}






export interface NeumInputProps extends InputProps {
    PHcolor?: string,
    fontSize?: number,
    neumH?: "flat" | "dent",
}






export interface GlassContainerProps extends FlexProps{}