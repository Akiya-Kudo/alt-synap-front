import { Input } from '@chakra-ui/react'
import { InputProps } from "../../type/atom";
import { useNeumorphismColorMode } from '../../util/hook/useColor';

export const BasicInput = ({
    placeholder, getValue,neumH="dent", h,w, minH,minW,maxH,maxW,m,p,fs=20,
    bg="transparent", bgg, color="text_normal", Pcolor="text_very_light", br="50"
}: InputProps ) => {
    const { highlight, shadow } = useNeumorphismColorMode()
    const neumHeight = neumH=="dent" ? `inset -5px -5px 15px -3px ${highlight}, inset 5px 5px 15px -3px  ${shadow};` : `15px 15px 30px ${shadow}, -15px -15px 30px  ${highlight};`
    const handleChange = (e:any) => {
        getValue(e.target.value)
    }
    return (
        <Input
        onChange={handleChange}
        placeholder={placeholder}
        _placeholder={{ color: Pcolor }}
        border="none"
        _focus={{
            boxShadow: `15px 15px 30px ${shadow}, -15px -15px 30px  ${highlight};`,
            fontSize: fs / 0.95,
        }}
        boxShadow={neumHeight}
        h={h} w={w} minH={minH} minW={minW} maxH={maxH} maxW={maxW} m={m} p={p} borderRadius={br}
        bg={bg} bgGradient={bgg} color={color} fontSize={fs}
        >
        </Input>
    )
}