import { RadioGroup, Radio, useColorModeValue, Box } from "@chakra-ui/react"
import { useState } from "react"
import { RadioProps } from "../../type/atom"

export const RadioSelecter = ({children, value, disabled, size,  m=0, color="red_switch" }: RadioProps) => {
    const highlight = useColorModeValue("var(--chakra-colors-tipsy_light-200)", "var(--chakra-colors-tipsy_dark-200)")
    const shadow = useColorModeValue("var(--chakra-colors-tipsy_light-300)", "var(--chakra-colors-tipsy_dark-300)")
    return (
        <Radio 
        value={ value }
        isDisabled={disabled}
        m={m}
        size={size}
        boxShadow={`4px 4px 8px ${shadow},-4px -4px 8px ${highlight};`}
        border={"none"}
        sx={{
            //"input ~ &"はradio-buttonのスタイリング(::beforeはその中の未選択時のマークの作成 & 選択時のスタイル削除)
            "input ~ &": {
                boxShadow: `4px 4px 8px ${shadow},-4px -4px 8px ${highlight}, inset 2px 2px 10px -3px ${shadow}, inset -2px -2px 10px -3px ${highlight}`,
            },
            "input ~ &::before": {
                content: '""',
                position: 'absolute',
                width: "10px",
                height: "10px",
                bg: "transparent",
                borderRadius: "10px",
                boxShadow: `2px 2px 4px ${shadow},-2px -2px 4px ${highlight}`,
            },
            "input:checked ~ &": {
                bg: "transparent",
                color: color,
                boxShadow: `4px 4px 8px ${shadow},-4px -4px 8px ${highlight};`,
                _hover: {
                    bg: "transparent"
                }
            },
            "input:checked ~ &::before": {
                boxShadow: "none"
            },
            "input:disabled ~ &::before": {
                boxShadow: `none`,
                bg: "transparent"
            },
            "input:disabled ~ &": {
                boxShadow: `inset 2px 2px 5px -3px ${shadow}, inset -2px -2px 5px -3px ${highlight}`,
                bg: "transparent"
            }

        }}
        >
            {/* labelのスタイリング */}
            <Box
            sx={{ 
                color: disabled ? "text_very_light" : "text_normal", 
                fontWeight: 'normal'
            }}
            >
                {children}
            </Box>
        </Radio>
    )
}



export const RadioSwitch = ({children, value, disabled, size,  m=0, color="red_switch" }: RadioProps) => {
    const highlight = useColorModeValue("var(--chakra-colors-tipsy_light-200)", "var(--chakra-colors-tipsy_dark-200)")
    const shadow = useColorModeValue("var(--chakra-colors-tipsy_light-300)", "var(--chakra-colors-tipsy_dark-300)")
    const [ch, setCh] = useState(false)
    const handle = () => setCh(!ch)
    return (
        <Radio 
        value={ value }
        isDisabled={disabled}
        isChecked={ch}
        onClick={handle}
        m={m}
        size={size}

        boxShadow={`4px 4px 8px ${shadow},-4px -4px 8px ${highlight};`}
        border={"none"}
        sx={{
            //"input ~ &"はradio-buttonのスタイリング(::beforeはその中の未選択時のマークの作成 & 選択時のスタイル削除)
            "input ~ &": {
                boxShadow: `4px 4px 8px ${shadow},-4px -4px 8px ${highlight}, inset 2px 2px 10px -3px ${shadow}, inset -2px -2px 10px -3px ${highlight}`,
            },
            "input ~ &::before": {
                content: '""',
                position: 'absolute',
                width: "10px",
                height: "10px",
                bg: "transparent",
                borderRadius: "10px",
                boxShadow: `2px 2px 4px ${shadow},-2px -2px 4px ${highlight}`,
            },
            "input:checked ~ &": {
                bg: "transparent",
                color: color,
                boxShadow: `4px 4px 8px ${shadow},-4px -4px 8px ${highlight};`,
                _hover: {
                    bg: "transparent"
                }
            },
            "input:checked ~ &::before": {
                boxShadow: "none"
            },
            "input:disabled ~ &::before": {
                boxShadow: `none`,
                bg: "transparent"
            },
            "input:disabled ~ &": {
                boxShadow: `inset 2px 2px 5px -3px ${shadow}, inset -2px -2px 5px -3px ${highlight}`,
                bg: "transparent",
            }

        }}
        >
            {/* labelのスタイリング */}
            <Box
            onClick={handle}
            sx={{ 
                color: disabled ? "text_very_light" : "text_normal", 
                fontWeight: 'normal'
            }}
            >
                {children}
            </Box>
        </Radio>
    )
}