import React, { useEffect, useState } from "react"
import NextImage from 'next/image';
import { Box, Button, ButtonProps, Center, Flex, Heading, IconButton, Input, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Text, useDisclosure, Fade, Collapse, Divider, MenuList, MenuItem, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from "@chakra-ui/react"
import { ImageSetPopoverProps, PostPopoverProps, TopImagePopoverProps } from "../../type/helper"
import { useGlassColorMode } from "../../util/hook/useColor"
import { NeumIconButton } from "../atom/buttons"
import { GlassFormInput_nolabel, ImageInputDefault, PostImageInput } from "../atom/inputs"
import { ImagePathInputPopover } from './Popovers'

export const ImageSetPopover = ({
    id,
    register,
    title,
    children,
    setImage,
    setImageFile,
    setNoImageFile,
    setNewImagePath,
    beforeImage,
    ...props
}: ImageSetPopoverProps) => {
    const {glass_bg_switch} = useGlassColorMode()
    return (
        <Popover
        {...props}
        placement="auto"
        returnFocusOnClose={false} 
        >
            <PopoverTrigger>
                {children}
            </PopoverTrigger>
            <PopoverContent
            backdropFilter={"blur(7px)"}
            backgroundColor={glass_bg_switch}
            borderRadius={"15px"}
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
                    <Heading 
                    position={"relative"} // ImageInputDefaultのposition reativeを縫合
                    fontSize={".8rem"} p={2} 
                    backgroundColor={"transparent"} borderRadius={"10px"}
                    _hover={{backgroundColor: "rgba(130,130,130, 0.25)", color: "white"}}
                    >
                        画像をアップロード
                        <ImageInputDefault
                        id={id}
                        register={ register } 
                        setImage={ setImage } 
                        setImageFile={ setImageFile }
                        onChangeNoImageset={setNoImageFile}
                        />
                    </Heading>
                    
                    <ImagePathInputPopover 
                    handleImagePath={setNewImagePath} 
                    placement='bottom'
                    >
                        <Heading 
                        fontSize={".8rem"} p={2}
                        backgroundColor={"transparent"} borderRadius={"10px"}
                        _hover={{backgroundColor: "rgba(130,130,130, 0.25)", color: "white"}}
                        >
                            画像リンク(URL)を埋め込む
                        </Heading>
                    </ImagePathInputPopover>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}