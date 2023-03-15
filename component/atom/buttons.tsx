import { Box, Button, useColorModeValue, useRadio, UseRadioProps } from "@chakra-ui/react";
import { useState } from "react";
import { ButtonProps } from "../../type/atom";
import { useNeumorphismColorMode } from "../../util/hook/useColor";


export const ClickButton = ({
    onClick = () => null, children, fs=20, fw="normal", color="text_normal", 
    Hcolor="red_switch",Acolor="red.600", br="full", bg="transparent", bgg, w, h, m, p
}: ButtonProps) => {
    const { highlight, shadow } = useNeumorphismColorMode()
    return (
        <Button
        onClick={ onClick }
        fontSize={fs} fontWeight={fw} color={color} bg={bg}
        bgGradient={bgg} borderRadius={br} h={h} w={w} m={m} p={p}
        boxShadow={`15px 15px 30px ${shadow},-15px -15px 30px ${highlight};`}
        _hover={{
            boxShadow: `5px 5px 15px ${shadow},-5px -5px 15px ${highlight};`, 
            color: Hcolor,
            fontSize: fs / 1.05,
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

export const SwitchButton = ({
    onClick = () => null, children, fs=20, fw="normal", color="text_normal", 
    Hcolor="red_switch", Acolor="red.600", br="full", bg="transparent", bgg, w, h, m, p
}: ButtonProps) => {
    const [active, setActive] = useState(false);
    const handleClick = (e: any) => {
        setActive(!active)
        onClick(e)
    }

    const { highlight, shadow } = useNeumorphismColorMode()
    const switch_shadow_by_state = active ? `inset 5px 5px 15px -3px ${shadow}, inset -5px -5px 15px -3px ${highlight},15px 15px 30px ${shadow},-15px -15px 30px ${highlight};` :  `15px 15px 30px ${shadow},-15px -15px 30px ${highlight};`;
    const switch_hover_shadow = active ? `inset 10px 10px 20px -3px ${shadow}, inset -10px -10px 20px -3px ${highlight},5px 5px 15px ${shadow},-5px -5px 15px ${highlight};` : `5px 5px 15px ${shadow},-5px -5px 15px ${highlight};`;
    return (
        <Button
        onClick={ handleClick } fontSize={fs} fontWeight={fw} color={color} 
        bg={bg} bgGradient={bgg} borderRadius={br} h={h} w={w} m={m} p={p}
        boxShadow={switch_shadow_by_state}
        _hover={{
            boxShadow: switch_hover_shadow, 
            color: Hcolor,
            fontSize: fs / 1.05
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

export const SwitchButton_type2 = ({
    onClick = () => null, children, fs=20, fw="normal", color="text_normal", 
    Hcolor="red_switch", Acolor="red.600", br="full", bg="transparent", bgg, w, h, m, p
}: ButtonProps) => {
    const [active, setActive] = useState(false);
    const handleClick = (e: any) => {
        setActive(!active)
        onClick(e)
    }

    const { highlight, shadow } = useNeumorphismColorMode()
    const switch_shadow_by_state = active ? `inset 5px 5px 15px -3px ${shadow}, inset -5px -5px 15px -3px ${highlight};` :  `15px 15px 30px ${shadow},-15px -15px 30px ${highlight};`;
    const switch_hover_shadow = active ? `inset 10px 10px 20px -3px ${shadow}, inset -10px -10px 20px -3px ${highlight};` : `5px 5px 15px ${shadow},-5px -5px 15px ${highlight};`;
    return (
        <Button
        onClick={ handleClick } fontSize={fs} fontWeight={fw} color={color} 
        bg={bg} bgGradient={bgg} borderRadius={br} h={h} w={w} m={m} p={p}
        boxShadow={switch_shadow_by_state}
        _hover={{
            boxShadow: switch_hover_shadow, 
            color: Hcolor,
            fontSize: fs / 1.05
        }}
        _active={{
            boxShadow: `inset 10px 10px 20px -3px ${shadow}, inset -10px -10px 20px -3px ${highlight};`,
            color: Acolor,
        }}
        >
            {children}
        </Button>
    )
}