import { useNeumorphismColorMode } from "./useColor"

export const useNeumStyle = () => {
    const { highlight, shadow } = useNeumorphismColorMode()
    const dent = `inset -5px -5px 15px -3px ${highlight}, inset 5px 5px 15px -3px  ${shadow};`;
    const dent_sm = `inset 3px 3px 6px -2px ${shadow}, inset -3px -3px 6px -2px  ${highlight};`
    const flat = `15px 15px 30px ${shadow}, -15px -15px 30px  ${highlight};`;
    return {dent, flat, dent_sm}
}

export const useNeumStyle_curve = () => {
    const { highlight, shadow } = useNeumorphismColorMode()
    const curve_sm = `3px 3px 6px ${shadow}, -3px -3px 6px  ${highlight}, inset 5px 5px 10px -5px ${shadow}, inset -5px -5px 10px -5px  ${highlight};`
    const curve_sm_low = `1px 1px 3px ${shadow}, -1px -1px 3px  ${highlight}, inset 5px 5px 10px -3px ${shadow}, inset -5px -5px 10px -3px  ${highlight};`
    return {curve_sm, curve_sm_low} 
}