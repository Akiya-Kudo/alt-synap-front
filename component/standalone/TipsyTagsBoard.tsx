import { useQuery } from "@apollo/client"
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Center, Heading, Text, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { TAG_SEARCH } from "../../util/graphql/queries/tags.query.scheme"
import { useColorRandomPick, useGlassColorMode, useNeumorphismColorMode } from "../../util/hook/useColor"
import { DentBord } from "../atom/bords"
import { CircleLoader } from "../atom/loaders"
import { NeumTagList } from "../helper/TagList"

const TipsyTagsBoard = ({ query_text }: {query_text: string}) => {
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
    // const { highlight, shadow } = useNeumorphismColorMode()
    return (
        <>
        {
        data.search_tag.length > 0 && (
            <Center>
                <DentBord
                display={"flex"} flexDirection={"column"}
                mx={10} my={1} p={4}
                w={1000}
                borderRadius={40}
                >
                    <DentBord w={130} h={"40px"} justifyContent="center" alignItems={"center"} borderRadius={"full"} mb={5}>
                            <Heading size={"sm"}>Topic</Heading>
                    </DentBord>
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