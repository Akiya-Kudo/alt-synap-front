import { Box, Button, ButtonProps, Center, Flex, Heading, IconButton, Input, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Text, useDisclosure, Fade, Collapse, Divider, VStack } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { FaLink } from "react-icons/fa"
import { TagPopoverProps } from "../../type/helper"
import { Validation_url, Validation_word } from "../../util/form/validation"
import { useGlassColorMode } from "../../util/hook/useColor"
import { NeumIconButton } from "../atom/buttons"
import { GlassFormInput_nolabel } from "../atom/inputs"
import { GlassTag_edit } from "../atom/tags"
import { TagList } from "./TagList"

export const TagInputPopover = ({
    errors, 
    register,
    formState,
    value,
    id,
    title,
    icon,
    tooltipContent,
    setValue,
    onDeleteClick,
    ...props
}: TagPopoverProps) => {
    const { isOpen, onClose, onToggle } = useDisclosure()
    const { isOpen: T_isOpen, onOpen: T_onOpen, onClose: T_onClose } = useDisclosure()

    const {glass_bg_switch, mock_bg_switch} = useGlassColorMode()

    const [composing, setComposition] = useState(false);
    const startComposition = () => setComposition(true);
    const endComposition = () => setComposition(false);
    const handleKeyDown = (e:any) => {
        if (
            e.key === 'Enter' 
            && !errors.input_tags.message
            && !composing 
            && e.target.value!="" 
            && !value.includes(e.target.value)
            ) { //入力キーが"Enter"　かつ validation errorsが無い かつ 変換中じゃない かつ valueが入力済み かつ すでに追加済みじゃない　場合
            e.preventDefault();
            setValue(e)
            e.target.value = ""
        }
    }
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
                    aria-label="tag_popover_trigger"
                    neumH={value?.length!=0 ? "shallow" : "tall"}
                    color={value?.length!=0 ? "tipsy_color_1v2" : undefined}
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
                            <Heading  size={"sm"} color={"tipsy_color_1v2"}>
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
                    <Heading  size={"sm"} color={"tipsy_color_1v2"}>
                        <Center>{title}</Center>
                    </Heading>
                </PopoverHeader>
                <PopoverBody >
                    <VStack py={2}>
                        <Box>
                            <Text fontSize={".75rem"} pb={2}>
                                投稿に関連するトピックを単語で追加
                            </Text>
                            <GlassFormInput_nolabel
                            id={id}
                            validation={Validation_word(value)}
                            errors={errors} register={register}
                            onKeyDown={handleKeyDown} onCompositionStart={startComposition} onCompositionEnd={endComposition}
                            isDisabled={!(value && value.length < 5)}

                            h="40px" w={"300px"} fontSize={"0.8rem"}
                            placeholder={"Illustrator, GPT4, React..."} PHcolor={"text_light"} focusBorderColor={"border_light_switch"}
                            maxLength={50}
                            />
                        </Box>
                        <TagList 
                        tags={value}
                        colors={[
                            "red_switch","orange_switch","green_switch","teal_switch",
                            "blue_switch","cyan_switch","purple_switch","pink_switch"
                        ]}
                        mt={5}
                        onDeleteClick={onDeleteClick}
                        />
                    </VStack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}