import { Box, Button, IconButton, Tag, TagCloseButton, TagLabel, Text } from "@chakra-ui/react"
import { useState } from "react"
import { IoMdClose } from "react-icons/io"
import { GlassTagCloseProps, GlassTagProps } from "../../type/atom"

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