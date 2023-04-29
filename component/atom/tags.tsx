import { Box, Button, IconButton, Text } from "@chakra-ui/react"
import { useState } from "react"
import { IoMdClose } from "react-icons/io"
import { GlassTagProps } from "../../type/atom"

export const GlassTag_edit = ({
    children, id, onClick,
    bg="transparent", Tcolor="orange_switch", borderRadius="full", border="1.5px solid", fontSize=".7rem",
    display="inline-flex", flexDirection="row", justifyContent="center", alignItems="center",
    m=1,
    ...props
}: GlassTagProps) => {
    const handleDeleteClick=()=>{
        onClick(parseInt(id))
    }
    return (
        <Box
        {...props}
        id={id} 
        border={border} borderRadius={borderRadius} borderColor={Tcolor} bg={bg} color={Tcolor} fontSize={fontSize}
        m={m} h={6} w={"fit-content"} px={2}
        display={display} flexDirection={flexDirection} justifyContent={justifyContent} alignItems={alignItems}
        >
            {children}
            <IconButton 
            onClick={handleDeleteClick}
            icon={<IoMdClose/>} aria-label="delete-icon" 
            borderRadius="full" bg={"transparent"} border="1.5px solid" borderColor={"text_light"} color={"text_light"}
            h={4} w={4} ms={2} minW={0}
            />
        </Box>
    )
}