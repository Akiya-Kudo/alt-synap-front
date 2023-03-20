import { RadioGroup, Radio, useColorModeValue, Box } from "@chakra-ui/react"
import { useState } from "react"
import { RadioProps } from "../../type/atom"
import { useNeumorphismColorMode } from "../../util/hook/useColor"

export const BasicRadio = ({children, value, disabled, size,  m=0, Rcolor="red_switch", color="text_normal" }: RadioProps) => {
    const { highlight, shadow } = useNeumorphismColorMode()
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
                color: Rcolor,
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
                color: disabled ? "text_very_light" : color, 
                fontWeight: 'normal'
            }}
            >
                {children}
            </Box>
        </Radio>
    )
}



export const SwitchRadio = ({children, value, disabled, size,  m="1rem 1rem", Rcolor="red_switch", color="text_normal" }: RadioProps) => {
    const { highlight, shadow } = useNeumorphismColorMode()
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
            // 内部マーク未選択時
            "input ~ &::before": {
                content: '""',
                position: 'absolute',
                width: "10px",
                height: "10px",
                bg: "transparent",
                borderRadius: "10px",
                boxShadow: `2px 2px 4px ${shadow},-2px -2px 4px ${highlight}`,
            },
            //外部背景マーク選択時
            "input:checked ~ &": {
                bg: "transparent",
                color: Rcolor,
                boxShadow: `4px 4px 8px ${shadow},-4px -4px 8px ${highlight};`,
                _hover: {
                    bg: "transparent"
                }
            },
            //内部背景マーク選択時
            "input:checked ~ &::before": {
                boxShadow: "none"
            },
            //外部マーク非表示時
            "input:disabled ~ &::before": {
                boxShadow: `none`,
                bg: "transparent"
            },
            //内部マーク非表示時
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
                color: disabled ? "text_very_light" : color, 
                fontWeight: 'normal'
            }}
            >
                {children}
            </Box>
        </Radio>
    )
}