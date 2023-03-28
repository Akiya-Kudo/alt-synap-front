import { Box } from "@chakra-ui/react"
import { NeumTextProps } from "../../type/atom";
import { useNeumorphismColorMode } from "../../util/hook/useColor";



export const FlatText = ({
    neumH="shallow", color="text_switch", bg = "transparent",
    ...props
}: NeumTextProps) => {
    const { highlight, shadow } = useNeumorphismColorMode()
    const neumHeight = neumH=="shallow" ? `5px 5px 10px ${shadow}, -5px -5px 10px ${highlight};` : `7px 7px 14px ${shadow}, -7px -7px 14px ${highlight};`
    return (
        <Box 
        {...props}
        textShadow={neumHeight} 
        color={color} bg={bg}
        />
    )
}