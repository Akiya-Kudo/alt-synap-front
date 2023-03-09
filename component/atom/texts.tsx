import { Box } from "@chakra-ui/react"
import styles from "../../style/atom/design.module.css";
import { TextProps } from "../../type/atom";



export const TextFlat = ({children = "hello", color = "#686868", fontSize = "1rem", m = 0, p = 0, bg = "rgba(237, 237, 237, 0)", letterSpacing}: TextProps) => {
    return (
        <>
            <Box className={ styles.textFlatHigh } letterSpacing={letterSpacing} color={color} fontSize={fontSize} m={m} p={p} bg={bg}>{children}</Box>
        </>
    )
}