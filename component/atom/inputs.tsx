import { CheckIcon, CloseIcon, Search2Icon, SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react'
import { useState } from 'react';
import { NeumInputProps } from "../../type/atom";
import { useFormColorMode, useNeumorphismColorMode } from '../../util/hook/useColor';

export const BasicInput = ({
    neumH="dent", PHcolor="text_very_light", placeholder='📝',
    fontSize=20, bg="transparent", color="text_normal", borderRadius="full", border="none",
    ...props
}: NeumInputProps ) => {
    const { highlight, shadow } = useNeumorphismColorMode()
    const neumHeight = neumH=="dent" ? `inset -5px -5px 15px -3px ${highlight}, inset 5px 5px 15px -3px  ${shadow};` : `15px 15px 30px ${shadow}, -15px -15px 30px  ${highlight};`
    return (
        <Input
        {...props}
        placeholder={placeholder}
        _placeholder={{ color: PHcolor }}
        border={border}
        _focus={{
            boxShadow: `15px 15px 30px ${shadow}, -15px -15px 30px  ${highlight};`,
            fontSize: fontSize / 0.95,
        }}
        borderRadius={borderRadius} bg={bg} color={color} fontSize={fontSize}
        boxShadow={neumHeight}
        />
    )
}

export const GlassSearchInput = ({placeholder="検索"}: NeumInputProps) => {
    const [value, setValue] = useState("")
    const handleChange = (e: any) => {
        setValue(e.target.value)
    }
    const handleClear = () => {
        setValue("")
    }
    const {border_switch} = useFormColorMode()
    return (
        <InputGroup
        // maxW={"60rem"}
        >
            <InputLeftElement
            pointerEvents='none'
            color='text_light'
            fontSize={"0.85rem"}
            children={<Search2Icon/>}
            />
            <Input 
            onChange={handleChange}
            value={value}
            placeholder={placeholder}
            _placeholder={{ opacity: 1, color: 'text_light' }}
            backgroundColor={"rgba(150,150,150, 0.25)"}
            focusBorderColor={border_switch}
            borderRadius={"full"}
            />
            <InputRightElement 
            onClick={handleClear}
            color='text_light'
            fontSize={"0.85rem"}
            children={<CloseIcon/>} 
            />
        </InputGroup>
    )
}