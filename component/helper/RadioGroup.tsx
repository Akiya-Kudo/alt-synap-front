import { RadioGroup, Stack } from "@chakra-ui/react"
import { RadioGroupProps } from "../../type/helper"
import { useColorOrderPick, useColorRandomPick } from "../../util/hook/useColor"
import { BasicRadio } from "../atom/radios"

export const RadioSelecterGroup = ({ getValue, options, defValue, colorScheme, colorRandom, direction="column", m, space, size} : RadioGroupProps) => {
    const handleChange = (e: any) => getValue(e)

    let colors: string[] = []
    if (colorRandom) colors = useColorRandomPick(colorScheme, options.length)
    else colors = useColorOrderPick( colorScheme, options.length)

    return (
        <RadioGroup onChange={handleChange} defaultValue={defValue}>
            <Stack direction={direction} spacing={space} m={m}>
                {options.map((value: string, index: number) => {
                    return (
                        <BasicRadio size={size} color={colors[index]} value={value} key={index}>{value}</BasicRadio>
                    )
                })}
            </Stack>
        </RadioGroup>
    )
}