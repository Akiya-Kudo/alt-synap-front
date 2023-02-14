import { Box } from "@chakra-ui/react"
import { NextPage } from "next"
import { ClickButtonStyle } from "../component/atom/buttons";
import styles from "../style/global/page/design.module.css";

const index: NextPage  = () => {

    const clickHandle = () => {
        return null
    }

    return (
        <>
            <div className="page">
                <Box bg={"#ededed"} display="flex" justifyContent="center" alignItems="center" h="60vh" >
                    <Box className={ styles.button } bg={"#ededed"} w={"10em"} h="3em" borderRadius="50px" color={"#686868"} display="flex" justifyContent="center" alignItems="center" _hover={{ color: "#f58627" }}>
                        TIPSY
                    </Box>
                    <ClickButtonStyle
                    onClick={ clickHandle }
                    height={10}
                    weight={500}
                    borderR={50}
                    fontSize={30}
                    m={100}
                    p={100}
                    // bg={"#ededed"}
                    hovCol={"#f58627"}
                    >Tipsを表示する</ClickButtonStyle>
                </Box>
            </div>
        </>
    )
}

export default index