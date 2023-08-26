import { Box, Center, Heading } from "@chakra-ui/react";
import React from "react";
import { Collection } from "../../type/global";
import { DentBord } from "../atom/bords";
import { AddCollectionPopover } from "../helper/AddCollectionPopover";
import { CollectionListItem } from "../helper/ListItems";

const CollectionSettingBoard = ({collections, uuid_uid}: {collections: Collection[], uuid_uid: string}) => {
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
                <AddCollectionPopover uuid_uid={uuid_uid}/>
            </DentBord>
        </>
    )
}

export default CollectionSettingBoard