import { Box } from "@chakra-ui/react"
import Link from "next/link";
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

export const TitleText = ({
    children="Tipsy",
    bgClip="text", bgGradient="linear(to-tl, tipsy_gradient_1, tipsy_gradient_2, tipsy_gradient_3)",
    letterSpacing=5, fontWeight="bold",
    ...props
}: NeumTextProps) => {
    return (
        <Link href="/" passHref>
            <Box 
            {...props}
            bgGradient={bgGradient} bgClip={bgClip}
            letterSpacing={letterSpacing} fontWeight={fontWeight}
            >
                {children}
            </Box>
        </Link>
    )
}