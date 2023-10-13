import React, { useEffect, useState } from "react"
import NextImage from 'next/image';
import { Box, Button, ButtonProps, Center, Flex, Heading, IconButton, Input, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Text, useDisclosure, Fade, Collapse, Divider } from "@chakra-ui/react"
import { PostPopoverProps, TopImagePopoverProps } from "../../type/helper"
import { useGlassColorMode } from "../../util/hook/useColor"
import { NeumIconButton } from "../atom/buttons"
import { GlassFormInput_nolabel, PostImageInput } from "../atom/inputs"

export const TopImageInputPopover = ({
    errors, 
    register,
    formState,
    image,
    setImage,
    imageFile,
    setImageFile,
    id,
    title,
    icon,
    tooltipContent,
    ...props
}: TopImagePopoverProps) => {
    const { isOpen, onClose, onToggle } = useDisclosure()
    const { isOpen: T_isOpen, onOpen: T_onOpen, onClose: T_onClose } = useDisclosure()
    const {glass_bg_switch, mock_bg_switch} = useGlassColorMode()

    const [preViewImage, setPreViewImage] = useState(image)
    const handleImage = (photo:any) => {
        setPreViewImage(photo)
    }
    const handleTopImageNoselected = (e:any) => {
        setImageFile(null)
        setPreViewImage(image)
    }
    const handleImageDelete = () => {
        setImageFile("DELETE")
        setPreViewImage(null)
        // setImage(null)
    }
    useEffect(() => {
        setPreViewImage(image)
    },[image])
    return (
        <Popover
        {...props}
        returnFocusOnClose={false} 
        isOpen={isOpen} onClose={onClose}
        >
            <PopoverTrigger>
                <Box 
                className="tooltip_hover_trigger" position={"relative"} 
                onMouseOver={()=>{!isOpen && T_onOpen()}} onMouseOut={T_onClose} onClick={T_onClose}
                >
                    <NeumIconButton
                    icon={icon} 
                    aria-label="image_popover_trigger"
                    neumH={preViewImage ? "shallow" : "tall"}
                    color={preViewImage ? "tipsy_color_3" : undefined}
                    onClick={onToggle}
                    />
                    <Collapse in={T_isOpen}>
                        <Box
                        className="tooltip_top_image"
                        position={"absolute"} top={["35px", "45px", -50]} right={[-300, -350, 70]}
                        minW={["280px", "350px"]} p={"20px 30px"} 
                        fontSize={".8rem"}
                        flexDirection="column"
                        borderRadius={[10, 15]}
                        backgroundColor={mock_bg_switch}
                        >
                            <Heading  size={"sm"} color={"tipsy_color_3"}>
                                <Center>{title}</Center>
                            </Heading>
                            <Divider my={2}/>
                            { preViewImage 
                            ? <Box width='100%' height='auto' position='relative' bottom={1}><NextImage src={preViewImage} layout='responsive' objectFit='cover' alt='top_image' width={500} height={500} style={{ borderRadius: '20px' }} /></Box> 
                            : tooltipContent
                            }
                        </Box>
                    </Collapse>
                </Box>
            </PopoverTrigger>
            <PopoverContent
            backdropFilter={"blur(7px)"}
            backgroundColor={glass_bg_switch}
            borderRadius={[10, 15]}
            minW={["250px", "320px", "350px"]}
            >
                <PopoverArrow 
                backgroundColor={glass_bg_switch}
                />
                <PopoverCloseButton />
                <PopoverHeader>
                    <Heading  size={"sm"} color={"tipsy_color_3"}>
                        <Center>{title}</Center>
                    </Heading>
                </PopoverHeader>
                <PopoverBody>
                    <Center
                    py={2}
                    >
                        <Flex align={"center"} direction={"column"}>
                            <Text fontSize={".8rem"} pb={1}>
                                投稿のトップページに表示する画像を追加する
                            </Text>
                            <PostImageInput
                            id={id} mx={[1, 2, 5]} my={1}
                            register={ register } 
                            image={  preViewImage } 
                            setImage={ handleImage } 
                            setImageFile={ setImageFile }
                            onChangeNoImageset={handleTopImageNoselected}
                            />
                            {
                                image &&
                                <Flex
                                justify={"center"} borderRadius={10}
                                color={"red_switch"} w="300px" mt={2}
                                borderColor={"red_switch"} border={"1px"}
                                transition={".5s"}
                                _hover={{ color: "red.200" }}
                                onClick={handleImageDelete}
                                >
                                    画像を削除する
                                </Flex>
                            }
                        </Flex>
                    </Center>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}