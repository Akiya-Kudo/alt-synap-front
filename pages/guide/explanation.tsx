import { Flex } from "@chakra-ui/react"
import { NextPage } from "next"
import Head from "next/head"
import { LinkHeader } from "../../component/layout/Header"

const Explanation: NextPage<{}>  = () => {
    return (
        <>
        <Head><title>Tipsy | Home</title></Head>
        <LinkHeader title={"tipsyについて"}/>
        <Flex flexDir={"column"} align={"center"} mt={5} className="page">
            説明
        </Flex>
        </>
    )
}

export default Explanation