import { Box, Center, Heading } from "@chakra-ui/react";
import React from "react";
import { Collection } from "../../type/global";
import { DentBord } from "../atom/bords";
import { AddCollectionPopover } from "../helper/AddCollectionPopover";
import { CollectionListItem } from "../helper/ListItems";

const CollectionSettingBoard = ({collections, uuid_uid}: {collections: Collection[], uuid_uid: string}) => {
    
    return (
        <>
            <Center mb={4}>
                <DentBord 
                w={[150, 200, 250]}
                h={["20px", "30px", "40px"]} 
                justifyContent="center" alignItems={"center"} borderRadius={"full"}
                >
                    <Heading size={"xs"}>LINK - COLLECTIONS</Heading>
                </DentBord>
            </Center>
            <DentBord 
            h={["200px", "200px", "350px"]} borderRadius={"15px"} w={[ "90%","500px", "90%"]}
            maxW={"95%"}
            flexDirection={"column"} justifyContent={"space-between"}
            >
                <Box overflowY={"scroll"} borderRadius={15} w={"100%"} p={3}>
                    {collections?.map((col: Collection, _i) => {
                        return (
                            <CollectionListItem collection={col} key={_i}/>
                        )
                    })}
                </Box>
                <AddCollectionPopover uuid_uid={uuid_uid}/>
            </DentBord>
        </>
    )
}

export default CollectionSettingBoard