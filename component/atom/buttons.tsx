import { Box } from "@chakra-ui/react";
import { MouseEventHandler } from "react";
import styles from "../../style/global/page/design.module.css";

type ButtonProps = {
    onClick?: MouseEventHandler<HTMLDivElement>,
    children?: string, 
    height?: string | number, 
    weight?: string | number, 
    borderR?: number, 
    fontSize?: number, 
    m?: number, 
    p?: number, 
    bg?: string, 
    hovCol?: string
}

export const ClickButtonStyle = ({ children = "hello", height = 50, weight = 100, borderR = 50, fontSize = 20, m = 0, p = 0, bg = "rgba(237, 237, 237, 0)", hovCol = "#f58627", onClick = () => null }: ButtonProps) => {
    return (
        <>
            <Box className={ styles.button } 
            bg={bg} 
            m={m} 
            w={weight} 
            h={height} 
            fontSize={ fontSize } 
            onClick={ onClick }
            _hover={{ color: hovCol }}
            borderRadius="50px" color={"#686868"} display="flex" justifyContent="center" alignItems="center" 
            >
                { children }
            </Box>
        </>
    )
}