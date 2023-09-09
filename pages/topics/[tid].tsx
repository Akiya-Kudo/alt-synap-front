import { useQuery } from '@apollo/client'
import { Avatar, Box, Center, Flex, Heading, Link, Stack, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FaHashtag } from 'react-icons/fa'
import { DentBord } from '../../component/atom/bords'
import { ClickButton } from '../../component/atom/buttons'
import { POSTS_SEARCH, POST_CONTENT_QUERY } from '../../util/graphql/queries/posts.query.scheme'
import { GET_TAG } from '../../util/graphql/queries/tags.query.scheme'
import { useColorRandomPick } from '../../util/hook/useColor'

const TipsyPostsSearchBoard = dynamic(
    () => import("../../component/standalone/TipsyPostsSearchBoard"),
    { ssr: false }
);

const TopicPage: NextPage = () => {
    const router = useRouter()
    const tid = parseInt( router.query.tid as string )

    const { loading, error, data } = useQuery(GET_TAG,  { variables: { tid: tid }})
    const colorList = useColorRandomPick(undefined, 9)
    
    if (error) console.log(error);
    return (
        <>
        <Head><title>Tipsy | タグ:{}</title></Head>
            <Flex flexDir={"column"} align={"center"} mt={5} className="page">
                <DentBord 
                maxW={"1100px"} w={"90%"} p={5} borderRadius={"30px"}
                justifyContent={"start"} flexDir={["column", "column", "row"]}
                >
                    { data?.tag?.tag_image ? 
                    <Avatar h={100} w={100} src={data?.tag?.tag_image} name={data?.tag.display_name} m={1}/> 
                    : 
                    <Box mr={.5} ps={1}><FaHashtag color={colorList[0].split("_")[0]} opacity={0.7} fontSize={"60px"}/></Box>
                    }
                    <Box>
                        <Heading ml={3} my={1}>{data?.tag.display_name}</Heading>
                        <Flex align={"center"}>
                            <Heading ml={3} my={1} fontSize={".75rem"}>Googleで調べる : </Heading>
                                <Link 
                                color={"tipsy_color_2"} fontSize={".75rem"} isExternal
                                href={`https://www.google.co.jp/search?q=${data?.tag.display_name}`}
                                >
                                    {`https://www.google.co.jp/search?q=${data?.tag.display_name}`}
                                </Link>
                        </Flex>
                    </Box>
                </DentBord>

                <TipsyPostsSearchBoard query_text={null} selectedTid={tid} isTagBoardDisplay/>
            </Flex>
        </>
    )
}

export default TopicPage