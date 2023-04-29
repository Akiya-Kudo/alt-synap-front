import { color, Flex } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { TagListProps } from "../../type/helper"
import { useColorRandomPick } from "../../util/hook/useColor"
import { GlassTag_edit } from "../atom/tags"

export const TagList = ({
    tags,
    colors,
    flexWrap="wrap",
    onDeleteClick,
    ...props
}:TagListProps) => {
    const [colorList, setColorList] = useState<Array<string>>(useColorRandomPick(colors, 5))
    const handleClick_delete = (id:number) => {
        onDeleteClick(id)
        const deletedColor = colorList.splice(id,1)
        colorList.push(deletedColor[0])
    }
    return (
        <Flex
        {...props}
        flexWrap={flexWrap}
        justify="center"
        >
            {tags.map((name, index)=> (
                <GlassTag_edit 
                key={index} id={index.toString()}
                Tcolor={colorList[index]} 
                onClick={handleClick_delete}
                >
                    {name}
                </GlassTag_edit>
            ))}
        </Flex>
    )
}