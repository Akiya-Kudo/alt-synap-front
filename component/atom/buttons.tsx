import { Box } from "@chakra-ui/react";
import styles from "../../style/atom/design.module.css";
import { ButtonProps } from "../../type/atom";


export const ClickButtonStyle = ({ children, color = "#686868", h, w, borderR = 50, fontSize = "1em", m = 0, p = 0, bg = "rgba(237, 237, 237, 0)", hovCol = "#f58627", onClick = () => null }: ButtonProps) => {
    return (
        <>
            <Box 
            className={ styles.button } 
            bg={bg} 
            m={m} 
            w={w} 
            h={h} 
            fontSize={ fontSize } 
            onClick={ onClick }
            _hover={{ color: hovCol }}
            borderRadius={borderR}
            color={color}
            display="flex" justifyContent="center" alignItems="center" 
            >
                { children }
            </Box>
        </>
    )
}