import { Box, Center, Flex, Grid, GridItem, HStack, WrapItem } from "@chakra-ui/react"
import { GlassContainerProps } from "../../type/atom"
import { useGlassColorMode } from "../../util/hook/useColor"

export const BasicHeaderStyleContainer = ({children}: GlassContainerProps) => {
    const {glass_bg_switch_natural} = useGlassColorMode()
    return (
        <Box
        zIndex={1100} 
        w="100%" 
        h="100px" 
        position={"fixed" }
        top={0}
        p={5}

        backgroundColor={glass_bg_switch_natural}
        sx={{
            "&::before": {
                content: '""',
                position: "absolute",
                width: "100%",
                height: "100%",
                backdropFilter: "blur(7px)",
                WebkitBackdropFilter: "blur(7px)",
                top: 0,
                left:0,
                zIndex: -10,
                borderBottom: "0.3px solid rgba(200,200,200, 0.7)",
                borderBottomEndRadius: 30,
                borderBottomStartRadius: 30,
                boxShadow:'xl',
            }
        }}
        borderBottomEndRadius={30}
        borderBottomStartRadius={30}
        >
            {children}
        </Box>
    )
}