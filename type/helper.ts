import { ApolloQueryResult, QueryResult } from "@apollo/client";
import { BoxProps, FlexProps, MenuProps, ModalProps, PopoverProps, RadioGroupProps, ResponsiveValue } from "@chakra-ui/react";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { NeumBordProps } from "./atom";
import { Collection, Post, Tag, TagEditing } from "./global";

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
    isDisabledCenter?: boolean, 
    isDisabledRight?: boolean, 
    isDisabledLeft?: boolean, 
}

export interface PostPopoverProps extends PopoverProps {
    register?: any, 
    errors?: any,
    formState?: any,
    setValue?: (e:any) => void,
    value?: any,
    id: string,
    title?: string,
    icon?: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
    tooltipContent?: any,
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
export interface ImageSetPopoverProps extends PostPopoverProps {
    children: ReactNode,
    setImage: (photo: string | undefined) => void | React.Dispatch<React.SetStateAction<string | undefined>>,
    setImageFile: React.Dispatch<React.SetStateAction<File>>,
    setNoImageFile: React.Dispatch<React.SetStateAction<undefined>>,
    setNewImagePath: React.Dispatch<React.SetStateAction<string | undefined>>,
    beforeImage?: string,
    isBgMocked?: boolean
}

export interface GlassTagListProps extends FlexProps {
    tags: Array<Tag | undefined> | Array<TagEditing>,
    colorList: Array<string>,
    onDeleteClick?: (e:any) => void,
    isDeletable?: boolean,
}

export interface NeumTagListProps extends FlexProps {
    tags: Array<Tag | undefined>,
    colorList: Array<string>,
    onDeleteClick?: (e:any) => void,
    isDeletable?: boolean,
}

export interface LinkSelectBoardProps extends MenuProps {
    collections?: Collection[],
    title: string,
    handleClick?: (e: any) =>any,
}

export interface CollectionItemModalProps extends BoxProps {
    collection: Collection,
}

export type LinkAnalyzeStepType = {
    url_all: string,
    url_scheme: string,
    query: string | null,
    joint: string,
    other_queries_array: string[] | null,
    is_path_search: boolean,
}

export interface AddPostSelectMenuProps extends MenuProps {

}

export interface TipsyPostsDisplayProps {
    displayPosts: Post[],
    // setDisplayPosts: Dispatch<SetStateAction<Post[]>>,
    allPostsCount: number,
    handleFetchMore?: any,
    loading: boolean,
    error: Error | undefined,
    not_found_message?: string,
}