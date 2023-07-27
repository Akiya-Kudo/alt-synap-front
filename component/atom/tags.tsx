import { Avatar, Box, Button, color, IconButton, Tag, TagCloseButton, TagLabel, TagProps, Text } from "@chakra-ui/react"
import { useState } from "react"
import { IoMdClose } from "react-icons/io"
import { GlassTagCloseProps, GlassTagProps, NeumTagProps } from "../../type/atom"
import { useNeumorphismColorMode } from "../../util/hook/useColor"
import { useNeumStyle_flat } from "../../util/hook/useTheme"
import { FaHashtag } from "react-icons/fa"

export const GlassTag_edit = ({
    children, id, onClick, size="md", variant="subtle", colorScheme="orange",
    borderRadius="full", border="1.5px solid", fontSize=".7rem",
    display="inline-flex", flexDirection="row", justifyContent="center", alignItems="center",
    m=1, key,
    ...props
}: GlassTagCloseProps) => {
    const handleDeleteClick=()=>{
        onClick(parseInt(id))
    }
    return (
        <Tag
        {...props}
        id={id} key={key}
        size={size}
        variant={variant}
        colorScheme={colorScheme}
        m={m} 
        border={border} borderRadius={borderRadius} fontSize={fontSize}
        display={display} flexDirection={flexDirection} justifyContent={justifyContent} alignItems={alignItems}
        >
            <TagLabel>{children}</TagLabel>
            <TagCloseButton 
            onClick={handleDeleteClick}
            />
        </Tag>
    )
}

export const GlassTag = ({
    children, id, onClick, size="md", variant="subtle", colorScheme="orange",
    borderRadius="full", border="1.5px solid", fontSize=".7rem",
    display="inline-flex", flexDirection="row", justifyContent="center", alignItems="center",
    m=1, key,
    ...props
}: GlassTagProps) => {
    return (
        <Tag
        {...props}
        id={id} key={key}
        size={size}
        variant={variant}
        colorScheme={colorScheme}
        m={m} 
        border={border} borderRadius={borderRadius} fontSize={fontSize}
        display={display} flexDirection={flexDirection} justifyContent={justifyContent} alignItems={alignItems}
        >
            <TagLabel>{children}</TagLabel>
        </Tag>
    )
}

export const NeumTag = ({
    colorScheme,
    tag_image, display_name,
    p=0.5, borderRadius=30,
    ...props
}: NeumTagProps) => {
    const { highlight, shadow } = useNeumorphismColorMode()
    return (
        <Tag
        {...props}
        // colorScheme={colorScheme}
        bg={"transparent"}
        p={p} borderRadius={borderRadius} 
        boxShadow={`3px 3px 5px ${shadow}, -3px -3px 5px ${highlight};` }
        transition={".2s"}
        _hover={{ boxShadow: `0px 0px 1px ${shadow}, -0px -0px 1px ${highlight};` }}
        >
            { tag_image ? 
            <Avatar src={tag_image} size='2xs' h={5} w={5} name={display_name} mr={2}/> 
            : 
            // <Box bg={colorScheme} borderRadius={"full"} mr={1} ml={1} opacity={0.5} h={2} w={2}/> 
            <Box mr={.5} ps={1}><FaHashtag color={colorScheme} opacity={0.7} fontSize={"12px"}/></Box>
            }
            <TagLabel fontSize={".6rem"} fontWeight={"bold"} color={"text_light"} mr={1}>{display_name}</TagLabel>
        </Tag>
    )
}