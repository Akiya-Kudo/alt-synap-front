import { Box, Center, Flex, Text, useDisclosure, VStack } from "@chakra-ui/react"
import { client } from "../../pages/_app"
import { Folder } from "../../type/global"
import { USER_FRAGMENT_FOLDER_ONLY } from "../../util/graphql/fragment/fragment.scheme"
import { CircleLoader, NeumLoader } from "../atom/loaders"
import { FolderCard, FolderCreateCard } from "../atom/folders"

const TipsyFolderBoard = ({uuid_uid}: {uuid_uid?: string}) => {
    const user = client.readFragment({
        id: `User:{"uuid_uid":"${uuid_uid}"}`,
        fragment: USER_FRAGMENT_FOLDER_ONLY
    })
return (
    <>
        <Center mb={5} w={"100%"} flexDir={"column"} gap={3} py={3}>
            {
                (user==null || user==undefined || !user?.folders) 
                ? <Center mt={20}><CircleLoader/></Center>
                : (<FolderCreateCard/>
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
                        <Text m={5}>検索条件の投稿は見つかりませんでした</Text>
                        <Center p={5}><NeumLoader/></Center>
                    </VStack>
                )
            }
        </Center>
    </>
)
}

export default TipsyFolderBoard