import { Box, Button, useColorModeValue, useRadio, UseRadioProps } from "@chakra-ui/react";
import { useState } from "react";
import { ButtonProps } from "../../type/atom";


export const ClickButton = ({onClick = () => null, children, fs="1rem", fw="normal", color="text_normal", Hcolor="red_switch",Acolor="red.600", br="full", bg="transparent", bgg, w, h, m, p}: ButtonProps) => {
    const highlight = useColorModeValue("var(--chakra-colors-tipsy_light-200)", "var(--chakra-colors-tipsy_dark-200)")
    const shadow = useColorModeValue("var(--chakra-colors-tipsy_light-300)", "var(--chakra-colors-tipsy_dark-300)")
    return (
        <Button
        onClick={ onClick }
        fontSize={fs}
        fontWeight={fw}
        color={color} 
        bg={bg} bgGradient={bgg}
        borderRadius={br} 
        h={h} w={w} m={m} p={p}
        boxShadow={`15px 15px 30px ${shadow},-15px -15px 30px ${highlight};`}
        _hover={{
            boxShadow: `5px 5px 15px ${shadow},-5px -5px 15px ${highlight};`, 
            color: Hcolor 
        }}
        _active={{
            boxShadow: `5px 5px 15px ${shadow},-5px -5px 15px ${highlight}, inset 5px 5px 15px -3px ${shadow}, inset -5px -5px 15px -3px ${highlight};`,
            color: Acolor,
        }}
        >
            {children}
        </Button>
    )
}

export const SwitchButton = ({onClick = () => null, children, fs="1rem", fw="normal", color="text_normal", Hcolor="red_switch", Acolor="red.600", br="full", bg="transparent", bgg, w, h, m, p}: ButtonProps) => {
    const [active, setActive] = useState(false);
    const highlight = useColorModeValue("var(--chakra-colors-tipsy_light-200)", "var(--chakra-colors-tipsy_dark-200)")
    const shadow = useColorModeValue("var(--chakra-colors-tipsy_light-300)", "var(--chakra-colors-tipsy_dark-300)")
    const switch_shadow = active ? `15px 15px 30px ${shadow},-15px -15px 30px ${highlight};` : `inset 5px 5px 15px -3px ${shadow}, inset -5px -5px 15px -3px ${highlight},15px 15px 30px ${shadow},-15px -15px 30px ${highlight};`
    const switch_hover_shadow = active ? `5px 5px 15px ${shadow},-5px -5px 15px ${highlight};` : `inset 10px 10px 20px -3px ${shadow}, inset -10px -10px 20px -3px ${highlight},5px 5px 15px ${shadow},-5px -5px 15px ${highlight};`
    const handleClick = (e: any) => {
        setActive(!active)
        onClick(e)
    }
    return (
        <Button
        onClick={ handleClick }
        fontSize={fs}
        fontWeight={fw}
        color={color}
        bg={bg} bgGradient={bgg}
        borderRadius={br} 
        h={h} w={w} m={m} p={p}
        boxShadow={switch_shadow}
        _hover={{
            boxShadow: switch_hover_shadow, 
            color: Hcolor 
        }}
        _active={{
            boxShadow: `5px 5px 15px ${shadow},-5px -5px 15px ${highlight}, inset 10px 10px 20px -3px ${shadow}, inset -10px -10px 20px -3px ${highlight};`,
            color: Acolor,
        }}
        >
            {children}
        </Button>
    )
}