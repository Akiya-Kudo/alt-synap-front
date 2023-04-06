import { extendTheme } from "@chakra-ui/react"
import { mode } from '@chakra-ui/theme-tools'
import { color_switchs, tipsy_dark, tipsy_light } from "./color_theme"

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
        colors: color_switchs
    },
    colors: {
        tipsy_light: tipsy_light,
        tipsy_dark: tipsy_dark,
    },
    fonts: {
        body: "'Ubuntu', 'M PLUS Rounded 1c', sans-serif;",
    },
    fontWeight: {
        normal: 400,
        bold: 700,
    },
    styles: {
        global: (props: any) => ({
            'html, body': {
                //基本はremでルートとの相対サイズでフォントを描画させ、親のサイズによって変更したい場合(一つの構成が完結しているlayout)のみemを用いる
                fontSize: '20px',
                color: mode('tipsy_light.400', "tipsy_dark.400")(props),
                backgroundColor: mode('tipsy_light.100', 'tipsy_dark.100')(props),
                margin: 0,
                padding: 0,
                minHeight: '100vh',
                width: '100%',
            },
            '.page': {
                minHeight: '100vh',
                width: '100%',
            },
            '*': {
                boxSiing: 'border-box',
            },
        }),
    },
    // layerStyles: {
    //     glass_menu_item: {
    //         backgroundColor: "transparent",
    //         // backdropFilter: "blur(5px)",
    //         _hover: {backgroundColor: "rgba(130,130,130, 0.25)"},
    //     }
    // },
})
