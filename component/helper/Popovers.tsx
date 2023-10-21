import { Box, Collapse, Flex, Heading, IconButton, List, ListIcon, ListItem, PlacementWithLogical, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, useDisclosure } from "@chakra-ui/react"
import React, { ReactNode } from "react"
import { FaQuestion } from "react-icons/fa"
import { IoMdCheckmarkCircle } from "react-icons/io"
import { useGlassColorMode } from "../../util/hook/useColor"
import { GlassInputDefault } from "../atom/inputs"

export const ImagePathInputPopover = (
    {handleImagePath, defValue, children, placement, left, top}
    : {handleImagePath: (e: any) => void, defValue?: string, children: ReactNode, placement?: PlacementWithLogical | undefined, left?: number[], top?: string}
    ) => {
    const { onOpen, onClose, isOpen } = useDisclosure()
    const { isOpen: T_isOpen, onOpen: T_onOpen, onClose: T_onClose } = useDisclosure()
    const { mock_bg_switch} = useGlassColorMode()
    return (
        <>
            <Popover
            placement={placement}
            isOpen={isOpen} onOpen={onOpen} onClose={onClose}
            >
                <PopoverTrigger>
                    {children}
                </PopoverTrigger>   
                <PopoverContent
                backdropFilter={"blur(7px)"}
                backgroundColor={mock_bg_switch}
                borderRadius={"15px"}
                w={["300px", "400px"]} maxWidth={"100vw"}
                as="form" 
                left={left} top={top}
                >
                    <PopoverArrow
                    backgroundColor={mock_bg_switch}
                    />
                    <PopoverBody 
                    as={Flex} alignItems={"center"} justifyContent="center" 
                    gap={1}
                    >
                        <Heading fontSize={".7rem"} w={"80px"}>WEB画像URL</Heading>
                        <GlassInputDefault
                        placeholder="https://" PHcolor="text_light"
                        size={"xs"} 
                        onChange={handleImagePath} defaultValue={defValue}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault()
                                onClose()
                            }
                        }}
                        />
                        <IconButton 
                        aria-label="hint_image_path" icon={<FaQuestion/>} size={"xs"} borderRadius={"full"} color={"orange_switch"}
                        onMouseOver={()=>{T_onOpen()}} onMouseOut={T_onClose}
                        position={"relative"}
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
                            zIndex={10}
                            >
                                <Heading fontSize={".7rem"}>イメージのWebアドレス（URL）をコピーする方法</Heading>
                                <List spacing={3}>
                                    <ListItem>
                                        <ListIcon as={IoMdCheckmarkCircle} color='green.500' />
                                        {"マウスの右ボタンでインターネット上のイメージを右クリックします。"}
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon as={IoMdCheckmarkCircle} color='green.500' />
                                        {"イメージ(画像)のアドレス(場所・リンク)をコピーします"}
                                    </ListItem>
                                </List>
                            </Box>
                        </Collapse>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
            </>
    )
}