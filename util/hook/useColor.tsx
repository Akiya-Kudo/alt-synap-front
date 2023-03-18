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

//色を順番に配列に格納してくれる関数・２色を順番に欲しい個数分、配列で所得したい時など
export const useColorOrderPick = (array: string[] | undefined, num: number | undefined ) => {
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