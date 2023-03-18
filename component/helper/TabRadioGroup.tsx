import { Box } from "@chakra-ui/react"
import { useState } from "react"
import { TabGroupProps } from "../../type/helper"
import { useNeumorphismColorMode } from "../../util/hook/useColor"
import { SwitchButtonTab } from "../atom/buttons"

export const TabRadioGroup = ({options, getValue, defValue, space, Hcolor, Acolor, fs, br=20, w, h, m=5, p, brCh=10, wCh=200, hCh}: TabGroupProps) => {
    const [selected, setSelected] = useState(defValue)
    const handleClick = (e: any) => {
        const value = e.target.id
        setSelected(value)
        getValue(value)
    }
    const { highlight, shadow } = useNeumorphismColorMode()
    return (
        <Box
        m={m} p={p} w={w} h={h}
        borderRadius={br}
        display="flex" justifyContent={"center"} alignItems={"center"}
        boxShadow={`5px 5px 15px ${shadow}, -5px -5px 15px ${highlight};`}
        >
            { options.map((name: string) => {
                return (
                    <SwitchButtonTab 
                    selectedValue={selected} 
                    onClick={handleClick} 
                    Hcolor={Hcolor} Acolor={Acolor} fs={fs}
                    br={brCh} w={wCh} h={hCh} p={"0 3px"} m={1} >
                        {name}
                    </SwitchButtonTab>
                )
            }) }
        </Box>
    )
}