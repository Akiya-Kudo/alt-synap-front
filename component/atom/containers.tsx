import { Box, Center, Flex, Grid, GridItem, HStack, WrapItem } from "@chakra-ui/react"
import { GlassContainerProps } from "../../type/atom"

export const BasicHeaderStyleContainer = ({children}: GlassContainerProps) => {
    return (
        <Box
        zIndex={10} 
        w="100%" 
        h="100px" 
        position={"fixed" }
        boxShadow='xl'
        top={0}
        p={5}

        backdropFilter={"blur(6px)"}
        backgroundColor={"rgba(130,130,130, 0.15)"}
        
        borderBottom={"0.3px solid rgba(200,200,200, 0.7)"}
        borderBottomEndRadius={30}
        borderBottomStartRadius={30}
        >
            {children}
        </Box>
    )
}