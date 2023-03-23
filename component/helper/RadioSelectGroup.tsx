import { Heading, RadioGroup, Stack } from "@chakra-ui/react"
import { MyRadioSelectGroupProps } from "../../type/helper"
import { useColorOrderPick, useColorRandomPick } from "../../util/hook/useColor"
import { BasicRadio } from "../atom/radios"

export const RadioSelectGroup = ({
    options, 
    children, titleSize="1.5rem", titleM, titleP,
    colorPicks, colorRandom,  
    direction="column", spacing,
    ...props
} : MyRadioSelectGroupProps) => {
    let colors: string[] = []
    if (colorRandom) colors = useColorRandomPick(colorPicks, options.length)
    else colors = useColorOrderPick( colorPicks, options.length)
    return (
        <RadioGroup {...props}>
            <Heading 
            fontSize={titleSize} 
            m={titleM} 
            p={titleP}
            >
                {children}
            </Heading>
            <Stack direction={direction} spacing={spacing}>
                {options.map(
                    (value: string, index: number) => {
                        return (
                            <BasicRadio 
                            value={value} 
                            key={index}
                            Rcolor={colors[index]} 
                            >
                                {value}
                            </BasicRadio>
                        )
                    }
                )}
            </Stack>
        </RadioGroup>
    )
}