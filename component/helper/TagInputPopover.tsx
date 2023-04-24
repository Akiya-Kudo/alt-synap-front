import { Box, Button, ButtonProps, Center, Flex, Heading, IconButton, Input, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Text, useDisclosure, Fade, Collapse, Divider } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { FaLink } from "react-icons/fa"
import { PostPopoverProps } from "../../type/helper"
import { Validation_url } from "../../util/form/validation"
import { useGlassColorMode } from "../../util/hook/useColor"
import { NeumIconButton } from "../atom/buttons"
import { GlassFormInput_nolabel } from "../atom/inputs"

export const TagInputPopover = ({
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

    const {glass_bg_switch, mock_bg_switch} = useGlassColorMode()
    return (
        <Popover
        {...props}
        placement="left"
        returnFocusOnClose={false} 
        isOpen={isOpen} onClose={onClose}
        >
            <PopoverTrigger >
                <Box 
                className="tooltip_hover_trigger" position={"relative"} 
                onMouseOver={()=>{!isOpen && T_onOpen()}} onMouseOut={T_onClose} onClick={T_onClose}
                zIndex={5}
                >
                    <NeumIconButton
                    icon={icon} 
                    aria-label="link_popover_trigger"
                    neumH={value!="" ? "shallow" : "tall"}
                    color={value!="" ? !errors[id] ? "tipsy_color_2": "red_switch" : undefined}
                    onClick={onToggle}
                    />
                    <Collapse in={T_isOpen}>
                        <Box
                        className="tooltip_top_link"
                        position={"absolute"} top={-50} right={70}
                        minW={"350px"} p={"20px 30px"} 
                        fontSize={".7rem"}
                        flexDirection="column"
                        borderRadius={15}
                        backgroundColor={mock_bg_switch}
                        >
                            <Heading  size={"sm"} color={"tipsy_color_2"}>
                                <Center>{title}</Center>
                            </Heading>
                            <Divider my={2}/>
                            {tooltipContent}
                        </Box>
                    </Collapse>
                </Box>
            </PopoverTrigger>
            <PopoverContent

            sx={{"-webkit-backdrop-filter": "blur(7px)"}}
            backdropFilter={"blur(7px)"}
            backgroundColor={glass_bg_switch}
            borderRadius={15}
            >
                <PopoverArrow 
                backgroundColor={glass_bg_switch}
                />
                <PopoverCloseButton />
                <PopoverHeader >
                    <Heading  size={"sm"} color={"tipsy_color_2"}>
                        <Center>{title}</Center>
                    </Heading>
                </PopoverHeader>
                <PopoverBody >
                    <Center
                    py={2}
                    >
                        <Box>
                            <Text fontSize={".75rem"} pb={2}>
                                内容を参照したwebページのURLを入力
                            </Text>
                        </Box>
                    </Center>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}