import { extendTheme } from "@chakra-ui/react"
import { mode } from '@chakra-ui/theme-tools'

export const theme = extendTheme({
    // カラーモード設定項目  https://chakra-ui.com/docs/styled-system/color-mode
    initialColorMode: 'system',
    useSystemColorMode: false,
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
    colors: {
        tipsy_light: {
            // カラー振り分け 　
            //100/バックグラウンド  　200/ハイライト 　　300/シャドー　　 400/テキストカラー　　   500/subtleテキストカラー
            //600/アクセントカラー(orange) 　　700/アクセントカラー(pink) 　　800/アクセントカラー(green) 900/アクセントカラー(blue)
            50: "#ffffff",
            100: "#ebeff1",
            // 200: "#rgba(255,255,255, 0.5)",
            200: "#rgb(255,255,255)",
            300: "rgba(178,191,208, 0.5)",
            400: "#47494a",
            500: "#7f8da0",
            600: "#F6AD55",
            700: "#F687B3",
            800: "#68D391",
            900: "#63B3ED",
        }
    },
    styles: {
        global: (props: any) => ({
            'html, body': {
                //基本はremでルートとの相対サイズでフォントを描画させ、親のサイズによって変更したい場合(一つの構成が完結しているlayout)のみemを用いる
                fontSize: '20px',
                // color: props.colorMode === 'dark' ? 'white' : 'gray.800',
                color: mode('tipsy_light.400', 'whiteAlpha.900')(props),
                // backgroundColor: props.colorMode === 'dark' ? 'gray.800' : 'tipsy_light.100',
                backgroundColor: mode('tipsy_light.100', 'red.800')(props),
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
