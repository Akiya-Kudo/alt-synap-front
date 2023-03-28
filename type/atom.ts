import { BoxProps, ButtonProps, FlexProps, FormLabelProps, InputGroupProps, InputProps, LinkBoxProps, LinkProps, RadioProps, SwitchProps } from "@chakra-ui/react"

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
}
export interface GlassButtonProps extends ButtonProps {
    Hcolor?: string, //hover{color}
    Acolor?: string, //active{color}
    Hbg?: string,
    HbgGradient?: string,
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
    neumH?: "flat" | "dent",
}
export interface GlassInputProps extends InputProps {
    id: string,
    errors: any,
    formState?: any,
    register: any,
    labelName?: string,
    validation: any,
    relementBorderRadius?: string | number,
    size?: "sm" | "md" | "lg",
    PHcolor?: string,
}
export type HookFormInputProps = InputGroupProps & InputProps & FormLabelProps & {
    text?: string;
    errors?: any;
    formState?: any;
    register?: any;
    password?: string;
    defaultValue?: string | null;
    isDirty?: boolean;
    imageChanged?: boolean;
    onClose?: any;
}

//コンテイナー
export interface GlassContainerProps extends FlexProps{}