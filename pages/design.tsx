import { Box } from "@chakra-ui/react"
import { NextPage } from "next"
import styles from "../styles/design.module.css";

const index: NextPage  = () => {

    return (
        <>
            <div className="page">
                <Box bg={"#ededed"} display="flex" justifyContent="center" alignItems="center" h="60vh" >
                    <Box className={ styles.button } bg={"#ededed"} w={"10em"} h="3em" borderRadius="50px" color={"#686868"} display="flex" justifyContent="center" alignItems="center" _hover={{ color: "#f58627" }}>
                        TIPSY
                    </Box>
                </Box>
            </div>
        </>
    )
}

export default index