export const tipsy_light = {
    100: "#ebeff1",
    200: "#ffffff",
    300: "rgba(105, 128, 154, 0.5)",
    400: "#686868",
    500: "#808080",
    600: "rgb(174, 174, 174)",
    700: "rgba(255,255,255,0.5)",
    800: "rgba(105, 128, 154, 0.5)",
    900: "RGBA(0, 0, 0, 0.7)"
}

export const tipsy_dark = {
    100: "#292D32",
    200: "#363a3d",
    300: "#181b1c",
    400: "#dddddd",
    500: "#b0b0b3",
    600: "#65696e",
    700: "rgba(62, 64, 69, 0.3)",
    800: "rgba(20, 22, 23, 0.5)",
    900: "#fff",
}

//それを参照するものすべてがその擬似クラスの影響を受けるため themeでの使用限定
export const color_switchs =  {
    bg_switch: {default: "tipsy_light.100", _dark: "tipsy_dark.100"},
    bg_transparent: {default: "whiteAlpha.500", _dark: "blackAlpha.500"},
    bg_transparent_reverse: {default: "blackAlpha.300", _dark: "whiteAlpha.300"},
    bg_transparent_reverse_deep: {default: "rgba(180,180,180,0.7)", _dark: "rgba(155,155,155,0.7)"},
    bg_transparent_reverse_light: {default: "rgba(170,170,170, 0.25)", _dark: "rgba(150,150,150, 0.25)"},
    mock_glass_bg_switch: {default: "rgb(224,224,224)", _dark: "rgb(68,69,70)"},
    bg_selection: {default:"rgba(146, 211, 255, 0.4)", _dark: "rgba(180, 201, 255, 0.4)"},
    bg_marked: {default:"rgba(245,235,111,0.29)", _dark: "rgba(255, 141, 191, 0.49)"},
    bg_editorjs_menu_hover: {default:"rgba(255,255,255,0.49)", _dark: "rgba(132,132,135,0.49)"},
    bg_editorjs_button: {default:"tipsy_light.200", _dark: "tipsy_dark.600"},
    bg_popover_switch: {default:"rgba(230,230,230, 0.6)", _dark: "rgba(130,130,130, 0.6)"},

    text_normal: {default: "tipsy_light.400", _dark: "tipsy_dark.400"},
    text_reverse: {default: "tipsy_dark.400", _dark: "tipsy_light.400"},
    text_light: {default: "tipsy_light.500", _dark: "tipsy_dark.500"},
    text_very_light: {default: "tipsy_light.600", _dark: "tipsy_dark.600"},
    text_important: {default: "tipsy_light.900", _dark: "tipsy_dark.900"},
    
    red_switch: {default: "red.400", _dark: "red.300",},
    orange_switch: {default: "orange.400", _dark: "orange.300" },
    yellow_switch: {default: "yellow.400", _dark: "yellow.300"},
    green_switch: {default: "green.400", _dark: "green.300"},
    teal_switch: {default: "teal.400", _dark: "teal.300"},
    blue_switch: {default: "blue.400", _dark: "blue.300"},
    cyan_switch: {default: "cyan.400", _dark: "cyan.300"},
    purple_switch: {default: "purple.400", _dark: "purple.300"},
    pink_switch: {default: "pink.400", _dark: "pink.300"},

    //experimental
    tipsy_color_1: {default: "yellow.400", _dark: "blue.300"},
    tipsy_color_1v2: {default: "yellow.500", _dark: "blue.300"},
    tipsy_color_2: {default: "green.400", _dark: "purple.300"},
    tipsy_color_3: {default: "teal.400", _dark: "pink.300"},
    tipsy_color_active_1: {default: "yellow.500", _dark: "blue.200"},
    tipsy_color_active_2: {default: "green.500", _dark: "purple.200"},
    tipsy_color_active_3: {default: "teal.500", _dark: "pink.200"},

    tipsy_tag_1: {default: "rgba(154, 230, 180, 0.6)", _dark: "rgba(214, 188, 250, 0.7)"},
    tipsy_tag_2: {default: "rgba(144, 230, 205, 0.6)", _dark: "rgba(234, 188, 230, 0.7)"},
    tipsy_tag_3: {default: "rgba(129, 230, 217, 0.6)", _dark: "rgba(251, 182, 206, 0.7)"},
    tipsy_tag_4: {default: "rgba(189, 260, 202, 0.6)", _dark: "rgba(200, 192, 226, 0.7)"},
    tipsy_tag_5:{default: "rgba(240, 290, 187, 0.6)", _dark: "rgba(174, 205, 244, 0.7)"},
}