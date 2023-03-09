import { Box } from "@chakra-ui/react"
import styles from "../../style/atom/design.module.css";
import { BordProps } from "../../type/atom";



export const BordFlatStyle = ({children, color = "#686868", h = 50, w = 100, borderR = 50, fontSize = "1rem", m = 0, p = 0, bg = "rgba(237, 237, 237, 0)"}: BordProps) => {

    return (
        <>
            <Box
            className={ styles.bordFlat } 
            bg={bg} 
            m={m} 
            p={p}
            w={w} 
            h={h} 
            fontSize={ fontSize } 
            color={color}
            borderRadius={borderR}
            display="flex" justifyContent="center" alignItems="center"
            >
                { children }
            </Box>
        </>
    )
}

export const BordConvexStyle = ({children, color = "#686868", h, w, borderR = 50, fontSize = "1rem", m = 0, p = 0, bg = "rgba(237, 237, 237, 0)"}: BordProps) => {
    return (
        <>
            <Box
            className={ styles.bordConvex } 
            bg={bg} 
            m={m} 
            p={p}
            w={w} 
            h={h} 
            fontSize={ fontSize } 
            color={color}
            borderRadius={borderR}
            display="flex" justifyContent="center" alignItems="center"
            >
                { children }
            </Box>
        </>
    )
}