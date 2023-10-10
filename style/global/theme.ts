import { extendTheme } from "@chakra-ui/react"
import { mode } from '@chakra-ui/theme-tools'
import { editorjs_styles } from "./editorjs_style"
import { color_switchs, tipsy_dark, tipsy_light } from "./color_theme"

export const theme = extendTheme({
    // カラーモード設定項目  https://chakra-ui.com/docs/styled-system/color-mode
    initialColorMode: 'system',
    useSystemColorMode: false,
    breakpoints: {        // ( 0px ~ 480px ) スマホ用 (isMobile)
        sm: '480px',      // ( 480px ~ 約1000px )    タブレット用        
        md: '1000px',     // ( 約1000px ~ 約1500px ) タブレット用(横) & ラップトップ（小・中）
        lg: '1500px',     // ( 約1500px ~ 約3000px ) ラップトップ(大)
        xl: '3000px',     // ( 約3000px ~ 約5000px) ディスプレイ(大)
        '2xl': '5000px',  //（　約5000px　~ ）  ディスプレイxdr
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
                fontSize: {
                    "base": "10px",
                    sm: "14px",
                    md: "18px",
                    lg: "22px",
                    xl: "30px",
                    "2xl": "40px"
                },
                color: mode('tipsy_light.400', "tipsy_dark.400")(props),
                backgroundColor: mode('tipsy_light.100', 'tipsy_dark.100')(props),
                margin: 0,
                padding: 0,
                minHeight: '100vh',
                width: '100%',
            },
            '.page': {
                minHeight: '100vh',
                width: '100vw',
                pt: ["50px", "70px", "90px", "110px"],
            },
            '*': {
                boxSizing: 'border-box',
            },
            "a": {color: "text_light"},
            "mark": {
                bg: "bg_marked",
                color: "text_normal"
            },
            "::selection": {
                bg: "bg_selection",
                color: "text_switch",
            },

            "h1, h2, h3, h4, h5, h6": {fontWeight: "bold",},
            "h1": {fontSize: "3rem",},
            "h2": {fontSize: "2.5rem"},
            "h3": {fontSize: "2rem"},
            "h4": {fontSize: "1.7rem"},
            "h5": {fontSize: "1.2rem"},
            "h6": {fontSize: "1rem"},
            ...editorjs_styles,
        }),
    },
})
