import { Box, FormControl, FormLabel, Switch } from "@chakra-ui/react"
import { SwitchProps } from "../../type/atom"
import { useNeumorphismColorMode } from "../../util/hook/useColor"

export const BasicSwitch = ({id, children, size, Scolor="blue_switch", color, m, p, disabled, checked, required, direction, spacing=1}: SwitchProps) => {
    const { highlight, shadow, highlight_transparent, shadow_transparent } = useNeumorphismColorMode()
    const flxgrw = direction=="row-reverse" ? 1 : 0;
    return (
        <FormControl display='flex' alignItems={"center"} flexDirection={direction} m={m} p={p}>
            <Box flexGrow={flxgrw}></Box>
            <FormLabel htmlFor={id} mb={0} color={color}>
                { children }
            </FormLabel>
            <Box w={spacing}></Box>
            <Switch
            id={id}
            size={size}
            isDisabled={disabled} isChecked={checked} isRequired={required}
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