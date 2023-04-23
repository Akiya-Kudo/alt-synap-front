import React, { useEffect, useState } from "react"
import NextImage from 'next/image';
import { Box, Button, ButtonProps, Center, Flex, Heading, IconButton, Input, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Text, useDisclosure, Fade, Collapse, Divider } from "@chakra-ui/react"
import { PostPopoverProps } from "../../type/helper"
import { useGlassColorMode } from "../../util/hook/useColor"
import { GlassBord_foggy } from "../atom/bords"
import { NeumIconButton } from "../atom/buttons"
import { GlassFormInput_nolabel, PostImageInput } from "../atom/inputs"

export const TopImageInputPopover = ({
    errors, 
    register,
    formState,
    onChange,
    Icolor,
    value,
    id,
    title,
    icon,
    tooltipContent,
    ...props
}: PostPopoverProps) => {
    const { isOpen, onClose, onToggle } = useDisclosure()
    const { isOpen: T_isOpen, onOpen: T_onOpen, onClose: T_onClose } = useDisclosure()

    const {glass_bg_switch} = useGlassColorMode()

    const [image, setImage] = useState<string>("")
    const [imageFile, setImageFile] = useState<any>()
    return (
        <Popover
        {...props}
        placement="left"
        returnFocusOnClose={false} 
        isOpen={isOpen} onClose={onClose}
        >
            <PopoverTrigger>
                <Box 
                className="tooltip_hover_trigger" position={"relative"} onMouseOver={()=>{!isOpen && T_onOpen()}} onMouseOut={T_onClose} onClick={T_onClose}
                >
                    <NeumIconButton
                    icon={icon} 
                    aria-label="link_popover_trigger"
                    neumH={value ? "shallow" : "tall"}
                    color={value ? "tipsy_color_2" : undefined}
                    onClick={onToggle}
                    />
                    <Collapse in={T_isOpen}>
                        <GlassBord_foggy
                        className="tooltip_top_link"
                        position={"absolute"} top={-50} right={70}
                        minW={"350px"} p={"20px 30px"} 
                        fontSize={".7rem"}
                        flexDirection="column"
                        gap={3}
                        >
                            <Heading  size={"sm"} color={"tipsy_color_3"}>
                                <Center>{title}</Center>
                            </Heading>
                            <Divider />
                            { image 
                            ? <Box width='60%' height='auto' position='relative' bottom={1}><NextImage src={image} layout='responsive' objectFit='cover' alt='top_image' width={50} height={50} style={{ borderRadius: '20px' }} /></Box> 
                            : tooltipContent
                            }
                        </GlassBord_foggy>
                    </Collapse>
                </Box>
            </PopoverTrigger>
            <PopoverContent
            sx={{"-webkit-backdrop-filter": "blur(10px)"}}
            backdropFilter={"blur(10px)"}
            backgroundColor={glass_bg_switch}
            borderRadius={"15px"}
            >
                <PopoverArrow 
                sx={{"-webkit-backdrop-filter": "blur(10px)"}} backdropFilter={"blur(10px)"} backgroundColor={glass_bg_switch}
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
                        <Box>
                            <Text fontSize={".75rem"} pb={2}>
                                投稿のトップページに表示する画像を追加する
                            </Text>
                            <PostImageInput
                            id={id}
                            setImageFile={ setImageFile } 
                            image={ image } 
                            setImage={ setImage } 
                            register={ register } 
                            onChange={onChange} defaultValue={value}
                            />
                        </Box>
                    </Center>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}