import { BoxProps, Button, filter, Flex, forwardRef, IconButton, IconButtonProps, useBreakpointValue, useColorMode } from "@chakra-ui/react";
import { ReactNode, useContext, useEffect, useState } from "react";
import { NeumButtonProps, GlassButtonProps, GlassColorModeButtonProps, NeumSwitchButtonTabProps, NeumIconButtonProps, GlassIconButtonProps, GlassSwitchButtonProps, NeumButtonPropsFlat, NeumButtonNumberFontSizeProps } from "../../type/atom";
import { useNeumorphismColorMode } from "../../util/hook/useColor";
import { CiSun, CiCloudMoon } from 'react-icons/ci';
import { useNeumStyle_dent, useNeumStyle_curve, useNeumStyle_flat } from "../../util/hook/useTheme";
import { AuthContext } from "../../util/hook/authContext";

export const ClickButton = ({
    fontSize=[10, 14, 18, 22, 30, 40], color="text_normal", borderRadius="full", bg="transparent",
    Hcolor="red_switch",Acolor="red.600", isDisabled=false,
    ...props
}: NeumButtonNumberFontSizeProps) => {
    const fontSize_bp = useBreakpointValue([...fontSize]);
    const { highlight, shadow } = useNeumorphismColorMode()
    return (
        <Button
        {...props}
        borderRadius={borderRadius} color={color} bg={bg} fontSize={fontSize} isDisabled={isDisabled}
        boxShadow={`15px 15px 30px ${shadow},-15px -15px 30px ${highlight};`}
        _hover={{
            boxShadow: `5px 5px 15px ${shadow},-5px -5px 15px ${highlight};`, 
            color: Hcolor,
            fontSize: fontSize_bp ? fontSize_bp / 1.02 : 20 / 1.02,
        }}
        _active={{
            boxShadow: `5px 5px 15px ${shadow},-5px -5px 15px ${highlight}, inset 5px 5px 15px -3px ${shadow}, inset -5px -5px 15px -3px ${highlight};`,
            color: Acolor,
        }}
        _disabled={{
            boxShadow: `5px 5px 15px ${shadow},-5px -5px 15px ${highlight};`, 
            color: "text_very_light"
        }}
        />
    )
}

export const ClickButtonFlat = ({
    fontSize=20, color="text_normal", borderRadius="full", bg="transparent",
    Hcolor="red_switch",Acolor="red.600", isDisabled,
    ...props
}: NeumButtonPropsFlat) => {
    const { highlight, shadow } = useNeumorphismColorMode()
    return (
        <Button
        {...props}
        borderRadius={borderRadius} color={color} bg={bg} fontSize={fontSize} 
        boxShadow={`inset 1px 1px 3px -1px ${shadow}, inset -1px -1px 3px -1px ${highlight};`}
        _hover={{
            boxShadow: `inset 4px 4px 6px -4px ${shadow}, inset -4px -4px 6px -4px ${highlight};`, 
            color: Hcolor,
            fontSize: fontSize / 1.02,
        }}
        _active={{
            boxShadow: `inset 8px 8px 10px -5px ${shadow}, inset -8px -8px 10px -5px ${highlight};`,
            color:  Acolor,
        }}
        />
    )
}

export const ClickButton_submit = ({
    fontSize=[10, 14, 18, 22, 30, 40], color="text_normal", borderRadius="full", bg="transparent",
    Hcolor="red_switch",Acolor="red.600", formState,
    ...props
}: NeumButtonNumberFontSizeProps) => {
    const fontSize_bp = useBreakpointValue([...fontSize]);
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
            fontSize: fontSize_bp ? fontSize_bp / 1.02 : 20 / 1.02,
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
    getState=()=>undefined,
    fontSize=[10, 14, 18, 22, 30, 40], color="text_normal", borderRadius="full", bg="transparent",
    Hcolor="red_switch", Acolor="red.600", defaultChecked=false, Scolor="red.600",
    children, Schildren, ActiveDisabled=false,
    ...props
}: NeumButtonNumberFontSizeProps) => {
    const [active, setActive] = useState<boolean>(defaultChecked);
    
    const handleClick = (e: any) => {
        onClick(e)
        if (!ActiveDisabled) {
            setActive(!active)
            getState(!active)
        }
    }
    
    const fontSize_bp = useBreakpointValue([...fontSize]);
    const { highlight, shadow } = useNeumorphismColorMode()
    const neumState = active ? `inset 5px 5px 15px -3px ${shadow}, inset -5px -5px 15px -3px ${highlight},15px 15px 30px ${shadow},-15px -15px 30px ${highlight};` :  `15px 15px 30px ${shadow},-15px -15px 30px ${highlight};`;
    const neumHover = active ? `inset 10px 10px 20px -3px ${shadow}, inset -10px -10px 20px -3px ${highlight},5px 5px 15px ${shadow},-5px -5px 15px ${highlight};` : `5px 5px 15px ${shadow},-5px -5px 15px ${highlight};`;
    const switchColor = active ? Scolor : color
    const switchChildren = active ? Schildren : children

    useEffect(() => {setActive(defaultChecked)},[defaultChecked])
    return (
        <Button
        {...props}
        onClick={ handleClick } 
        fontSize={fontSize} color={switchColor} bg={bg} borderRadius={borderRadius}
        boxShadow={neumState}
        _hover={{
            boxShadow: neumHover, 
            color: Hcolor,
            fontSize: fontSize_bp ? fontSize_bp / 1.02 : 20 / 1.02
        }}
        _active={{
            boxShadow: `5px 5px 15px ${shadow},-5px -5px 15px ${highlight}, inset 10px 10px 20px -3px ${shadow}, inset -10px -10px 20px -3px ${highlight};`,
            color: Acolor,
        }}
        >
            { Schildren ? switchChildren : children }
        </Button>
    )
}

export const SwitchButtonConcave = ({
    onClick=()=>undefined,
    fontSize=[10, 14, 18, 22, 30, 40], color="text_normal", borderRadius="full", bg="transparent",
    Hcolor="red_switch", Acolor="red.600", bgGradient, HbgGradient, Ashadow=true,
    ...props
}: NeumButtonNumberFontSizeProps) => {
    const [active, setActive] = useState(false);

    const handleClick = (e: any) => {
        setActive(!active)
        onClick(e)
    }
    
    const fontSize_bp = useBreakpointValue([...fontSize]);
    const { highlight, shadow } = useNeumorphismColorMode()
    const neumState = active ? `inset 5px 5px 15px -3px ${shadow}, inset -5px -5px 15px -3px ${highlight};` :  `3px 3px 10px ${shadow},-3px -3px 10px ${highlight};`;
    const neumHover = active ? `inset 10px 10px 20px -3px ${shadow}, inset -10px -10px 20px -3px ${highlight};` : `1px 1px 5px ${shadow},-1px -1px 5px ${highlight};`;
    return (
        <Button
        {...props}
        onClick={ handleClick } 
        fontSize={fontSize} color={color} bg={bg} borderRadius={borderRadius}
        boxShadow={neumState} bgGradient={bgGradient}
        _hover={{
            boxShadow: neumHover, 
            color: Hcolor,
            fontSize: fontSize_bp ? fontSize_bp / 1.02 : 20 / 1.02,
            bgGradient: HbgGradient
        }}
        _active={{
            boxShadow: Ashadow ? `inset 10px 10px 20px -3px ${shadow}, inset -10px -10px 20px -3px ${highlight};` : undefined,
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
    color="text_normal", bg="transparent",
    Hcolor="red_switch", Acolor="red.600",
    ...props
}: NeumSwitchButtonTabProps) => {
    const [active, setActive] = useState(false);

    const handleClick = (e: any) => {
        if (selectedValue!=children) {
            setActive(!active)
            onClick(e)
        }
    }

    useEffect(() => {
        if (selectedValue!=children) setActive(false)
        if (selectedValue==children) setActive(true)
    },[selectedValue])

    const color_switch = active ? Hcolor : color
    const { highlight, shadow } = useNeumorphismColorMode()
    const neumState = active ? `inset 5px 5px 10px -5px ${shadow}, inset -5px -5px 10px -5px ${highlight};` :  ``;
    const neumHover = 
        selectedValue!=children ?
            active ? 
            `inset 7px 7px 13px -5px ${shadow}, inset -7px -7px 15px -5px ${highlight};` 
            : `inset 2px 2px 5px -2px ${shadow}, inset -2px -2px 5px -2px ${highlight};` 
        : undefined;

    return (
        <Button
        {...props}
        onClick={ handleClick }
        id={id} children={children}
        color={color_switch} bg={bg}
        boxShadow={neumState}
        _hover={{
            boxShadow: neumHover, 
            color: Hcolor,
        }}
        _active={{
            boxShadow: selectedValue!=children && `inset 8px 8px 15px -5px ${shadow}, inset -8px -8px 15px -5px ${highlight};`,
            color: selectedValue!=children && Acolor,
        }}
        />
    )
}

//ref参照のためforwardRefで定義する
export const NeumIconButton = ({
        neumH="shallow",
        color="text_normal", 
        borderRadius="full",
        ...props
    }) => {
    const { curve_sm, curve_sm_shallow, curve_sm_tall } = useNeumStyle_curve()
    const {dent_sm} = useNeumStyle_dent()
    const {flat_sm } = useNeumStyle_flat()
    const neumBS = neumH=="shallow" ? curve_sm : flat_sm 
    return (
        <IconButton
        {...props}
        color={color} aria-label={"neum_icon_button"}
        borderRadius={borderRadius}
        boxShadow={ neumBS }
        _hover={{boxShadow: curve_sm_shallow}}
        _active={{boxShadow: dent_sm}}
        />
    )
}
// //ref参照のためforwardRefで定義する
// export const NeumIconButton = forwardRef<NeumIconButtonProps, "button">(
//     function NeumIconButton ({
//         neumH="shallow",
//         color="text_normal", 
//         borderRadius="full",
//         ...props
//     }, ref) {
//         const { curve_sm, curve_sm_shallow, curve_sm_tall } = useNeumStyle_curve()
//         const {dent_sm} = useNeumStyle_dent()
//         const {flat_sm } = useNeumStyle_flat()
//         const neumBS = neumH=="shallow" ? curve_sm : flat_sm 
//         return (
//             <IconButton
//             {...props}
//             color={color}
//             borderRadius={borderRadius}
//             boxShadow={ neumBS }
//             _hover={{boxShadow: curve_sm_shallow}}
//             _active={{boxShadow: dent_sm}}
//             ref={ref}
//             />
//         )
//     }
// )

export const GlassButton = ({
    color="text_normal", borderRadius="full", bg="transparent", bgGradient,
    ...props
}: GlassButtonProps) => {
    return (
        <Button
        {...props}
        color={color} bg={bg} borderRadius={borderRadius} bgGradient={bgGradient}
        />
    )
}

export const GlassSwitchButton = ({
    getState=()=>undefined, defStateValue,
    onClick=()=>undefined,
    color="text_normal", borderRadius="full", bg="transparent", bgGradient, children,
    Hcolor="red_switch", SHcolor="bg_switch",
    Acolor="red.600", SBgGradient, SHBgGradient, Scolor, Schildren,
    ...props
}: GlassSwitchButtonProps) => {
    const [active, setActive] = useState(defStateValue);

    const handleClick = (e: any) => {
        setActive(!active)
        onClick(e)
        getState(!active)
    }
    useEffect(() => {setActive(defStateValue)},[defStateValue])

    const bgGradientSwitch = active ? SBgGradient : bgGradient
    const colorSwitch = active ? Scolor : color
    const childrenSwitch = active && Schildren ? Schildren : children
    const SHBgGradientSwitch = active ? SHBgGradient : bgGradient
    const SHcolorSwitch = active ? SHcolor : Hcolor
    return (
        <Button
        {...props}
        onClick={handleClick}
        color={colorSwitch} bg={bg} borderRadius={borderRadius} bgGradient={bgGradientSwitch}
        _hover={{
            color: SHcolorSwitch,
            bgGradient: SHBgGradientSwitch,
        }}
        _active={{
            color: Acolor,
        }}
        >{childrenSwitch}</Button>
    )
}

export const GlassIconButton = ({
    color="text_normal", borderRadius="full",
    ...props
}: GlassIconButtonProps) => {
    return (
        <IconButton
        {...props}
        color={color}
        borderRadius={borderRadius}
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
    fontSize="1em", color="tipsy_color_3", 
    borderRadius="full", bg="transparent", p=0,variant='outline',
    ...props
}: GlassColorModeButtonProps) => {
    const { toggleColorMode, colorMode } = useColorMode()
    const [buttonIcon, setButtonIcon] = useState<ReactNode | null>(null);  // add state for the button icon
    
    useEffect(() => // set the icon in useEffect, which runs after component mount on client side
        setButtonIcon(colorMode === "dark" ? <CiSun size={"1.5rem"} /> : <CiCloudMoon size={"1.5rem"} />)
    , [colorMode]);  // dependency on colorMode so it updates when colorMode changes

    return (
        <Button
        {...props}
        onClick={toggleColorMode}
        fontSize={fontSize} color={color} bg={bg} borderRadius={borderRadius} variant={variant}
        p={0}
        >
            {/* {colorMode && colorMode === "dark" ? <CiSun size={"1.5rem"}/> : colorMode === "light" ? <CiCloudMoon size={"1.5rem"}/> : null } */}
            {buttonIcon}
        </Button>
    )
}