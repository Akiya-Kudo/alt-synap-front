import { Box } from "@chakra-ui/react"
import { Children, useEffect, useState } from "react"
import { MyTabGroupProps, SwitchGroupProps } from "../../type/helper"
import { useNeumorphismColorMode } from "../../util/hook/useColor"
import { TabBord } from "../atom/bords"
import { SwitchButton_tab } from "../atom/buttons"

export const TabButtonSelectGroup = ({
    options, onChange, defaultValue, 
    borderRadius=20, 
    display="flex", justifyContent="center", alignItems="center",
    Hcolor="red_switch", Acolor="red.600", 
    chBorderRadius=10, chW=200, chH, chP="0 3px", chM=1, fontSize=[15], 
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
            { options.map((name: string, index: number) => {
                return (
                    <SwitchButton_tab
                    id={name} key={name}
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

export const TabSwitchGroup = (
    {
        optionLeft, optionRight, onChange, defaultValue, 
        chH=7, chFontSize=[12],
        ...props
    }: SwitchGroupProps
) => {
    const [selected, setSelected] = useState(defaultValue)
    const handleClick = (e: any) => {
        setSelected(e.target.id)
        onChange(e.target.id)
    }
    return (
        <>
            <TabBord
            {...props}
            >
                <SwitchButton_tab 
                id={optionLeft}
                fontSize={chFontSize} height={chH}
                borderLeftRadius={"full"}
                selectedValue={selected} onClick={handleClick} 
                Hcolor={"tipsy_color_2"}
                Acolor={"tipsy_color_active_2"}
                >
                    { optionLeft }
                </SwitchButton_tab>
                <SwitchButton_tab 
                id={optionRight}
                fontSize={chFontSize} height={chH}
                borderRightRadius={"full"}
                selectedValue={selected} onClick={handleClick} 
                Hcolor={"tipsy_color_2"}
                Acolor={"tipsy_color_active_2"}
                >
                    { optionRight }
                </SwitchButton_tab>
            </TabBord>
        </>
    )
}

export const TabSwitchGroup_3 = (
    {
        optionLeft, optionRight, optionCenter="center_button",
        onChange, defaultValue, 
        chH=7, chFontSize=[12],
        isDisabledLeft, isDisabledRight, isDisabledCenter,
        children,
        ...props
    }: SwitchGroupProps
) => {
    const [selected, setSelected] = useState(defaultValue)
    const handleClick = (e: any) => {
        setSelected(e.target.id)
        onChange(e.target.id)
    }
    return (
        <>
            <TabBord
            {...props}
            >
                <SwitchButton_tab 
                id={optionLeft}
                fontSize={chFontSize} height={chH}
                borderLeftRadius={"full"}
                selectedValue={selected} onClick={handleClick} 
                Hcolor={"tipsy_color_2"}
                Acolor={"tipsy_color_active_2"}
                isDisabled={isDisabledLeft}
                >
                    { optionLeft }
                </SwitchButton_tab>
                <SwitchButton_tab 
                id={optionCenter}
                borderRadius={0}
                fontSize={chFontSize} height={chH}
                selectedValue={selected} onClick={handleClick} 
                Hcolor={"tipsy_color_2"}
                Acolor={"tipsy_color_active_2"}
                isDisabled={isDisabledCenter}
                >
                    { optionCenter }
                </SwitchButton_tab>
                <SwitchButton_tab 
                id={optionRight}
                fontSize={chFontSize} height={chH}
                borderRightRadius={"full"}
                selectedValue={selected} onClick={handleClick} 
                Hcolor={"tipsy_color_2"}
                Acolor={"tipsy_color_active_2"}
                isDisabled={isDisabledRight}
                >
                    { optionRight }
                </SwitchButton_tab>
                {children}
            </TabBord>
        </>
    )
}