import { Box, Button, ButtonProps, Center, Flex, Heading, IconButton, Input, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Text } from "@chakra-ui/react"
import React, { useEffect } from "react"
import { FaLink } from "react-icons/fa"
import { PostPopoverProps } from "../../type/helper"
import { Validation_url } from "../../util/form/validation"
import { useGlassColorMode } from "../../util/hook/useColor"
import { NeumIconButton } from "../atom/buttons"
import { GlassFormInput_nolabel } from "../atom/inputs"

export const PostReferencePopover = ({
    errors, 
    register,
    formState,
    onChange,
    Icolor,
    value,
    ...props
}: PostPopoverProps) => {
    const id = "input_top_link"

    const {glass_bg_switch} = useGlassColorMode()
    return (
        <Popover
        {...props}
        placement="left"
        returnFocusOnClose={false} 
        >
            <PopoverTrigger>
                <NeumIconButton
                icon={<FaLink/>} 
                aria-label="link_popover_trigger"
                neumH={value!="" ? "shallow" : "tall"}
                color={value!="" ? !errors[id] ? "tipsy_color_2": "red_switch" : undefined}
                />
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
                        <Center>
                            WEBブックマーク
                        </Center>
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