import { CloseIcon, Search2Icon } from '@chakra-ui/icons';
import { Button, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputLeftElement, InputRightElement, useColorMode } from '@chakra-ui/react'
import { useState } from 'react';
import { GlassInputProps, NeumInputProps } from "../../type/atom";
import { Validation_password, Validation_username } from '../../util/form/validation';
import { useFormColorMode, useNeumorphismColorMode } from '../../util/hook/useColor';
import { useOneSizeSmaller } from '../../util/hook/useSize';



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

export const GlassInput = ({
    id="input", labelName="Input", PHcolor="text_very_light", placeholder="入力してください", size="md",
    errors, register, defaultValue, validation, 
    bg="bg_transparent_reverse_deep", borderRadius="full", border="0.5px solid", borderColor="text_light", focusBorderColor,
    ...props
}: GlassInputProps) => {
    const { border_switch, glass_text_switch } = useFormColorMode();
    const focusBC = focusBorderColor ? focusBorderColor : border_switch
    return (
        <FormControl
        {...props}
        isInvalid={errors[id] ? true : false}
        >
            <FormLabel>{labelName}</FormLabel>
            <Input
            {...register(id , validation)}
            autoComplete="off"
            defaultValue={defaultValue}
            size={size}

            color={glass_text_switch}
            bg={bg}
            focusBorderColor={focusBC}
            borderColor={borderColor}
            border={border}
            borderRadius={borderRadius}
            placeholder={placeholder}
            _placeholder={{ opacity: 1, color: PHcolor }}
            />
            <FormErrorMessage>
                {/* {errors.inputText3 && errors.inputText3?.message} */}
                {errors[id] && <div role="alert">{errors[id]?.message + " "}</div>}
            </FormErrorMessage>
    </FormControl>
    )
}


export const GlassInput_password = ({
    id="input", labelName="Input", PHcolor="text_very_light", placeholder="入力してください", size="md",
    errors, register, defaultValue, validation,
    bg="bg_transparent_reverse_deep", borderRadius="full", border="0.5px solid", borderColor="text_light", focusBorderColor, 
    relementBorderRadius="full",
    ...props
}: GlassInputProps) => {

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const { border_switch, glass_text_switch } = useFormColorMode();
    const focusBC = focusBorderColor ? focusBorderColor : border_switch
    const relementSize = useOneSizeSmaller(size)
    return (
        <FormControl
        {...props}
        id={id}
        isInvalid={errors[id] ? true : false}
        >
            <FormLabel>Password</FormLabel>
            <InputGroup
            size={size}
            >
                <Input
                {...register(id , Validation_password)}
                placeholder={placeholder}
                defaultValue={defaultValue}
                type={show ? 'text' : 'password'}

                bg={bg}
                color={glass_text_switch}
                border={border}
                borderColor={borderColor}
                borderRadius={borderRadius}
                focusBorderColor={focusBC}
                _placeholder={{ opacity: 1, color: PHcolor }}
                />
                <InputRightElement width='4.5rem'>
                    <Button
                    onClick={handleClick} 
                    size={relementSize} 

                    fontWeight={"normal"} 
                    variant='outline' 
                    color="text_normal" 
                    borderColor="text_light" 
                    border="1.5px solid" 
                    borderRadius={relementBorderRadius} 
                    _hover={{bg: "bg_transparent_reverse_deep"}}
                    >
                        {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
        <FormErrorMessage>
            {errors[id] && <div role="alert">{errors[id]?.message + " "}</div>}
            </FormErrorMessage>
        </FormControl>
    )
}


export function GlassInput_username({ 
    errors, register, defaultValue
}: GlassInputProps) {
    return (
        <FormControl
        id="input_username"
        isRequired
        isInvalid={errors.input_username ? true : false}
        my={5}
        >
            <FormLabel>User Name</FormLabel>
            <Input
            focusBorderColor='teal.300'
            placeholder="Tipsco"
            defaultValue={defaultValue}

            {...register("input_username", Validation_username)}
            />
            <FormErrorMessage>
                {errors.input_username && <div role="alert">{errors.input_username?.message + " "}</div>}
            </FormErrorMessage>
        </FormControl>
    )
}


export const GlassInput_search = ({
    placeholder="検索"
}: GlassInputProps) => {
    const [value, setValue] = useState("")
    const handleChange = (e: any) => setValue(e.target.value)
    const handleClear = () => setValue("")

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