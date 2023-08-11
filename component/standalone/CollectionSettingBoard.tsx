import { Box, Center, Heading, Flex } from "@chakra-ui/react";
import React from "react";
import { Collection } from "../../type/global";
import { DentBord } from "../atom/bords";
import { CollectionListItem } from "../helper/ListItems";

const CollectionSettingBoard = ({collections}: {collections: Collection[]}) => {
    return (
        <>
            <Center h={"40px"} mb={4}>
                <DentBord w={250} h={"40px"} justifyContent="center" alignItems={"center"} borderRadius={"full"}>
                    <Heading size={"xs"}>LINK - COLLECTIONS</Heading>
                </DentBord>
            </Center>
            <DentBord 
            h={"350px"} borderRadius={15}
            flexDirection={"column"} justifyContent={"space-between"}
            >
                <Box overflowY={"scroll"} borderRadius={15} w={"100%"} p={3}>
                    {collections?.map((col: Collection) => {
                        return (
                            <CollectionListItem collection={col}/>
                        )
                    })}
                </Box>
                <Flex 
                w={"100%"} my={2} px={3} h={"50px"} align={"center"} borderRadius={10}
                fontSize={".8rem"}
                _hover={{ 
                    filter: 'brightness(1.2)',
                    bg: "whiteAlpha.500"
                }}
                >
                    ＋ 新しい COLLECTION を作成する
                </Flex>
            </DentBord>
        </>
    )
}

export default CollectionSettingBoard