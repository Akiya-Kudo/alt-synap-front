import { Box, Button, IconButton, Tag, TagCloseButton, TagLabel, Text } from "@chakra-ui/react"
import { useState } from "react"
import { IoMdClose } from "react-icons/io"
import { GlassTagProps } from "../../type/atom"

export const GlassTag_edit = ({
    children, id, onClick, size="md", variant="subtle", colorScheme="orange",
    borderRadius="full", border="1.5px solid", fontSize=".7rem",
    display="inline-flex", flexDirection="row", justifyContent="center", alignItems="center",
    m=1,
    ...props
}: GlassTagProps) => {
    const handleDeleteClick=()=>{
        onClick(parseInt(id))
    }
    return (
        <Tag
        {...props}
        id={id}
        size={size}
        key={id}
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