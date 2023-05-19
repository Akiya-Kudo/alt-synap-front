import { color, Flex } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { TagListProps } from "../../type/helper"
import { useColorRandomPick } from "../../util/hook/useColor"
import { GlassTag_edit } from "../atom/tags"

export const TagList = ({
    tag_names,
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
            {tag_names.map((name, index)=> {
                let color_theme = colorList[index].split("_")[0]
                return (
                    <GlassTag_edit 
                    key={index} id={index.toString()}
                    border="none"
                    colorScheme={color_theme}
                    onClick={handleClick_delete}
                    >
                        {name}
                    </GlassTag_edit>
                )
            })}
        </Flex>
    )
}