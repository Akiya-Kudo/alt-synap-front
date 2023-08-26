import { Box, Flex } from "@chakra-ui/react"
import { NeumTextProps, StepGuideProps } from "../../type/atom";
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

export const StepGuide = ({guide, stepNum, ...props}: StepGuideProps) => {
    return (
        <Flex flexWrap={"nowrap"}  align={"center"} gap={3} {...props}>
            <Flex justify="center" align={"center"}>
                <Box
                width={5}
                height={5}
                borderRadius="full"
                backgroundColor={"tipsy_color_3"}
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize=".7rem"
                fontWeight="bold"
                color="white"
                >
                {stepNum}
                </Box>
            </Flex>
            <Box fontSize={".9rem"}>{guide}</Box>
        </Flex>
    )
}