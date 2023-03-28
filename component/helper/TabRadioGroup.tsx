import { Box } from "@chakra-ui/react"
import { useState } from "react"
import { MyTabGroupProps } from "../../type/helper"
import { useNeumorphismColorMode } from "../../util/hook/useColor"
import { SwitchButton_tab } from "../atom/buttons"

export const TabButtonSelectGroup = ({
    options, onChange, defaultValue, 
    borderRadius=20, 
    display="flex", justifyContent="center", alignItems="center",
    Hcolor="red_switch", Acolor="red.600", 
    chBorderRadius=10, chW=200, chH, chP="0 3px", chM=1, fontSize=15, 
    ...props
}: MyTabGroupProps) => {
    const [selected, setSelected] = useState(defaultValue)
    const handleClick = (e: any) => {
        setSelected(e.target.id)
        onChange(e.target.id)
    }
    const { highlight, shadow } = useNeumorphismColorMode()
    return (
        <Box
        {...props}
        borderRadius={borderRadius}
        display={display} justifyContent={justifyContent} alignItems={alignItems}
        boxShadow={`5px 5px 15px ${shadow}, -5px -5px 15px ${highlight};`}
        >
            { options.map((name: string) => {
                return (
                    <SwitchButton_tab
                    id={name}
                    selectedValue={selected} onClick={handleClick} 
                    Hcolor={Hcolor} Acolor={Acolor} 
                    borderRadius={chBorderRadius} w={chW} h={chH} fontSize={fontSize}
                    p={chP} m={chM}
                    >
                        {name}
                    </SwitchButton_tab>
                )
            }) }
        </Box>
    )
}