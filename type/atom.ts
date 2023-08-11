import { AlertDialogProps, AlertProps, BoxProps, ButtonProps, FlexProps, FormLabelProps, IconButtonProps, InputGroupProps, InputProps, LinkBoxProps, LinkProps, RadioProps, SelectProps, SwitchProps, TagProps } from "@chakra-ui/react"
import { MouseEventHandler, ReactComponentElement } from "react"
import { UseFormRegisterReturn } from "react-hook-form"

import { API, OutputData } from "@editorjs/editorjs";
import { PostTag, Tag, User } from "./global";

//テキスト
export interface NeumTextProps extends BoxProps {
    neumH?: "shallow" | "tall",
}

//ボード
export interface NeumBordProps extends BoxProps {
    neumH?: "shallow" | "tall",
    boxShadow?: undefined,
}
export interface GlassBordProps extends BoxProps {}

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
    Ashadow?: boolean
}
export interface NeumIconButtonProps extends IconButtonProps {
    neumH?: "shallow" | "tall",
}
export interface NeumSwitchButtonTabProps extends NeumButtonProps {
    children: string,
    id: string,
    selectedValue?: string,
}
export interface GlassButtonProps extends ButtonProps {
    Hcolor?: string, //hover{color}
    Acolor?: string, //active{color}
    Hbg?: string,
    HbgGradient?: string,
    formState?: any,
}
export interface GlassSwitchButtonProps extends GlassButtonProps {
    isChecked?: (e:any)=>any,
    SBgGradient?: string,
    SHBgGradient?: string,
    Scolor?: string,
    SHcolor?: string,
    getState?: (e:any)=>any,
    defStateValue?: boolean,
    Schildren?: string | ReactComponentElement<any>,
}
export interface GlassIconButtonProps extends IconButtonProps {}
export interface GlassColorModeButtonProps extends GlassButtonProps {
    onClick?: undefined,
}

//セレクト
export interface NeumSelectProps extends SelectProps {
    
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
    lbFontSize?: string | number,
    swM?: string | number,
    swP?: string | number,
    lbM?: string | number,
    lbP?: string | number,
}
export interface GlassSwitchProps extends SwitchProps {
    id: string,
    Scolor?: string,
    SbgGradient?: string,
    swM?: string | number,
    swP?: string | number,
    lbM?: string | number,
    lbP?: string | number,
    lbFontSize?: string | number,
    lbFontWeight?: string | number,
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
    focusColor?: string,
}
export interface GlassInputProps extends InputProps {
    PHcolor?: string,
    register?:  UseFormRegisterReturn,
}
export interface GlassSearchInputProps extends GlassInputProps {
    setValue: (value: string) => any,
    value: string,
    onSearch: () => any,
    right_element: any
}
export interface GlassFormInputProps extends GlassInputProps {
    id: string,
    errors: any,
    formState?: any,
    register: any,
    labelName?: string,
    validation: any,
    focusColor?: string,
}
export interface GlassFormImageInputProps extends GlassInputProps {
    register: any,
    image: string | null,
    setImage: React.Dispatch<React.SetStateAction<string | null>>,
    setImageFile: React.Dispatch<React.SetStateAction<any>>,
    onChangeNoImageset: (e:any) => void
}

//コンテイナー
export interface GlassContainerProps extends FlexProps{}

//タグ
export interface GlassTagProps extends TagProps{
    id: string,
}
export interface GlassTagCloseProps extends GlassTagProps {
    onClick: (e:any)=>void,
} 
export interface NeumTagProps extends TagProps {
    tag_image?: string,
    display_name: string
}

//エディター
export interface ArticleEditorProps {
    value: OutputData,
    setValue: (e:any) => void,
    placeholder?: string;
    readOnly?: boolean;
};

export interface TipsyCardProps {
    uuid_pid: string,
    title: string,
    likes_num: number,
    top_image?: string,
    top_link?: string,
    content_type: number
    timestamp: Date,
    post_tags?: PostTag[],
    user: User,
}

export interface TipsyCardWithImageProps extends TipsyCardProps {
    top_image: string
}

//アラートダイアログ
export interface GlassAlertProps extends BoxProps {
    isOpen: boolean, 
    onClose: ()=>void, 
    onOpen: ()=>void,
    alertTitle: string, 
    alertMessage: string, 
    cancelMessage?: string, 
    exeMessage?: string, 
    handleExecute:()=>void,
    exeButtonBg?: string,
}