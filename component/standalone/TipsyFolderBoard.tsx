import { Box, Center, Flex, Text, useDisclosure, VStack } from "@chakra-ui/react"
import { client } from "../../pages/_app"
import { Folder } from "../../type/global"
import { USER_FRAGMENT_FOLDER_ONLY } from "../../util/graphql/fragment/fragment.scheme"
import { CircleLoader, NeumLoader } from "../atom/loaders"
import { FolderCard, FolderCreateCard } from "../atom/folders"
import { AddIcon } from "@chakra-ui/icons"
import { useNeumorphismColorMode } from "../../util/hook/useColor"

const TipsyFolderBoard = ({uuid_uid}: {uuid_uid?: string}) => {
    const user = client.readFragment({
        id: `User:{"uuid_uid":"${uuid_uid}"}`,
        fragment: USER_FRAGMENT_FOLDER_ONLY
    })

    const { isOpen: isOpen_createfolder, onOpen: onOpen_createfolder, onClose: onClose_createfolder } = useDisclosure()
    const { highlight, shadow } = useNeumorphismColorMode()
return (
    <>
        <Center mb={5} w={"100%"} flexDir={"column"} gap={3} py={3}>
            {
                (user==null || user==undefined || !user?.folders) 
                ? <Center mt={20}><CircleLoader/></Center>
                : (
                    <FolderCreateCard onOpen={onOpen_createfolder} isOpen={isOpen_createfolder} onClose={onClose_createfolder}>
                        <Flex
                        width={"100%"} height={50}
                        p={3} 
                        align={"center"}
                        borderRadius={15}
                        transition={".3s"}
                        boxShadow={`inset 2px 2px 5px -2px ${shadow}, inset -2px -2px 5px -2px ${highlight};`}
                        _hover={{
                            boxShadow: `inset 0px 0px 2px ${shadow}, inset -0px -0px 2px ${highlight};`, 
                        }}
                        onClick={onOpen_createfolder}
                        >
                            <AddIcon color={"tipsy_color_2"} ms={3}/>
                            <Text ms={3} fontSize={".9rem"} color={"tipsy_color_2"}>Folderを新規作成</Text>
                        </Flex>
                    </FolderCreateCard>
                )
            }
            {
                user?.folders.length>0 && 
                user?.folders.map((folder: Folder) => {
                    return (
                        <FolderCard
                        fid={folder.fid}
                        title={folder.title}
                        top_image={folder.top_image}
                        />
                    )
                })
            }
            {
                user?.folders.length == 0 && (
                    <VStack m={5}>
                        <Text m={5}>Folderは見つかりませんでした</Text>
                        <Center p={5}><NeumLoader/></Center>
                    </VStack>
                )
            }
        </Center>
    </>
)
}

export default TipsyFolderBoard