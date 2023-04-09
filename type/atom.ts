import { BoxProps, ButtonProps, FlexProps, FormLabelProps, IconButtonProps, InputGroupProps, InputProps, LinkBoxProps, LinkProps, RadioProps, SwitchProps } from "@chakra-ui/react"
import { UseFormRegisterReturn } from "react-hook-form"

//テキスト
export interface NeumTextProps extends BoxProps {
    neumH?: "shallow" | "tall",
}

//ボード
export interface NeumBordProps extends BoxProps {
    neumH?: "shallow" | "tall",
    boxShadow?: undefined,
}

//リンク
export interface BasicLinkProps extends LinkProps {
    children: string,
    href?: string,
}
export interface BasicLinkBoxProps extends LinkBoxProps {}

//ボタン
export interface NeumButtonProps extends ButtonProps {
    Hcolor?: string, //hover{color}
    Acolor?: string, //active{color}
    Hbg?: string,
    HbgGradient?: string,
    fontSize?: number,
    formState?: any,
}
export interface NeumIconButtonProps extends IconButtonProps {}
export interface GlassButtonProps extends ButtonProps {
    Hcolor?: string, //hover{color}
    Acolor?: string, //active{color}
    Hbg?: string,
    HbgGradient?: string,
    formState?: any,
}
export interface NeumSwitchButtonTabProps extends NeumButtonProps {
    children: string,
    id: string,
    selectedValue?: string,
}
export interface GlassColorModeButtonProps extends GlassButtonProps {
    onClick?: undefined,
}

//ラジオボタン
export interface NeumRadioProps extends RadioProps {
    value: string,
    children: string,
    Rcolor?: string,
}
export interface NeumSwitchRadioProps extends NeumRadioProps {
    getValueState: (state: boolean, value: string) => any
}

//スイッチボタン
export interface NeumSwitchProps extends SwitchProps {
    id: string,
    Scolor?: string,
    swM?: string | number,
    swP?: string | number,
    lbM?: string | number,
    lbP?: string | number,
}

//インプット
export interface NeumInputProps extends InputProps {
    PHcolor?: string,
    fontSize?: number,
    register?:  UseFormRegisterReturn,
}
export interface NeumFormInputProps extends NeumInputProps {
    id: string,
    labelName?: string,
    register: any,
    formState?: any,
    errors: any,
    validation: any,
}
export interface NeumFormInputProps_password extends NeumFormInputProps {
    password?: string,
}
export interface GlassInputProps extends InputProps {
    PHcolor?: string,
    register?:  UseFormRegisterReturn,
}
export interface GlassFormInputProps extends GlassInputProps {
    id: string,
    errors: any,
    formState?: any,
    register: any,
    labelName?: string,
    validation: any,
}

//コンテイナー
export interface GlassContainerProps extends FlexProps{}