import { BoxProps, FlexProps, MenuProps, PopoverProps, RadioGroupProps, ResponsiveValue } from "@chakra-ui/react";

export interface GlassMenuProps extends MenuProps {
    user_name?: string,
    itemFontSize?: string | number,
}

export interface MyRadioSelectGroupProps extends RadioGroupProps {
    options: string[],
    children: string, // タイトル
    titleSize?: string | number,
    titleM?: string | number,
    titleP?: string | number,
    colorPicks?: string[],
    colorRandom?: boolean,
    direction?: "column" | "row",
    spacing?: string | number | string[] | number[],
}

export interface MyTabGroupProps extends BoxProps {
    options: string[],
    defaultValue: string,
    onChange: (value:any)=>any,
    display?: ResponsiveValue<any>,
    justifyContent?: ResponsiveValue<any>,
    alignItems?: ResponsiveValue<any>,
    fontSize?: number,
    Hcolor?: string, 
    Acolor?: string,
    chBorderRadius?: string | number,
    chW?: string | number,
    chH?: string | number,
    chP?: string | number,
    chM?: string | number,
}

export interface PostPopoverProps extends PopoverProps {
    register?: any, 
    errors?: any,
    formState?: any,
    setValue: (e:any) => void,
    value?: string | Array<string>,
    id: string,
    title: string,
    icon?: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
    tooltipContent: any,
}
export interface TopLinkPopoverProps extends PostPopoverProps {
    value: string,
}
export interface TopImagePopoverProps extends PostPopoverProps {
    value: string,
}
export interface TagPopoverProps extends PostPopoverProps {
    value: Array<string>,
    onDeleteClick: (e:any) => void,
}

export interface TagListProps extends FlexProps {
    tags: Array<string>,
    colors?: Array<string>,
    onDeleteClick: (e:any) => void
}