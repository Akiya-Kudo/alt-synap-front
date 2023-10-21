import { useColorModeValue } from "@chakra-ui/react"

//第一引数に戻り値で欲しいカラー個数を入力（ない場合はdefの9 or 配列の個数分が出力される）・第二引数でランダムで選択する色の文字列を入力(ない場合はchakra defaultの9種から)
export const useColorRandomPick= ( array: string[] | undefined, num: number | undefined ) => {
    let sorted_array = []
    if (!array) {
        array = [
            "red_switch","orange_switch","yellow_switch","green_switch","teal_switch",
            "blue_switch","cyan_switch","purple_switch","pink_switch"
        ]
    }
    if (!num) num = array.length
    if (array.length < num) {
        const mg = num - array.length
        for (let i = 0; i < mg; i++) {
            array.push(array[i])
        }
    }
    while (num) {
        let i = Math.floor(Math.random() * num);
        sorted_array.push(array[i])
        let remained_value = array[--num];
        array[num] = array[i]
        array[i] = remained_value
    }

    return sorted_array
}

//色を順番に配列に格納してくれる関数・２色を特定の個数分順番に欲しいときなど、配列で所得したい時など => １arg : switch color_string配列 ,  2args {nullable} : number( 欲しい個数分 )
export const useColorOrderPick = (array: string[] | undefined, num?: number ) => {
    if (!array) {
        array = [
            "red_switch","orange_switch","yellow_switch","green_switch","teal_switch",
            "blue_switch","cyan_switch","purple_switch","pink_switch"
        ]
    }
    if (!num) num = array.length
    if (array.length > num) array = array.slice(0, num);
    let i = 0
    while (array.length < num) {
        array.push(array[i])
        i++
    }
    return array
}

export const useNeumorphismColorMode = () => {
    const highlight = useColorModeValue("var(--chakra-colors-tipsy_light-200)", "var(--chakra-colors-tipsy_dark-200)")
    const shadow = useColorModeValue("var(--chakra-colors-tipsy_light-300)", "var(--chakra-colors-tipsy_dark-300)")
    const highlight_transparent = useColorModeValue("var(--chakra-colors-tipsy_light-700)", "var(--chakra-colors-tipsy_dark-700)")
    const shadow_transparent = useColorModeValue("var(--chakra-colors-tipsy_light-800)", "var(--chakra-colors-tipsy_dark-800)")
    return {highlight, shadow, highlight_transparent, shadow_transparent}
}

export const useFormColorMode = () => {
    const border_switch = useColorModeValue("green.400", "blue.300")
    const border_light_switch = useColorModeValue("green.300", "blue.400")
    const border_deep_switch = useColorModeValue("green.700", "blue.100")
    const glass_text_switch = useColorModeValue("tipsy_light.400", "tipsy_dark.400")
    return {border_switch, border_light_switch, glass_text_switch, border_deep_switch}
}

export const useGlassColorMode = () => {
    const glass_bg_switch = useColorModeValue("rgba(220,220,220, 0.8)", "rgba(100,100,100, 0.7)")
    const glass_bg_switch_natural = useColorModeValue("rgba(200,200,200, 0.6)", "rgba(60,60,60, 0.6)")
    const glass_bg_switch_footer = useColorModeValue("rgba(220,220,220, 0.6)", "rgba(60,60,60, 0.6)")
    const glass_bg_switch_deep = useColorModeValue("rgba(230,230,230, 0.75)", "rgba(60,60,60, 0.75)")
    const mock_bg_switch = useColorModeValue("rgb(224,224,224)", "rgb(88,89,90)")
    return {glass_bg_switch, glass_bg_switch_natural, mock_bg_switch, glass_bg_switch_deep, glass_bg_switch_footer}
}