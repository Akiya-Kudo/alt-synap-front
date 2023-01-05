import { Box, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Switch, Text, useCheckbox } from "@chakra-ui/react"
import Image from "next/image";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import ImageThumnail from "../../public/thumnailimage.svg";

type Props = {
    text?: string;
    errors?: any;
    formState?: any;
    register?: any;
    password?: string;
    defValue?: string | null;
    isDirty?: boolean;
    imageChanged?: boolean;
    onClose?: any;
}

const ShowSwitch = ({setIsShow, isShow, id, defIsShow}: {setIsShow: Dispatch<SetStateAction<boolean>>, isShow: boolean, id: string, defIsShow: boolean}) => {
    const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } = useCheckbox()
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setIsShow(!isShow)
    }
    let defChecked = true
    if (defIsShow == false) {
        defChecked = false
    }
    return (
        <>
            <Switch id={id} colorScheme='teal' ps={5} defaultChecked={defChecked}  size='md' mx={1} onChange={(e) => handleChange(e) }/>
        </>
    )
}

export const PostTitleInput = ({ errors, register, defValue }: Props) => {
    return (
        <FormControl
        id="inputText10"
        isInvalid={errors.inputText10 ? true : false}
        isRequired
        my={3}
        >
            <FormLabel>Title</FormLabel>
            <Input
            focusBorderColor='teal.300'
            placeholder="CSSとは"
            defaultValue={defValue}
            {...register("inputText10",  {
                required: "this is required to fill",
                maxLength: { value: 50, message: 'Please make Title less than 60 words' },
                minLength: { value: 3, message: "Please make Title more than 3 words" }
            })}
            />
            <FormErrorMessage>
                {errors.inputText10 && <div role="alert">{errors.inputText10?.message + " "}</div>}
            </FormErrorMessage>
        </FormControl>
    )
}

export const TopLinkInput = ({ errors, register, isShow, setIsShow, defValue, defIsShow }: any) => {
    
    return (
        <FormControl
        id="inputText11"
        isInvalid={errors.inputText11 ? true : false}
        my={3}
        >
            <FormLabel htmlFor="inputText11">Top Link 
                    <ShowSwitch id='inputText13' isShow={isShow} setIsShow={setIsShow} defIsShow={defIsShow}/>
            </FormLabel>
            {isShow 
            && 
            <>
                <Input
                type="url"
                focusBorderColor='teal.300'
                placeholder="https://"
                defaultValue={defValue}
                {...register("inputText11",  {
                    pattern: {
                        value: /^((ftp|http|https):\/\/).([A-z]+)\.([A-z]{2,})/,
                        message: "urlを貼り付けてください | Url required",
                    },
                    maxLength: { value: 1000, message: 'Please make Link less than 1000 words' },
                    minLength: { value: 7, message: "Please make Link more than 7 words" },
                })}
                />
                <FormHelperText>投稿の参照したページやURLがある場合、入力してください（Referred Link）</FormHelperText>
                <FormErrorMessage>
                    {errors.inputText11 && <div role="alert">{errors.inputText11?.message + " "}</div>}
                </FormErrorMessage>
            </>
            }
        </FormControl>
    )
}

export const PostImageInput = ({image, setImage, setImageFile, register, isShow, setIsShow, defValue, defIsShow}: any) => {

    // 画像を選択したら画面に表示する処理
    const ImageSet = (e: any) => {
        if (e.target.files[0]) {
        const file = e.target.files[0];
        setImageFile(file)
        const photo = window.URL.createObjectURL(file)
        setImage(photo)
        }
    }
    useEffect(() => {
        if (defValue) {
            setImageFile(defValue)
            const photo = window.URL.createObjectURL(defValue)
            setImage(photo)
        }
    },[])
    return (
        <FormControl
        id="inputText12"
        my={5}
        >
            <FormLabel mb={5}>User Photo (Jpeg・Png Only)  
                    <ShowSwitch id="inputText14" isShow={isShow} setIsShow={setIsShow} defIsShow={defIsShow}/>
            </FormLabel>
            {
                isShow
                &&
                <>
                    <Box display={"flex"} justifyContent="center" alignItems={"center"} gap={10}>          
                        { image 
                        ? 
                        <Box style={{width: 100, height: 100}} borderRadius={10} overflow="hidden"  boxShadow="0px 0px 20px gray">
                            <Image alt="" src={image} width={100} height={100} layout={'responsive'} /> 
                        </Box>
                        : 
                        null 
                        }
                        <Box border="1.5px dashed #319795" borderRadius={5} pos="relative" display={"flex"} flexDirection="column" alignItems={"center"} justifyContent="center" textAlign={"center"} p={5}>
                            <Box style={{width: 100, height: 100}} borderRadius={10} overflow="hidden">
                                <Image alt="" src={ ImageThumnail} width={100} height={100} layout={'responsive'} />
                            </Box>
                            <Text color={"gray.500"} mt={2}>Click or Drug & Drop</Text>
                            <Input   
                            {...register("inputText12")}
                            type={"file"} 
                            accept=" .png, .jpeg, .jpg, .svg"
                            onChange={ ImageSet }
                            cursor={"pointer"} w="100%" h="100%" pos={"absolute"} left={0} right={0} opacity={0} 
                            />
                        </Box>
                    </Box>
                </>
            }
        </FormControl>
    )
}