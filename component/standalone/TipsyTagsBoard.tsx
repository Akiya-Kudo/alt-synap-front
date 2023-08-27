import { useQuery } from "@apollo/client"
import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Center, Heading, IconButton } from "@chakra-ui/react"
import { isTagBoardDisplayVar } from "../../pages/search"
import { TAG_SEARCH } from "../../util/graphql/queries/tags.query.scheme"
import { useColorRandomPick } from "../../util/hook/useColor"
import { DentBord } from "../atom/bords"
import { SwitchButton_tab } from "../atom/buttons"
import { CircleLoader } from "../atom/loaders"
import { NeumTagList } from "../helper/TagList"

const TipsyTagsBoard = ({ query_text, isDisplay }: {query_text: string, isDisplay: boolean}) => {
    const { loading, error, data } = useQuery(TAG_SEARCH, {
        variables: { searchString:  query_text }
    })
    if (loading) return <Center mt={20}><CircleLoader/></Center>
    
    if (error) {
        return (
        <Center mt={20}>
            <Alert status='error' maxW={"70%"} borderRadius={10} variant='subtle' flexDirection='column' alignItems='center' justifyContent='center' textAlign='center' height='200px'>
                <AlertIcon />
                <AlertTitle>タグ検索でERRORが発生しました</AlertTitle>
                <AlertDescription>{error.name + " : " + error.message}</AlertDescription>
            </Alert>
        </Center>
        )
    }

    const colorList = useColorRandomPick(undefined, data.search_tag.length)

    const handleDisplay = () => isTagBoardDisplayVar(!isDisplay)
    return (
        <>
        {
        data.search_tag.length > 0 && (
            <Center>
                <DentBord
                display={"flex"} flexDirection={"column"}
                mx={10} mt={3} mb={1} p={4}
                w={1150}
                borderRadius={"30px"}
                position={"relative"}
                >
                    <DentBord w={130} h={"40px"} justifyContent="center" alignItems={"center"} borderRadius={"full"} mb={5}>
                            <Heading size={"sm"}>Topic</Heading>
                    </DentBord>
                    <SwitchButton_tab id={"a"} onClick={handleDisplay} position={"absolute"} right={3} top={2} size={"xs"} borderRadius={"full"} >×</SwitchButton_tab>
                    <NeumTagList
                    tags={data.search_tag} colorList={colorList}
                    gap={3}
                    />
                </DentBord>
            </Center>
        )}
        </>
    )
}

export default TipsyTagsBoard