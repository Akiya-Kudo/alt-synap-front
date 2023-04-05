import { CloseIcon, Search2Icon } from '@chakra-ui/icons';
import { Button, FormControl, FormErrorMessage, FormLabel, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, useColorMode } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
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
export const NeumInput = ({
    id="input", labelName="Input", PHcolor="text_very_light", placeholder="入力してください", size="md",
    errors, register, defaultValue, validation, 
    neumH="dent", bg="transparent", borderRadius="full", border="none",
    focusBorderColor, fontSize=20, color="text_normal",
    ...props
}: NeumInputProps ) => {
    const { highlight, shadow } = useNeumorphismColorMode()
    const neumHeight = neumH=="dent" ? `inset -5px -5px 15px -3px ${highlight}, inset 5px 5px 15px -3px  ${shadow};` : `15px 15px 30px ${shadow}, -15px -15px 30px  ${highlight};`
    return (
        <FormControl
        {...props}
        isInvalid={errors[id] ? true : false}
        >
            <FormLabel ms={3}>{labelName}</FormLabel>
            <Input
            {...register(id , validation)}
            // autoComplete="off"
            defaultValue={defaultValue}
            
            size={size}
            boxShadow={neumHeight}
            color={color}
            bg={bg}
            border={border}
            borderRadius={borderRadius}
            fontSize={fontSize}
            placeholder={placeholder}
            _placeholder={{ opacity: 1, color: PHcolor }}
            _focus={{
                boxShadow: `15px 15px 30px ${shadow}, -15px -15px 30px  ${highlight};`,
                fontSize: fontSize / 0.95,
            }}
            my={3}
            />
            <FormErrorMessage ms={5}>
                {/* {errors.inputText3 && errors.inputText3?.message} */}
                {errors[id] && <div role="alert">{errors[id]?.message + " "}</div>}
            </FormErrorMessage>
    </FormControl>
    )
}

export const NeumInput_password = ({
    id="input", labelName="Input",
    PHcolor="text_very_light", placeholder="入力してください", size="md",
    errors, register, defaultValue, validation, 
    neumH="dent", bg="transparent", borderRadius="full", border="none",
    focusBorderColor, fontSize=20, color="text_normal",
    relementBorderRadius="full",
    ...props
}: NeumInputProps) => {
    const { highlight, shadow } = useNeumorphismColorMode()
    const neumHeight = neumH=="dent" ? `inset -5px -5px 15px -3px ${highlight}, inset 5px 5px 15px -3px  ${shadow};` : `15px 15px 30px ${shadow}, -15px -15px 30px  ${highlight};`

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const relementSize = useOneSizeSmaller(size)
    return (
        <FormControl
        {...props}
        isInvalid={errors[id] ? true : false}
        >
            <FormLabel ms={5}>{labelName}</FormLabel>
            <InputGroup
            size={size}
            my={5}
            >
                <Input
                {...register(id , validation)}
                autoComplete="off"
                defaultValue={defaultValue}
                type={show ? 'text' : 'password'}
                
                size={size}
                boxShadow={neumHeight}
                color={color}
                bg={bg}
                border={border}
                borderRadius={borderRadius}
                fontSize={fontSize}
                placeholder={placeholder}
                _placeholder={{ opacity: 1, color: PHcolor }}
                _focus={{
                    boxShadow: `15px 15px 30px ${shadow}, -15px -15px 30px  ${highlight};`,
                    fontSize: fontSize / 0.95,
                }}
                />
                <InputRightElement mx={2}>
                    <IconButton
                    aria-label="パスワード表示切り替え"
                    icon={show ? <FaEyeSlash/> : <FaEye/>}
                    onClick={handleClick} 
                    size={relementSize} 

                    fontWeight={"normal"} 
                    color="text_normal" 
                    borderRadius={relementBorderRadius}
                    boxShadow={`3px 3px 6px ${shadow}, -3px -3px 6px  ${highlight}, inset 2px 2px 10px -5px ${shadow}, inset -2px -2px 10px -5px  ${highlight};`}
                    _hover={{boxShadow: `1px 1px 3px ${shadow}, -1px -1px 3px  ${highlight}, inset 2px 2px 10px -5px ${shadow}, inset -2px -2px 10px -5px  ${highlight};`}}
                    _active={{boxShadow: `inset 3px 3px 6px -2px ${shadow}, inset -3px -3px 6px -2px  ${highlight};`}}
                    />
                </InputRightElement>
            </InputGroup>
            <FormErrorMessage ms={5}>
                {errors[id] && <div role="alert">{errors[id]?.message + " "}</div>}
            </FormErrorMessage>
        </FormControl>
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
                <InputRightElement>
                    <IconButton
                    aria-label="パスワード表示切り替え"
                    icon={show ? <FaEyeSlash/> : <FaEye/>}
                    onClick={handleClick} 
                    size={relementSize} 

                    fontWeight={"normal"} 
                    variant='outline' 
                    color="text_normal" 
                    borderColor="text_light" 
                    border="1.5px solid" 
                    borderRadius={relementBorderRadius} 
                    _hover={{
                        bg: "bg_transparent_reverse_deep",
                    }}
                    />
                </InputRightElement>
            </InputGroup>
        <FormErrorMessage>
            {errors[id] && <div role="alert">{errors[id]?.message + " "}</div>}
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