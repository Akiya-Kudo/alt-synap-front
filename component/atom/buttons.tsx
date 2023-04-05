import { BoxProps, Button, filter, Flex, useColorMode } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { NeumButtonProps, GlassButtonProps, GlassColorModeButtonProps, NeumSwitchButtonTabProps } from "../../type/atom";
import { useNeumorphismColorMode } from "../../util/hook/useColor";
import { CiSun, CiCloudMoon } from 'react-icons/ci';

export const ClickButton = ({
    fontSize=20, color="text_normal", borderRadius="full", bg="transparent",
    Hcolor="red_switch",Acolor="red.600", isDisabled,
    ...props
}: NeumButtonProps) => {
    const { highlight, shadow } = useNeumorphismColorMode()
    return (
        <Button
        {...props}
        borderRadius={borderRadius} color={color} bg={bg} fontSize={fontSize} 
        boxShadow={`15px 15px 30px ${shadow},-15px -15px 30px ${highlight};`}
        _hover={{
            boxShadow: `5px 5px 15px ${shadow},-5px -5px 15px ${highlight};`, 
            color: Hcolor,
            fontSize: fontSize / 1.02,
        }}
        _active={{
            boxShadow: `5px 5px 15px ${shadow},-5px -5px 15px ${highlight}, inset 5px 5px 15px -3px ${shadow}, inset -5px -5px 15px -3px ${highlight};`,
            color: Acolor,
        }}
        _disabled={{
            color: "text_very_light"
        }}
        />
    )
}

export const ClickButton_submit = ({
    fontSize=20, color="text_normal", borderRadius="full", bg="transparent",
    Hcolor="red_switch",Acolor="red.600", formState,
    ...props
}: NeumButtonProps) => {
    const { highlight, shadow } = useNeumorphismColorMode()
    return (
        <Button
        {...props}
        disabled={!formState.isValid}
        isLoading={formState.isSubmitting}
        borderRadius={borderRadius} color={color} bg={bg} fontSize={fontSize} 
        boxShadow={`15px 15px 30px ${shadow},-15px -15px 30px ${highlight};`}
        _hover={{
            boxShadow: `5px 5px 15px ${shadow},-5px -5px 15px ${highlight};`, 
            color: Hcolor,
            fontSize: fontSize / 1.02,
        }}
        _active={{
            boxShadow: `5px 5px 15px ${shadow},-5px -5px 15px ${highlight}, inset 5px 5px 15px -3px ${shadow}, inset -5px -5px 15px -3px ${highlight};`,
            color: Acolor,
        }}
        _disabled={{
            boxShadow: `5px 5px 15px ${shadow},-5px -5px 15px ${highlight};`, 
            color: "text_very_light",
        }}
        />
    )
}

export const SwitchButton = ({
    onClick=()=>undefined,
    fontSize=20, color="text_normal", borderRadius="full", bg="transparent",
    Hcolor="red_switch", Acolor="red.600",
    ...props
}: NeumButtonProps) => {
    const [active, setActive] = useState(false);

    const handleClick = (e: any) => {
        setActive(!active)
        onClick(e)
    }

    const { highlight, shadow } = useNeumorphismColorMode()
    const neumState = active ? `inset 5px 5px 15px -3px ${shadow}, inset -5px -5px 15px -3px ${highlight},15px 15px 30px ${shadow},-15px -15px 30px ${highlight};` :  `15px 15px 30px ${shadow},-15px -15px 30px ${highlight};`;
    const neumHover = active ? `inset 10px 10px 20px -3px ${shadow}, inset -10px -10px 20px -3px ${highlight},5px 5px 15px ${shadow},-5px -5px 15px ${highlight};` : `5px 5px 15px ${shadow},-5px -5px 15px ${highlight};`;
    return (
        <Button
        {...props}
        onClick={ handleClick } 
        fontSize={fontSize} color={color} bg={bg} borderRadius={borderRadius}
        boxShadow={neumState}
        _hover={{
            boxShadow: neumHover, 
            color: Hcolor,
            fontSize: fontSize / 1.02
        }}
        _active={{
            boxShadow: `5px 5px 15px ${shadow},-5px -5px 15px ${highlight}, inset 10px 10px 20px -3px ${shadow}, inset -10px -10px 20px -3px ${highlight};`,
            color: Acolor,
        }}
        />
    )
}

export const SwitchButtonConcave = ({
    onClick=()=>undefined,
    fontSize=20, color="text_normal", borderRadius="full", bg="transparent",
    Hcolor="red_switch", Acolor="red.600", 
    ...props
}: NeumButtonProps) => {
    const [active, setActive] = useState(false);

    const handleClick = (e: any) => {
        setActive(!active)
        onClick(e)
    }

    const { highlight, shadow } = useNeumorphismColorMode()
    const neumState = active ? `inset 5px 5px 15px -3px ${shadow}, inset -5px -5px 15px -3px ${highlight};` :  `3px 3px 10px ${shadow},-3px -3px 10px ${highlight};`;
    const neumHover = active ? `inset 10px 10px 20px -3px ${shadow}, inset -10px -10px 20px -3px ${highlight};` : `1px 1px 5px ${shadow},-1px -1px 5px ${highlight};`;
    return (
        <Button
        {...props}
        onClick={ handleClick } 
        fontSize={fontSize} color={color} bg={bg} borderRadius={borderRadius}
        boxShadow={neumState}
        _hover={{
            boxShadow: neumHover, 
            color: Hcolor,
            fontSize: fontSize / 1.02
        }}
        _active={{
            boxShadow: `inset 10px 10px 20px -3px ${shadow}, inset -10px -10px 20px -3px ${highlight};`,
            color: Acolor,
        }}
        />
    )
}

// TabGroupで使用するボタン・親コンポーネントのstateを選択できる
export const SwitchButton_tab = ({
    onClick=()=>undefined, 
    selectedValue, 
    children, id,
    fontSize=20, color="text_normal", borderRadius="full", bg="transparent",
    Hcolor="red_switch", Acolor="red.600",
    ...props
}: NeumSwitchButtonTabProps) => {
    const [active, setActive] = useState(false);

    const handleClick = (e: any) => {
        setActive(!active)
        onClick(e)
    }

    useEffect(() => {
        if (selectedValue!=children) setActive(false)
        if (selectedValue==children) setActive(true)
    },[selectedValue])
    
    const color_switch = active ? Hcolor : color
    const { highlight, shadow } = useNeumorphismColorMode()
    const neumState = active ? `inset 5px 5px 10px -5px ${shadow}, inset -5px -5px 10px -5px ${highlight};` :  ``;
    const neumHover = active ? `inset 7px 7px 13px -5px ${shadow}, inset -7px -7px 15px -5px ${highlight};` : `inset 2px 2px 5px -2px ${shadow}, inset -2px -2px 5px -2px ${highlight};`;
    return (
        <Button
        {...props}
        onClick={ handleClick }
        id={id} children={children}
        fontSize={fontSize} color={color_switch} bg={bg} borderRadius={borderRadius}
        boxShadow={neumState}
        _hover={{
            boxShadow: neumHover, 
            color: Hcolor,
            fontSize: fontSize / 1.02,
        }}
        _active={{
            boxShadow: `inset 8px 8px 15px -5px ${shadow}, inset -8px -8px 15px -5px ${highlight};`,
            color: Acolor,
        }}
        />
    )
}

export const GlassButton = ({
    fontSize=20, color="text_normal", borderRadius="full", bg="transparent", bgGradient,
    ...props
}: GlassButtonProps) => {
    return (
        <Button
        {...props}
        fontSize={fontSize} color={color} bg={bg} borderRadius={borderRadius} bgGradient={bgGradient}
        />
    )
}


export const GlassButton_submit = ({ 
    fontSize=20, color="text_reverse", borderRadius="full", bg="transparent", bgGradient, formState,
    ...props
}: GlassButtonProps) => {
    return (
        <Button 
        type="submit"
        {...props}
        disabled={!formState.isValid}
        isLoading={formState.isSubmitting}
        bg={bg} borderRadius={borderRadius} color={color} fontSize={fontSize} bgGradient={bgGradient}
        />
    )
}


export const ColorModeButton = ({
    fontSize=20, color="tipsy_color_3", 
    borderRadius="full", bg="transparent", p=0,
    ...props
}: GlassColorModeButtonProps) => {
    const { toggleColorMode, colorMode } = useColorMode()
    return (
        <Button
        {...props}
        onClick={toggleColorMode}
        fontSize={fontSize} color={color} bg={bg} borderRadius={borderRadius} 
        p={0}
        >
            {colorMode=="light" ? <CiCloudMoon size={"1.5rem"}/> : <CiSun size={"1.5rem"}/>}
        </Button>
    )
}