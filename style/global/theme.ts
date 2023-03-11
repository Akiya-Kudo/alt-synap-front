import { extendTheme } from "@chakra-ui/react"
import { mode } from '@chakra-ui/theme-tools'
import { tipsy_dark, tipsy_light } from "./color_theme"

export const theme = extendTheme({
    // カラーモード設定項目  https://chakra-ui.com/docs/styled-system/color-mode
    initialColorMode: 'system',
    useSystemColorMode: false,
    breakpoints: {
        sm: '30em',
        md: '48em',
        lg: '62em',
        xl: '90em',
        '2xl': '120em',
    },
    semanticTokens: {
        colors: {
            text_normal: {
                default: "tipsy_light.400",
                _dark: "tipsy_dark.400",
            },
            text_light: {
                default: "tipsy_light.500",
                _dark: "tipsy_dark.500",
            },
            text_very_light: {
                default: "tipsy_light.600",
                _dark: "tipsy_dark.600",
            }
        }
    },
    colors: {
        tipsy_light: tipsy_light,
        tipsy_dark: tipsy_dark,
    },
    fonts: {
        // body: "'Ubuntu', 'M PLUS Rounded 1c', 'Kiwi_Maru', sans-serif;",
        body: "'Ubuntu', 'M PLUS Rounded 1c', sans-serif;",
    },
    //font-weight 300/light   400/normal   500/medium   700/bold  // font-style  italic
    fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        bold: 700,
    },
    styles: {
        global: (props: any) => ({
            'html, body': {
                //基本はremでルートとの相対サイズでフォントを描画させ、親のサイズによって変更したい場合(一つの構成が完結しているlayout)のみemを用いる
                fontSize: '20px',
                // color: props.colorMode === 'dark' ? 'white' : 'gray.800',
                color: mode('tipsy_light.400', 'tipsy_dark.400')(props),
                // backgroundColor: props.colorMode === 'dark' ? 'gray.800' : 'tipsy_light.100',
                backgroundColor: mode('tipsy_light.100', 'tipsy_dark.100')(props),
                margin: 0,
                padding: 0,
                minHeight: '100vh',
                width: '100%',
            },
            '.page': {
                minHeihgt: '100vh',
                width: '100%',
            },
            '*': {
                boxSiing: 'border-box',
                color: 'tipsy_light.400',
            },
        }),
    },
})
