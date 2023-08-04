import { BoxProps, FlexProps, MenuProps, PopoverProps, RadioGroupProps, ResponsiveValue } from "@chakra-ui/react";
import { NeumBordProps } from "./atom";
import { Collection, Tag, TagEditing } from "./global";

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
export interface SwitchGroupProps extends NeumBordProps {
    optionRight: string,
    optionLeft: string,
    optionCenter?: string,
    defaultValue: string,
    onChange: (value:any)=>any,
    chH?: string | number,
    chFontSize?: number,
}

export interface PostPopoverProps extends PopoverProps {
    register?: any, 
    errors?: any,
    formState?: any,
    setValue?: (e:any) => void,
    value?: any,
    id: string,
    title: string,
    icon?: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
    tooltipContent: any,
}
export interface TopLinkPopoverProps extends PostPopoverProps {
    value: string | null,
    setValue: (e:any) => void,
}
export interface TopImagePopoverProps extends PostPopoverProps {
    value?:never,
    setValue?: never,
    image: string | null,
    setImage: React.Dispatch<React.SetStateAction<string | null>>,
    imageFile: File | null | "DELETE",
    setImageFile: React.Dispatch<React.SetStateAction<File | null | "DELETE">>,
}
export interface TagPopoverProps extends PostPopoverProps {
    value: Array<Tag> | Array<TagEditing>
    setValue: (e:any) => void,
    onDeleteClick: (e:any) => void,
}

export interface GlassTagListProps extends FlexProps {
    tags: Array<Tag> | Array<TagEditing>,
    colorList: Array<string>,
    onDeleteClick?: (e:any) => void,
    isDeletable?: boolean,
}

export interface NeumTagListProps extends FlexProps {
    tags: Array<Tag>,
    colorList: Array<string>,
    onDeleteClick?: (e:any) => void,
    isDeletable?: boolean,
}

export interface LinkSelectBoardProps extends MenuProps {
    collections?: Collection[],
    title: string,
    handleClick?: (e: any) =>any,
}