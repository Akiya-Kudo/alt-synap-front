import { Flex } from "@chakra-ui/react"
import { GlassContainerProps } from "../../type/atom"

export const HeaderStyleContainer = ({children}: GlassContainerProps) => {
    return (
        <Flex
        zIndex={10} 
        w="100%" 
        h="100px" 
        position={"fixed" }
        top="0"
        boxShadow='xl'
        alignItems='center' 
        gap={5}
        p={10}

        backdropFilter={"blur(6px)"}
        backgroundColor={"rgba(130,130,130, 0.15)"}
        
        borderBottom={"0.3px solid rgba(200,200,200, 0.7)"}
        borderBottomEndRadius={30}
        borderBottomStartRadius={30}
        >
            {children}
        </Flex>
    )
}