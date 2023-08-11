import { Box, Button, ButtonProps, Center, Flex, Heading, IconButton, Input, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Text, useDisclosure, Fade, Collapse, Divider } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { FaLink } from "react-icons/fa"
import { TopLinkPopoverProps } from "../../type/helper"
import { Validation_url } from "../../util/form/validation"
import { useGlassColorMode } from "../../util/hook/useColor"
import { NeumIconButton } from "../atom/buttons"
import { GlassFormInput_nolabel } from "../atom/inputs"

export const TopLinkInputPopover = ({
    errors, 
    register,
    formState,
    setValue,
    value,
    id,
    title,
    icon,
    tooltipContent,
    ...props
}: TopLinkPopoverProps) => {
    const { isOpen, onClose, onToggle } = useDisclosure()
    const { isOpen: T_isOpen, onOpen: T_onOpen, onClose: T_onClose } = useDisclosure()
    const {glass_bg_switch, mock_bg_switch} = useGlassColorMode()

    const handleChange = (e:any) => {
        setValue(e)
    }
    return (
        <Popover
        {...props}
        placement="left"
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
                    aria-label="link_popover_trigger"
                    neumH={value!="" && value!=null ? "shallow" : "tall"}
                    color={value!="" && value!=null ? !errors[id] ? "tipsy_color_2": "red_switch" : undefined}
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
                            { value
                                ? !errors[id]
                                    ? <Text>{value}</Text>
                                    : <Box role="alert" color="red_switch">有効なURLを入力してください</Box>
                                : <Box >{tooltipContent}</Box>
                            }
                        </Box>
                    </Collapse>
                </Box>
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
                                内容を参照したwebページのURLを入力
                            </Text>
                            <GlassFormInput_nolabel
                            type="url"
                            id={id}
                            validation={Validation_url}
                            errors={errors} register={register} 
                            onChange={handleChange} defaultValue={value!=null ? value : undefined}

                            h="35px" w={"300px"} fontSize={"0.8rem"}
                            placeholder={"https://"} PHcolor={"text_light"} focusBorderColor={"border_light_switch"}
                            />
                        </Box>
                    </Center>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}