import { Box, Button, ButtonProps, Center, Flex, Heading, IconButton, Input, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Text, useDisclosure, Fade, Collapse } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { FaLink } from "react-icons/fa"
import { PostPopoverProps } from "../../type/helper"
import { Validation_url } from "../../util/form/validation"
import { useGlassColorMode } from "../../util/hook/useColor"
import { GlassBord_foggy } from "../atom/bords"
import { NeumIconButton } from "../atom/buttons"
import { GlassFormInput_nolabel } from "../atom/inputs"

export const PostReferencePopover = ({
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
                    neumH={value!="" ? "shallow" : "tall"}
                    color={value!="" ? !errors[id] ? "tipsy_color_2": "red_switch" : undefined}
                    onClick={onToggle}
                    />
                    <Collapse in={T_isOpen}>
                        <GlassBord_foggy
                        className="tooltip_top_link"
                        position={"absolute"} top={0} right={70}
                        minW={"350px"} p={"20px 30px"} 
                        fontSize={".7rem"}
                        flexDirection="column"
                        gap={3}
                        >
                            <Heading  size={"sm"} color={"tipsy_color_2"}>
                                <Center>{title}</Center>
                            </Heading>
                            {tooltipContent}
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
                    <Heading  size={"sm"} color={"tipsy_color_2"}>
                        <Center>{title}</Center>
                    </Heading>
                </PopoverHeader>
                <PopoverBody>
                    <Center
                    py={2}
                    >
                        <Box>
                            <Text fontSize={".75rem"} pb={2}>
                                参照したwebページのURLを入力
                            </Text>
                            <GlassFormInput_nolabel
                            type="url"
                            id={id}
                            validation={Validation_url}
                            errors={errors} register={register} 
                            onChange={onChange} defaultValue={value}

                            h="30px" w={"300px"} fontSize={"0.8rem"}
                            placeholder={"https://"} PHcolor={"text_light"} focusBorderColor={"border_light_switch"}
                            />
                        </Box>
                    </Center>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}