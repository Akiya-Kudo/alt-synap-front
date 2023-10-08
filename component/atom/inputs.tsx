import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useImperativeHandle, useRef, useState } from 'react';
import NextImage from 'next/image';
import { Box, Button, ButtonProps, Center, ChakraComponent, Flex, FormControl, FormErrorMessage, FormLabel, forwardRef, IconButton, Input, InputGroup, InputLeftElement, InputProps, InputRightElement, Switch, Text, Textarea, Tooltip, useCheckbox, useColorMode } from '@chakra-ui/react'
import { CloseIcon, Search2Icon } from '@chakra-ui/icons';
import { FaEye, FaEyeSlash, FaQuestion } from 'react-icons/fa';
import { GlassFormImageInputProps, GlassFormInputProps, GlassInputProps, GlassSearchInputProps, ImageInputDefaultProps, NeumFormInputProps, NeumFormTextareaProps, NeumInputProps, NeumTextareaProps } from "../../type/atom";
import { useFormColorMode } from '../../util/hook/useColor';
import { useOneSizeSmaller } from '../../util/hook/useSize';
import { useNeumStyle_dent, useNeumStyle_flat } from '../../util/hook/useTheme';
import { GlassIconButton, NeumIconButton } from './buttons';
import ImageThumnail from "../../public/thumnailimage.svg";
import { DentBord } from './bords';



export const NeumInputDefault = ({
    //PHcolor: 制限拡張可 : boxShadow 固定 : fontSize 数値のみ : register hook用
    bg="transparent", 
    borderRadius="full", 
    border="none",
    color="text_normal", 
    placeholder='📝',
    PHcolor="text_very_light",
    register,
    ...props
}: NeumInputProps ) => {
    const { dent } = useNeumStyle_dent()
    const {flat_tall} = useNeumStyle_flat()
    return (
        <Input
        {...props}
        placeholder={placeholder}
        _placeholder={{ color: PHcolor }}
        border={border}
        _focus={{ boxShadow: flat_tall }}
        borderRadius={borderRadius} bg={bg} color={color}
        boxShadow={dent}
        {...register}
        />
    )
}

export const NeumTextAreaDefault = ({
    //PHcolor: 制限拡張可 : boxShadow 固定 : fontSize 数値のみ : register hook用
    bg="transparent", 
    borderRadius="10px", 
    border="none",
    color="text_normal", 
    fontSize=20, 
    placeholder='📝',
    PHcolor="text_very_light",
    register, onChange,
    ...props
}: NeumTextareaProps ) => {
    const { dent } = useNeumStyle_dent()
    const {flat_tall} = useNeumStyle_flat()
    if (register) {
        const newRegisterOnChange = register.onChange
        register.onChange = async (event: any) => {
            if (onChange) onChange(event)
            newRegisterOnChange(event)
        }
    }
    return (
        <Textarea
        {...props}
        placeholder={placeholder}
        _placeholder={{ color: PHcolor }}
        border={border}
        _focus={{
            boxShadow: flat_tall,
            fontSize: fontSize / 0.95,
        }}
        borderRadius={borderRadius} bg={bg} color={color} fontSize={fontSize}
        boxShadow={dent}
        {...register} onInput={onChange}
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
    isInputGuideToolTip, InputGuideToolexplain, fontWeight,
    ...props
}: NeumFormInputProps ) => {
    return (
        <FormControl
        {...props}
        isInvalid={errors[id] ? true : false}
        >
            <Flex>
                <FormLabel ms={3} fontWeight={fontWeight}>{labelName}</FormLabel>
                {
                    isInputGuideToolTip && (
                        <Tooltip label={InputGuideToolexplain}>
                            <DentBord h={"30px"} w={"30px"} >
                                <FaQuestion fontSize={".6rem"} color="orange" />
                            </DentBord>
                        </Tooltip>
                    )
                }
            </Flex>
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

export const NeumFormTextArea = ({
    id="textarea", 
    labelName="textarea",
    errors, 
    register, 
    validation, 
    defaultValue, 
    maxLength,
    bg, border, borderRadius, color,
    fontSize, placeholder, PHcolor,
    mt,
    ...props
}: NeumFormTextareaProps ) => {
    return (
        <>
            <FormLabel ms={3} mt={mt}>{labelName}</FormLabel>
            <NeumTextAreaDefault
            {...props}
            bg={bg} border={border} borderRadius={borderRadius} color={color} 
            fontSize={fontSize} placeholder={placeholder} PHcolor={PHcolor}

            register={register(id , validation)}
            defaultValue={defaultValue}
            maxLength={maxLength}
            />
            <FormControl isInvalid={errors[id] ? true : false} >
                <FormErrorMessage ms={5}>
                    {errors[id] && <div role="alert">{errors[id]?.message + " "}</div>}
                </FormErrorMessage>
            </FormControl>
        </>
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

    useEffect(() => {
        if (defaultValue) setIsFloat(true)
    },[defaultValue])
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
            top={isFloat ? [2, 3] : ["17px", "23px", "30px"]} left={7}
            fontSize={isFloat ? "0.7rem" : undefined} fontWeight={fontWeight}
            >
                {labelName}
            </FormLabel>
            <NeumInputDefault
            register={register(id , validation)} defaultValue={defaultValue}
            bg={bg} border={border} borderRadius={borderRadius} color={color} 
            fontWeight={fontWeight}
            placeholder="" h={["40px", "55px", "70px"]} ps={"33px"} my={2}
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
            top={isFloat ? [2, 3] : ["17px", "23px", "30px"]} left={7}
            fontSize={isFloat ? "0.7rem" : undefined}
            >{labelName}</FormLabel>
            <InputGroup>
                <NeumInputDefault
                register={register(id , validation)} defaultValue={defaultValue} maxLength={maxLength}
                bg={bg} border={border} borderRadius={borderRadius} color={color} 

                placeholder="" h={["40px", "55px", "70px"]} ps={"33px"} my={2}
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
                    top={["12px", "16px", "22px"]}
                    />
                </InputRightElement>
            </InputGroup>
            <FormErrorMessage ms={5}>
                {errors[id] && <div role="alert">{errors[id]?.message + " "}</div>}
            </FormErrorMessage>
        </FormControl>
    )
}

export const GlassInputDefault =({
    //PHcolor: 制限拡張可 ： register hook用
    // bg="bg_transparent_reverse", 
    bg="rgba(150,150,150, 0.25)", 
    border="0.5px solid",
    borderRadius="full", 
    borderColor="text_light",
    focusBorderColor,
    color="text_normal", 
    placeholder='📝',
    PHcolor="text_very_light",
    register,
    ...props
}: GlassInputProps
) => { 
    const { border_switch } = useFormColorMode();
    const focusBC = focusBorderColor ? focusBorderColor : border_switch
    return <Input
        {...props} 
        placeholder={placeholder}
        _placeholder={{ color: PHcolor }}
        border={border}
        borderRadius={borderRadius} 
        focusBorderColor={focusBC}
        bg={bg} color={color}
        {...register}
        />
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

    const { border_switch } = useFormColorMode();
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
    useEffect(() => {
        if (defaultValue) setIsFloat(true)
    },[])
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
            top={isFloat ? [2, 3] : ["17px", "23px", "30px"]} left={7}
            fontSize={isFloat ? "0.7rem" : undefined}
            zIndex={10}
            >
                {labelName}
            </FormLabel>
            <GlassInputDefault
            register={register(id , validation)} defaultValue={defaultValue}
            focusBorderColor={focusBC}            
            bg={bg} border={border} borderRadius={borderRadius} color={color} 

            placeholder="" h={["40px", "55px", "70px"]} ps={"33px"} my={2}
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
            top={isFloat ? [2, 3] : ["17px", "23px", "30px"]} left={7}
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

                placeholder="" h={["40px", "55px", "70px"]} my={2}
                type={show ? 'text' : 'password'}
                />
                <InputRightElement 
                mx={3}
                position="absolute"
                >
                    <IconButton
                    aria-label="パスワード表示切り替え"
                    icon={show ? <FaEyeSlash/> : <FaEye/>}
                    onClick={handleClick} 
                    size={relementSize} 

                    top={["13px", "17px", "22px"]}
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

export const GlassFormInput_nolabel = ({
    id="input", 
    errors, 
    register, 
    validation, 
    defaultValue, 
    maxLength,
    bg, border, borderRadius, focusBorderColor, 
    color, placeholder, PHcolor, h, w, fontSize,
    ...props
}: GlassFormInputProps) => {
    const { border_switch, border_light_switch } = useFormColorMode();
    let focusBC = focusBorderColor ? focusBorderColor : border_switch
    focusBC = focusBorderColor=="border_light_switch" ? border_light_switch : focusBC
    return (
        <FormControl
        {...props}
        isInvalid={errors[id] ? true : false}
        >
            <GlassInputDefault
            bg={bg} border={border} borderRadius={borderRadius} color={color} 
            placeholder={placeholder} PHcolor={PHcolor} focusBorderColor={focusBC}

            register={register(id , validation)}
            defaultValue={defaultValue}
            maxLength={maxLength}
            h={h} w={w} fontSize={fontSize}
            />
            <FormErrorMessage fontSize={fontSize}>
                {errors[id] && <div role="alert">{errors[id]?.message + " "}</div>}
            </FormErrorMessage>
    </FormControl>
    )
}

export const GlassInput_search = ({
    placeholder="検索",
    setValue,
    value,
    onSearch,
    right_element,
    ...props
}: GlassSearchInputProps) => {
        const [composing, setComposition] = useState(false);
        const handleSearchKeyDown = (e:any) => {
            if (
                e.key === 'Enter' 
                && !composing 
                && e.target.value!="" 
                ) {
                e.preventDefault();
                // e.target.value = ""
                // setValue("")
                onSearch()
            }
        }
    const handleChange = (e: any) =>  setValue(e.target.value)

    const {border_switch} = useFormColorMode()
    return (
        <InputGroup
        >
            <InputLeftElement
            pointerEvents='none'
            color='text_light'
            children={<Search2Icon/>}
            />
            <Input 
            { ...props }
            onChange={handleChange}
            onKeyDown={ handleSearchKeyDown }
            onCompositionStart={ ()=>setComposition(true) }
            onCompositionEnd={ ()=>setComposition(false) }
            value={value}
            placeholder={placeholder} 
            _placeholder={{ opacity: 1, color: 'text_light' }}
            backgroundColor={"rgba(150,150,150, 0.25)"}
            focusBorderColor={border_switch}
            borderRadius={"full"}
            fontSize={"1em"}
            />
            <InputRightElement 
            >
                {right_element}
            </InputRightElement>
        </InputGroup>
    )
}

// positionがabsoluteになっているためにこれを呼び出す親コンポーネントにはposition relative指定が必要
export const ImageInputDefault = ({
    id,
    setImage, 
    setImageFile, 
    register,
    defaultValue,
    onChangeNoImageset,
    ...props
}: ImageInputDefaultProps) => {
    // 画像を選択したら画面に表示する処理
    const handleChange = (e: any) => {
        if (e.target.files[0]) {
        const file = e.target.files[0];
        setImageFile(file)
        const photo = window.URL.createObjectURL(file)
        setImage(photo)
        } else {
            onChangeNoImageset(e)
        }
    }
    return (
        <Input   
        {...register(id)} {...props}
        type={"file"} 
        accept=" .png, .jpeg, .jpg, .svg, .webp"
        onChange={ handleChange }
        defaultValue={defaultValue}
        cursor={"pointer"} w="100%" h="100%" pos={"absolute"} left={0} right={0} opacity={0} 
        />
    )
}

export const PostImageInput = ({
    id,
    image, 
    setImage, 
    setImageFile, 
    register,
    defaultValue,
    onChangeNoImageset,
    ...props
}: GlassFormImageInputProps) => {

    // 画像を選択したら画面に表示する処理
    const handleChange = (e: any) => {
        if (e.target.files[0]) {
        const file = e.target.files[0];
        setImageFile(file)
        const photo = window.URL.createObjectURL(file)
        setImage(photo)
        } else {
            onChangeNoImageset(e)
        }
    }
    const {border_switch} = useFormColorMode()
    return (
        <FormControl
        id={id}
        >
                <Box 
                {...props}
                pos="relative" display={"flex"} flexDirection="column" alignItems={"center"} justifyContent="center" 
                textAlign={"center"}
                borderRadius={[10, 15]}
                backgroundColor={"rgba(150,150,150, 0.25)"}
                transition={"0.2s"}
                _hover={{
                    border: "2px solid",
                    borderColor: border_switch,
                    color: border_switch,
                }}
                >
                    { image ? 
                    // <Box w={200} h={200} borderRadius={10} m={4} overflow="hidden" pos="relative"> <NextImage alt="" src={image} objectFit={"cover"} layout={'fill'} /> </Box>
                    <Box width='100%' height='auto' position='relative' bottom={1} px={6} pt={6}>
                        <NextImage src={image} layout='responsive' objectFit='cover' alt='top_image' width={100} height={100} style={{ borderRadius: '20px' }} />
                    </Box>
                    : 
                    <Box w={150} h={150} borderRadius={10} overflow="hidden" mt={4}>
                        <NextImage alt="" src={ ImageThumnail } width={100} height={100} layout={'responsive'} />
                    </Box>
                    }
                    <Text m={2} mx={20} whiteSpace={"nowrap"}>{image ? "画像を変更する" : "画像を追加する" }</Text>
                    <Input   
                    {...register(id)}
                    type={"file"} 
                    accept=" .png, .jpeg, .jpg, .svg, .webp"
                    onChange={ handleChange }
                    defaultValue={defaultValue}
                    cursor={"pointer"} w="100%" h="100%" pos={"absolute"} left={0} right={0} opacity={0} 
                    />
                </Box>
        </FormControl>
    )
}

// post form のリンクpopover開発時にinitialFocusを導入するため定義。chakra のinitialFocusはrefを使用するため、forwardRefによる定義が必要だった。
// さらに、react hook formのvalidationを適用しとうとしたが、それにはforwardRefよりも先に、refを取得してregisterによる登録が必要だったがその実装が失敗、(useImpelementHandleを使用)
// export const GlassFormInput_ref = forwardRef<GlassFormInputProps, "input">(
//     function GlassFormInput_ref({
//     //PHcolor: 制限拡張可 ： register hook用
//     bg="bg_transparent_reverse_deep", h,w,
//     border="0.5px solid",
//     borderRadius="full", 
//     borderColor="text_light",
//     focusBorderColor,
//     color="text_normal", 
//     placeholder='📝',
//     PHcolor="text_very_light",
//     id,
//     errors,
//     register,
//     validation,
//     ...props
// }, ref
// ) { 
//     const { border_switch } = useFormColorMode();
//     const focusBC = focusBorderColor ? focusBorderColor : border_switch
//     return (
//         <FormControl {...props} isInvalid={errors[id] ? true : false}>
//             <Input
//             placeholder={placeholder}
//             _placeholder={{ color: PHcolor }}
//             border={border}
//             borderRadius={borderRadius} 
//             focusBorderColor={focusBC}
//             bg={bg} color={color} h={h} w={w}
//             {...register(id, validation)}
//             ref={ref}
//             />
//             <FormErrorMessage>
//                 {errors[id] && <div role="alert">{errors[id]?.message + " "}</div>}
//             </FormErrorMessage>
//         </FormControl>
// )})