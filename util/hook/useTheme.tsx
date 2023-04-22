import { useNeumorphismColorMode } from "./useColor"

export const useNeumStyle_dent = () => {
    const { highlight, shadow } = useNeumorphismColorMode()
    const dent = `inset -5px -5px 15px -3px ${highlight}, inset 5px 5px 15px -3px  ${shadow};`;
    const dent_sm = `inset 3px 3px 6px -2px ${shadow}, inset -3px -3px 6px -2px  ${highlight};`
    return {dent, dent_sm}
}

export const useNeumStyle_curve = () => {
    const { highlight, shadow } = useNeumorphismColorMode()
    const curve_sm_shallow = `1px 1px 3px ${shadow}, -1px -1px 3px  ${highlight}, inset 5px 5px 10px -3px ${shadow}, inset -5px -5px 10px -3px  ${highlight};`
    const curve_sm = `3px 3px 6px ${shadow}, -3px -3px 6px  ${highlight}, inset 5px 5px 10px -5px ${shadow}, inset -5px -5px 10px -5px  ${highlight};`
    const curve_sm_tall = `6px 6px 12px ${shadow}, -6px -6px 12px  ${highlight}, inset 5px 5px 10px -5px ${shadow}, inset -5px -5px 10px -5px  ${highlight};`
    return {curve_sm, curve_sm_shallow, curve_sm_tall } 
}

export const useNeumStyle_flat = () => {
    const { highlight, shadow } = useNeumorphismColorMode()
    const flat_sm = `5px 5px 15px ${shadow}, -5px -5px 15px ${highlight};` 
    const flat = `10px 10px 20px ${shadow}, -10px -10px 20px ${highlight};`
    const flat_tall = `15px 15px 30px ${shadow}, -15px -15px 30px ${highlight};`
    return { flat_sm, flat, flat_tall  }
}