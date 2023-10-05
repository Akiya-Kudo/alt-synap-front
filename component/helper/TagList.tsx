import { color, Flex } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { GlassTagListProps, NeumTagListProps } from "../../type/helper"
import { useColorOrderPick, useColorRandomPick } from "../../util/hook/useColor"
import { GlassTag, GlassTag_edit, NeumTag } from "../atom/tags"
import NextLink from 'next/link'
import { useRouter } from "next/router"

export const GlassTagList = ({
    tags,
    colorList,
    flexWrap="wrap", justify="center",
    onDeleteClick,
    isDeletable,
    ...props
}:GlassTagListProps) => {
    
    let tags_conponents = [<></>]
    if (onDeleteClick && isDeletable) {
        const handleClick_delete = (id:number) => {
            if (onDeleteClick && isDeletable) onDeleteClick(id)
            const deletedColor = colorList.splice(id,1)
            colorList.push(deletedColor[0])
        }
        tags_conponents = tags.map((tag, index)=> {
            let color_theme = colorList[index].split("_")[0]
            return (
                <GlassTag_edit 
                key={index} id={index.toString()}
                border="none"
                colorScheme={color_theme}
                onClick={handleClick_delete}
                >
                    {tag?.tag_name}
                </GlassTag_edit>
            )})
    }
    // 削除機能がいらない場合
    if (!isDeletable) {
        tags_conponents = tags.map((tag, index)=> {
            let color_theme = colorList[index].split("_")[0]
            return (
                <GlassTag 
                key={index} id={index.toString()}
                border="none"
                colorScheme={color_theme}
                >
                    {tag?.tag_name}
                </GlassTag>
            )})
    }
    return (
        <Flex
        {...props}
        flexWrap={flexWrap} justify={justify}
        >
            { tags_conponents }
        </Flex>
    )
}

export const NeumTagList = ({
    tags,
    colorList,
    flexWrap="wrap",
    onDeleteClick,
    isDeletable,
    ...props
}:NeumTagListProps) => {
    const router = useRouter()
    let tags_conponents = [<></>]
    //削除可能なtagのリストが必要な時 ( onDeleteClick と isDeletable　　のpropsが必要 ) onDeleteClickで親コンポーネントで引数のidを使用して処理を実装する
    if (onDeleteClick && isDeletable) {
        const handleClick_delete = (id:number) => {
            if (onDeleteClick && isDeletable) onDeleteClick(id)
            const deletedColor = colorList.splice(id,1)
            colorList.push(deletedColor[0])
        }
        tags_conponents = tags.map((tag, index)=> {
            let color_theme = colorList[index].split("_")[0]
            return (
                <GlassTag_edit 
                key={index} id={index.toString()}
                border="none"
                colorScheme={color_theme}
                onClick={handleClick_delete}
                >
                    {tag?.display_name}
                </GlassTag_edit>
            )
        })
    }
    // 削除機能がいらない場合
    if (!isDeletable) {
        tags_conponents = tags.map((tag, index)=> {
            let color_theme = colorList[index].split("_")[0]
            return (
                    <NeumTag
                    id={tag?.tid.toString()} key={tag?.tid}
                    display_name={tag?.display_name}
                    tag_image={tag?.tag_image && tag.tag_image}
                    colorScheme={color_theme}
                    size={"sm"} cursor={"pointer"}
                    onClick={() => { router.push("/topics/" + tag?.tid) }}
                    />
            )
        })
    }
    return (
        <Flex
        {...props}
        flexWrap={flexWrap}
        >
            { tags_conponents }
        </Flex>
    )
}