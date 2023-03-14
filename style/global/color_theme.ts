export const tipsy_light = {
    100: "#ebeff1",
    200: "#ffffff",
    300: "rgba(105, 128, 154, 0.5)",
    400: "#686868",
    500: "#808080",
    600: "rgb(174, 174, 174)"
}

export const tipsy_dark = {
    100: "#292D32",
    200: "#35383d",
    300: "#1e2123",
    400: "#dddddd",
    500: "#b0b0b3",
    600: "#65696e",
}

//それを参照するものすべてがその擬似クラスの影響を受けるため themeでの使用限定
export const color_switchs =  {
    bg_switch: {default: "tipsy_light.100", _dark: "tipsy_dark.100"},

    text_normal: {default: "tipsy_light.400", _dark: "tipsy_dark.400",},
    text_reverse: {default: "tipsy_dark.400", _dark: "tipsy_light.400"},
    text_normal_reverse: {default: "tipsy_.400", _dark: "tipsy_light.400",},
    text_light: {default: "tipsy_light.500", _dark: "tipsy_dark.500",},
    text_very_light: {default: "tipsy_light.600", _dark: "tipsy_dark.600",},
    
    red_switch: {default: "red.400", _dark: "red.300",},
    orange_switch: {default: "orange.400", _dark: "orange.300" },
    yellow_switch: {default: "yellow.400", _dark: "yellow.300"},
    green_switch: {default: "green.400", _dark: "green.300"},
    teal_switch: {default: "teal.400", _dark: "teal.300"},
    blue_switch: {default: "blue.400", _dark: "blue.300"},
    cyan_switch: {default: "cyan.400", _dark: "cyan.300"},
    purple_switch: {default: "purple.400", _dark: "purple.300"},
    pink_switch: {default: "pink.400", _dark: "pink.300"},
}