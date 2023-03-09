import { Highlight, HStack, chakra } from "@chakra-ui/react"
import { BordConvexStyle } from "../atom/bords"
import { TextFlat } from "../atom/texts"

export const WelcomTipsyBord = () => {
    return (
        <>
            <HStack fontWeight={"bold"} justify={"center"}>
                <TextFlat h={"100%"} w={"100%"} color={"orange.500"} fontSize={"7rem"} letterSpacing={"1rem"}>
                    <chakra.span color={"tipsy_light.400"} >T</chakra.span><chakra.span >T</chakra.span>
                    <Highlight query="T" styles={{color: "orange.200"}}>
                        Tipsy rrrr
                    </Highlight>
                </TextFlat>
                <BordConvexStyle h={200} w={200} fontSize={"2rem"} borderR={150}>tipsyrrrff</BordConvexStyle>
            </HStack>
            <HStack fontWeight={"medium"} justify={"center"}>
                <TextFlat h={"100%"} w={"100%"} color={"orange.500"} fontSize={"7rem"} letterSpacing={"1rem"}>
                    <chakra.span color={"tipsy_light.400"} >T</chakra.span><chakra.span >T</chakra.span>
                    <Highlight query="T" styles={{color: "orange.200"}}>
                        Tipsy rrrr
                    </Highlight>
                </TextFlat>
            </HStack>
        </>
    )
}