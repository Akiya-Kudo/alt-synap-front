import { Box, useColorModeValue } from "@chakra-ui/react"
import styles from "../../style/atom/design.module.css";
import { BordProps } from "../../type/atom";
import { useNeumorphismColorMode } from "../../util/hook/useColor";

export const FlatBord = ({
    display="center", neumH="shallow", h,w, minH,minW,maxH,maxW,m,p,bg="transparent",
    bgg,color="text_normal",fs="1rem",fw="normal",br="20",children
}: BordProps) => {
    const { highlight, shadow } = useNeumorphismColorMode()
    const neumHeight = neumH=="shallow" ? `5px 5px 15px ${shadow}, -5px -5px 15px ${highlight};` : `15px 15px 30px ${shadow}, -15px -15px 30px ${highlight};`

    const isFlex = display=="center" || display=="column" ? "flex" : "block"
    const direction = display=="column" ? "column" : "row"
    return (
        <Box
        h={h} w={w} minH={minH} minW={minW} maxH={maxH} maxW={maxW} m={m} p={p} borderRadius={br}
        bg={bg} bgGradient={bgg} color={color} fontSize={fs} fontWeight={fw}
        display={isFlex} justifyContent={"center"} alignItems={"center"} flexDirection={direction}
        boxShadow={neumHeight}
        >
            {children}
        </Box>
    )
}

export const FullfyBord = ({
    display="center", neumH="shallow", h,w, minH,minW,maxH,maxW,m,p,bg="transparent",
    bgg,color="text_normal",fs="1rem",fw="normal",br="50",children
}: BordProps) => {
    const { highlight, shadow } = useNeumorphismColorMode()
    const neumHeight = neumH=="shallow" ? `5px 5px 15px ${shadow}, -5px -5px 15px  ${highlight}, inset -5px -5px 15px -3px ${shadow}, inset 5px 5px 15px -3px  ${highlight};` : `15px 15px 30px ${shadow}, -15px -15px 30px  ${highlight}, inset -15px -15px 30px -10px ${shadow}, inset 15px 15px 30px -10px  ${highlight};`
    
    const isFlex = display=="center" || display=="column" ? "flex" : "block"
    const direction = display=="column" ? "column" : "row"
    return (
        <Box
        h={h} w={w} minH={minH} minW={minW} maxH={maxH} maxW={maxW} m={m} p={p} borderRadius={br}
        bg={bg} bgGradient={bgg} color={color} fontSize={fs} fontWeight={fw}
        display={isFlex} justifyContent={"center"} alignItems={"center"} flexDirection={direction}
        boxShadow={neumHeight}
        >
            {children}
        </Box>
    )
}

export const DentBord = ({
    display="center", neumH="shallow", h,w, minH,minW,maxH,maxW,m,p,bg="transparent",
    bgg,color="text_normal",fs="1rem",fw="normal",br="50",children
}: BordProps) => {
    const { highlight, shadow } = useNeumorphismColorMode()
    const neumHeight = neumH=="shallow" ? `inset -5px -5px 15px -3px ${highlight}, inset 5px 5px 15px -3px  ${shadow};` : `inset -15px -15px 30px -10px ${highlight}, inset 15px 15px 30px -10px  ${shadow};`

    const isFlex = display=="center" || display=="column" ? "flex" : "block"
    const direction = display=="column" ? "column" : "row"
    return (
        <Box
        h={h} w={w} minH={minH} minW={minW} maxH={maxH} maxW={maxW} m={m} p={p} borderRadius={br}
        bg={bg} bgGradient={bgg} color={color} fontSize={fs} fontWeight={fw}
        display={isFlex} justifyContent={"center"} alignItems={"center"} flexDirection={direction}
        boxShadow={neumHeight}
        >
            {children}
        </Box>
    )
}

// shadow　&　highlight　の半透明バージョン
export const TabBord = ({
    display="center", neumH="shallow", h,w, minH,minW,maxH,maxW,m,p,bg="transparent",
    bgg,color="text_normal",fs="1rem",fw="normal",br="20",children
}: BordProps) => {
    const { highlight_transparent, shadow_transparent } = useNeumorphismColorMode()
    const neumHeight = neumH=="shallow" ? `5px 5px 15px ${shadow_transparent}, -5px -5px 15px ${highlight_transparent};` : `15px 15px 30px ${shadow_transparent}, -15px -15px 30px ${highlight_transparent};`

    const isFlex = display=="center" || display=="column" ? "flex" : "block"
    const direction = display=="column" ? "column" : "row"
    return (
        <Box
        h={h} w={w} minH={minH} minW={minW} maxH={maxH} maxW={maxW} m={m} p={p} borderRadius={br}
        bg={bg} bgGradient={bgg} color={color} fontSize={fs} fontWeight={fw}
        display={isFlex} justifyContent={"center"} alignItems={"center"} flexDirection={direction}
        boxShadow={neumHeight}
        zIndex={1}
        >
            {children}
        </Box>
    )
}