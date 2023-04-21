import { CloseIcon, Search2Icon } from '@chakra-ui/icons';
import { FormControl, FormErrorMessage, FormLabel, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, useColorMode } from '@chakra-ui/react'
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { GlassFormInputProps, GlassInputProps, NeumFormInputProps, NeumInputProps } from "../../type/atom";
import { useFormColorMode } from '../../util/hook/useColor';
import { useOneSizeSmaller } from '../../util/hook/useSize';
import { useNeumStyle } from '../../util/hook/useTheme';
import { NeumIconButton } from './buttons';



export const NeumInputDefault = ({
    //PHcolor: 制限拡張可 : boxShadow 固定 : fontSize 数値のみ : register hook用
    bg="transparent", 
    borderRadius="full", 
    border="none",
    color="text_normal", 
    fontSize=20, 
    placeholder='📝',
    PHcolor="text_very_light",
    register,
    ...props
}: NeumInputProps ) => {
    const { dent, flat } = useNeumStyle()
    return (
        <Input
        {...props}
        placeholder={placeholder}
        _placeholder={{ color: PHcolor }}
        border={border}
        _focus={{
            boxShadow: flat,
            fontSize: fontSize / 0.95,
        }}
        borderRadius={borderRadius} bg={bg} color={color} fontSize={fontSize}
        boxShadow={dent}
        {...register}
        />
    )
}
export const NeumFormInput = ({
    id="input", 
    labelName="Input",
    errors, 
    register, 
    validation, 
    defaultValue, 
    maxLength,
    bg, border, borderRadius, color,
    fontSize, placeholder, PHcolor,
    ...props
}: NeumFormInputProps ) => {
    return (
        <FormControl
        {...props}
        isInvalid={errors[id] ? true : false}
        >
            <FormLabel ms={3}>{labelName}</FormLabel>
            <NeumInputDefault
            bg={bg} border={border} borderRadius={borderRadius} color={color} 
            fontSize={fontSize} placeholder={placeholder} PHcolor={PHcolor}

            register={register(id , validation)}
            defaultValue={defaultValue}
            maxLength={maxLength}
            />
            <FormErrorMessage ms={5}>
                {errors[id] && <div role="alert">{errors[id]?.message + " "}</div>}
            </FormErrorMessage>
    </FormControl>
    )
}

export const NeumFormInput_password = ({
    size="md", maxLength,
    id="input", labelName="Input", errors, 
    register, validation, defaultValue, 
    bg, border, borderRadius, color,
    fontSize, placeholder, PHcolor,
    ...props
}: NeumFormInputProps) => {

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
            >
                <NeumInputDefault
                register={register(id , validation)} defaultValue={defaultValue}
                bg={bg} border={border} borderRadius={borderRadius} color={color} 
                fontSize={fontSize} placeholder={placeholder} PHcolor={PHcolor}
                type={show ? 'text' : 'password'}
                maxLength={maxLength}
                size={size}
                />
                <InputRightElement mx={2}>
                    <NeumIconButton
                    aria-label="パスワード表示切り替え"
                    icon={show ? <FaEyeSlash/> : <FaEye/>}
                    onClick={handleClick} 
                    size={relementSize} 
                    />
                </InputRightElement>
            </InputGroup>
            <FormErrorMessage ms={5}>
                {errors[id] && <div role="alert">{errors[id]?.message + " "}</div>}
            </FormErrorMessage>
        </FormControl>
    )
}

export const NeumFloatFormInput = ({
    id="input",  labelName="Input", focusColor="tipsy_color_2", maxLength,
    errors, register, validation, defaultValue, 
    bg, border, borderRadius, color, fontWeight="normal",
    onChange, onBlur, onFocus,
    ...props
}: NeumFormInputProps ) => {
    const [isFloat, setIsFloat] = useState(false)
    const handleChange = (e:any) => {
        if (onChange) onChange(e)
        setIsFloat(true)
    }
    const handleBlur = (e:any) => {
        if (onBlur) onBlur(e)
        if (!e.target.value) setIsFloat(false)
    }
    const handleFocus = (e:any) => {
        if (onFocus) onFocus(e)
        setIsFloat(true)
    } 
    return (
        <FormControl
        {...props}
        isInvalid={errors[id] ? true : false}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        position="relative"
        >
            <FormLabel 
            position="absolute" transition={".25s"}
            color={isFloat ? focusColor : "text_normal"}
            top={isFloat ? 3 : "30px"} left={isFloat ? 7 : 7}
            fontSize={isFloat ? "0.7rem" : undefined} fontWeight={fontWeight}
            >
                {labelName}
            </FormLabel>
            <NeumInputDefault
            register={register(id , validation)} defaultValue={defaultValue}
            bg={bg} border={border} borderRadius={borderRadius} color={color} 
            fontWeight={fontWeight}
            placeholder="" h="70px" ps={"33px"} my={2}
            maxLength={maxLength}
            />
            <FormErrorMessage ms={5}>
                {errors[id] && <div role="alert">{errors[id]?.message + " "}</div>}
            </FormErrorMessage>
    </FormControl>
    )
}


export const NeumFloatFormInput_password = ({
    size="md", focusColor="tipsy_color_2", maxLength,
    id="input", labelName="Input", errors, 
    register, validation, defaultValue, 
    bg, border, borderRadius, color,
    onChange, onBlur, onFocus,
    ...props
}: NeumFormInputProps) => {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const relementSize = useOneSizeSmaller(size)

    const [isFloat, setIsFloat] = useState(false)
    const handleChange = (e:any) => {
        if (onChange) onChange(e)
        setIsFloat(true)
    }
    const handleBlur = (e:any)=> {
        if (onBlur) onBlur(e)
        if (e.target.type!="button" && !e.target.value) setIsFloat(false)
        }
    const handleFocus = (e:any) => {
        if (onFocus) onFocus(e)
        setIsFloat(true)
    }
    return (
        <FormControl
        {...props}
        isInvalid={errors[id] ? true : false}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        position="relative"
        >
            <FormLabel 
            position="absolute" transition={".25s"}
            color={isFloat ? focusColor : "text_normal"}
            top={isFloat ? 3 : "30px"} left={isFloat ? 7 : 7}
            fontSize={isFloat ? "0.7rem" : undefined}
            >{labelName}</FormLabel>
            <InputGroup>
                <NeumInputDefault
                register={register(id , validation)} defaultValue={defaultValue} maxLength={maxLength}
                bg={bg} border={border} borderRadius={borderRadius} color={color} 

                placeholder="" h="70px" my={2}
                type={show ? 'text' : 'password'}
                />
                <InputRightElement 
                mx={2}
                position="absolute"
                >
                        <NeumIconButton
                    aria-label="パスワード表示切り替え"
                    icon={show ? <FaEyeSlash/> : <FaEye/>}
                    onClick={handleClick} 
                    size={relementSize} 
                    top={4}
                    />
                </InputRightElement>
            </InputGroup>
            <FormErrorMessage ms={5}>
                {errors[id] && <div role="alert">{errors[id]?.message + " "}</div>}
            </FormErrorMessage>
        </FormControl>
    )
}

export const GlassInputDefault = ({
    //PHcolor: 制限拡張可 ： register hook用
    bg="bg_transparent_reverse_deep", 
    border="0.5px solid",
    borderRadius="full", 
    borderColor="text_light",
    focusBorderColor,
    color="text_normal", 
    placeholder='📝',
    PHcolor="text_very_light",
    register,
    ...props
}: GlassInputProps ) => {
    const { border_switch } = useFormColorMode();
    const focusBC = focusBorderColor ? focusBorderColor : border_switch
    return (
        <Input
        {...props}
        placeholder={placeholder}
        _placeholder={{ color: PHcolor }}
        border={border}
        borderRadius={borderRadius} 
        focusBorderColor={focusBC}
        bg={bg} color={color}
        {...register}
        />
    )
}

export const GlassFormInput = ({
    id="input", 
    labelName="Input",
    errors, 
    register, 
    validation, 
    defaultValue, 
    maxLength,
    bg, border, borderRadius, focusBorderColor, 
    color, placeholder, PHcolor,
    ...props
}: GlassFormInputProps) => {
    const { border_switch } = useFormColorMode();
    const focusBC = focusBorderColor ? focusBorderColor : border_switch
    return (
        <FormControl
        {...props}
        isInvalid={errors[id] ? true : false}
        >
            <FormLabel>{labelName}</FormLabel>
            <GlassInputDefault
            bg={bg} border={border} borderRadius={borderRadius} color={color} 
            placeholder={placeholder} PHcolor={PHcolor} focusBorderColor={focusBC}

            register={register(id , validation)}
            defaultValue={defaultValue}
            maxLength={maxLength}
            />
            <FormErrorMessage>
                {errors[id] && <div role="alert">{errors[id]?.message + " "}</div>}
            </FormErrorMessage>
    </FormControl>
    )
}

export const GlassFormInput_password = ({
    size="md", maxLength,
    id="input",  labelName="Input", errors, register, validation, defaultValue, 
    bg, border, borderRadius, focusBorderColor, 
    color, placeholder, PHcolor,

    borderColor="text_light",
    ...props
}: GlassFormInputProps) => {

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
                <GlassInputDefault
                type={show ? 'text' : 'password'}
                register={register(id , validation)} defaultValue={defaultValue} maxLength={maxLength}

                bg={bg} border={border} borderRadius={borderRadius} color={color} 
                placeholder={placeholder} PHcolor={PHcolor} focusBorderColor={focusBC}
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
                    borderRadius={"full"} 
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

export const GlassFloatFormInput = ({
    id="input",  labelName="Input", focusColor="tipsy_color_2",
    errors, register, validation, defaultValue, 
    bg, border, borderRadius, color, focusBorderColor,
    onChange, onBlur, onFocus,
    ...props
}: GlassFormInputProps ) => {
    const { border_switch, glass_text_switch } = useFormColorMode();
    const focusBC = focusBorderColor ? focusBorderColor : border_switch

    const [isFloat, setIsFloat] = useState(false)
    const handleChange = (e:any) => {
        if (onChange) onChange
        setIsFloat(true)
    }
    const handleBlur = (e:any) => {
        if (onBlur) onBlur(e)
        if (!e.target.value) setIsFloat(false)
    }
    const handleFocus = (e:any) => {
        if (onFocus) onFocus(e)
        setIsFloat(true)
    } 
    return (
        <FormControl
        {...props}
        isInvalid={errors[id] ? true : false}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        position="relative"
        >
            <FormLabel 
            position="absolute" transition={".25s"}
            color={isFloat ? focusColor : "text_normal"}
            top={isFloat ? 3 : "30px"} left={isFloat ? 7 : 7}
            fontSize={isFloat ? "0.7rem" : undefined}
            zIndex={10}
            >
                {labelName}
            </FormLabel>
            <GlassInputDefault
            register={register(id , validation)} defaultValue={defaultValue}
            focusBorderColor={focusBC}            
            bg={bg} border={border} borderRadius={borderRadius} color={color} 

            placeholder="" h="70px" ps={"33px"} my={2}
            />
            <FormErrorMessage ms={5}>
                {errors[id] && <div role="alert">{errors[id]?.message + " "}</div>}
            </FormErrorMessage>
    </FormControl>
    )
}

export const GlassFloatFormInput_password = ({
    size="md", focusColor="tipsy_color_2",
    id="input",  labelName="Input",
    errors, register, validation, defaultValue, 
    bg, border, borderRadius, color, focusBorderColor,
    onChange, onBlur, onFocus,
    ...props
}: GlassFormInputProps ) => {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const relementSize = useOneSizeSmaller(size)
    const { border_switch, glass_text_switch } = useFormColorMode();
    const focusBC = focusBorderColor ? focusBorderColor : border_switch

    const [isFloat, setIsFloat] = useState(false)
    const handleChange = (e:any) => {
        if (onChange) onChange
        setIsFloat(true)
    }
    const handleBlur = (e:any) => {
        if (onBlur) onBlur(e)
        if (!e.target.value) setIsFloat(false)
    }
    const handleFocus = (e:any) => {
        if (onFocus) onFocus(e)
        setIsFloat(true)
    } 
    return (
        <FormControl
        {...props}
        isInvalid={errors[id] ? true : false}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        position="relative"
        size={size}
        >
            <FormLabel 
            position="absolute" transition={".25s"}
            color={isFloat ? focusColor : "text_normal"}
            top={isFloat ? 3 : "30px"} left={isFloat ? 7 : 7}
            fontSize={isFloat ? "0.7rem" : undefined}
            zIndex={10}
            >
                {labelName}
            </FormLabel>
            <InputGroup
            >
                < GlassInputDefault
                register={register(id , validation)} defaultValue={defaultValue}
                bg={bg} border={border} borderRadius={borderRadius} color={color} 
                focusBorderColor={focusBC}

                placeholder="" h="70px" my={2}
                type={show ? 'text' : 'password'}
                />
                <InputRightElement 
                mx={2}
                position="absolute"
                >
                    <IconButton
                    aria-label="パスワード表示切り替え"
                    icon={show ? <FaEyeSlash/> : <FaEye/>}
                    onClick={handleClick} 
                    size={relementSize} 

                    top={4}
                    fontWeight={"normal"} 
                    variant='outline' 
                    color="text_normal" 
                    borderColor="text_light" 
                    border="1.5px solid" 
                    borderRadius={"full"} 
                    _hover={{
                        bg: "bg_transparent_reverse_deep",
                    }}
                    />
                </InputRightElement>
            </InputGroup>
            <FormErrorMessage ms={5}>
                {errors[id] && <div role="alert">{errors[id]?.message + " "}</div>}
            </FormErrorMessage>
    </FormControl>
    )
}
