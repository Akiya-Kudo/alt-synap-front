import { Box, Flex, FormControl, FormLabel, Switch, SwitchProps } from "@chakra-ui/react"
import { GlassSwitchProps, NeumSwitchProps } from "../../type/atom"
import { useNeumorphismColorMode } from "../../util/hook/useColor"

export const BasicSwitch = ({
    id, children,
    Scolor="blue_switch", lbFontSize,
    swM, swP, lbM, lbP, m, p,
    display="flex", alignItems="center", flexDirection="row",
    ...props
}: NeumSwitchProps) => {
    const { highlight, shadow, highlight_transparent, shadow_transparent } = useNeumorphismColorMode()
    const flexGrow = flexDirection=="row-reverse" ? 1 : 0;
    return (
        <FormControl display={display} alignItems={alignItems} flexDirection={flexDirection} m={m} p={p}>
            <Box flexGrow={flexGrow}></Box>
            <FormLabel htmlFor={id} mb={0} m={lbM} p={lbP} fontSize={lbFontSize}>
                { children }
            </FormLabel>
            <Switch
            {...props}
            id={id}
            m={swM} p={swP}
            sx={{
                //スイッチ内部の白いスイッチ
                ".chakra-switch__thumb": {
                    bg: "tipsy_light.100",
                    boxShadow: `2px 2px 4px ${shadow_transparent}, inset 3px 3px 7px -3px ${shadow_transparent}, inset -3px -3px 7px -3px #ffffff;`,
                },
                //スイッチの外部の背景
                ".chakra-switch__track": {
                    bg: "transparent",
                    boxShadow: `inset 4px 4px 10px -3px ${shadow}, inset -4px -4px 10px -3px ${highlight}, 3px 3px 15px -1px ${shadow}, -3px -3px 15px -1px ${highlight}`,
                },
                //スイッチの背景のはいけいのチェック時
                ".chakra-switch__track[data-checked]": {
                    bg: Scolor,
                    boxShadow: `inset 4px 4px 10px -3px ${shadow_transparent}, inset -4px -4px 10px -3px ${highlight_transparent}, 4px 4px 10px -3px ${shadow}, 4px 4px 10px -3px ${highlight}`,
                },
            }}
            />
        </FormControl>
    )
}

export const GlassSwitch = ({
    id, children,
    Scolor="blue_switch", SbgGradient,
    swM, swP, lbM, lbP, m, p, color,
    display="flex", alignItems="center", flexDirection="row", lbFontWeight, lbFontSize,
    ...props
}: GlassSwitchProps) => {
    const { highlight, shadow, highlight_transparent, shadow_transparent } = useNeumorphismColorMode()
    const flexGrow = flexDirection=="row-reverse" ? 1 : 0;
    return (
        <FormControl display={display} alignItems={alignItems} flexDirection={flexDirection} m={m} p={p} color={color}>
            <Box flexGrow={flexGrow}></Box>
            <FormLabel htmlFor={id} mb={0} m={lbM} p={lbP} fontSize={lbFontSize} fontWeight={lbFontWeight}>
                { children }
            </FormLabel>
            <Switch
            {...props}
            id={id}
            m={swM} p={swP}
            sx={{
                //スイッチ内部の白いスイッチ
                ".chakra-switch__thumb": {
                    bg: "tipsy_light.100",
                    boxShadow: `2px 2px 4px ${shadow_transparent}, inset 3px 3px 7px -3px ${shadow_transparent}, inset -3px -3px 7px -3px #ffffff;`,
                },
                //スイッチの外部の背景
                ".chakra-switch__track": {
                    bg: "transparent",
                    boxShadow: `inset 4px 4px 10px -3px ${shadow}, inset -4px -4px 10px -3px ${highlight}, 3px 3px 15px -1px ${shadow}, -3px -3px 15px -1px ${highlight}`,
                },
                //スイッチの背景のはいけいのチェック時
                ".chakra-switch__track[data-checked]": {
                    bg: Scolor,
                    bgGradient: SbgGradient,
                    boxShadow: `inset 4px 4px 10px -3px ${shadow_transparent}, inset -4px -4px 10px -3px ${highlight_transparent}, 4px 4px 10px -3px ${shadow}, 4px 4px 10px -3px ${highlight}`,
                },
            }}
            />
        </FormControl>
    )
}