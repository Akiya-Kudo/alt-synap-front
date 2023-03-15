import { Box } from "@chakra-ui/react"
import { TextProps } from "../../type/atom";
import { useNeumorphismColorMode } from "../../util/hook/useColor";



export const TextFlat = ({children = "hello", neumH="shallow", color = "#686868", fs="1rem", m = 0, p = 0, bg = "rgba(237, 237, 237, 0)", letterSpacing}: TextProps) => {
    const { highlight, shadow } = useNeumorphismColorMode()
    const neumHeight = neumH=="shallow" ? `5px 5px 10px ${shadow}, -5px -5px 10px ${highlight};` : `7px 7px 14px ${shadow}, -7px -7px 14px ${highlight};`
    return (
        <>
            <Box textShadow={neumHeight} letterSpacing={letterSpacing} color={color} fontSize={fs} m={m} p={p} bg={bg}>{children}</Box>
        </>
    )
}