import { Box, Flex } from "@chakra-ui/react"
import { ForwardedRef, forwardRef } from "react"
import { GlassContainerProps } from "../../type/atom"
import { useGlassColorMode } from "../../util/hook/useColor"

export const BasicHeaderStyleContainer = ({children}: GlassContainerProps) => {
    const {glass_bg_switch_natural} = useGlassColorMode()
    return (
        <Box
        zIndex={1100} 
        w="100%" 
        // h="100px" 
        h={["50px", "70px", "90px"]}
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
                borderBottomEndRadius: [15, 20, 30],
                borderBottomStartRadius: [15, 20, 30],
                boxShadow:'xl',
            }
        }}
        borderBottomEndRadius={[15, 20, 30]}
        borderBottomStartRadius={[15, 20, 30]}
        >
            {children}
        </Box>
    )
}
export const BasicFooterStyleContainer = ({isOpen, children, ...props}: GlassContainerProps) => {
    const {glass_bg_switch_footer} = useGlassColorMode()
    return (
        <Flex
        {...props}
        zIndex={1100} 
        w={"100%"} 
        h={["50px", "70px", "90px"]}
        position={"fixed" }
        bottom={0}
        p={5}

        backgroundColor={glass_bg_switch_footer}
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
                borderTop: "0.3px solid rgba(200,200,200, 0.7)",
                borderTopEndRadius: [15, 20, 30],
                borderTopStartRadius: [15, 20, 30],
                boxShadow:'xl',
            }
        }}
        borderTopEndRadius={[15, 20, 30]}
        borderTopStartRadius={[15, 20, 30]}
        >
            {children}
        </Flex>
    )
}