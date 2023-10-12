import { NextPage } from 'next';
import { AbsoluteCenter, Box, Flex, useBreakpointValue, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import TipsyTagsBoard from '../component/standalone/TipsyTagsBoard';
import {NeumLinkBoard} from '../component/standalone/LinkBoard';
import { makeVar, useReactiveVar } from '@apollo/client';
import Head from 'next/head';
import { FlatBord } from '../component/atom/bords';
import { LinkCollectionFooter } from '../component/layout/Footer';

export const isTagBoardDisplayVar = makeVar(true as boolean)

const TipsyPostsSearchBoard = dynamic(
    () => import("../component/standalone/TipsyPostsSearchBoard"),
    { ssr: false }
);
const Search: NextPage  = () => {
    const router = useRouter()
    const query_text = router.query.words as string
    const isMobile = useBreakpointValue([true, true, false])

    const isTagBoardDisplay = useReactiveVar(isTagBoardDisplayVar)
    const handleTagDisplay = () => isTagBoardDisplayVar(!isTagBoardDisplay)
    
    return (
        <>
        <Head><title>Tipsy | 検索</title></Head>
            <Flex className="page" pb={"60px"}>
                {
                    !isMobile && 
                    <Flex className='side-bar' 
                    position={"sticky"}
                    width={120} height={"90vh"}
                    zIndex={100}  // collection選択menuが投稿一覧の下に表示されてしまうため設定
                    justify="end" align={"center"}
                    >
                        <VStack mt={10}>
                            <FlatBord
                            w={"70px"}
                            px={1} py={3} borderRadius={"full"}
                            flexDirection={"column"} gap={3}
                            neumH="shallow"
                            alignItems={"center"}
                            >
                                <NeumLinkBoard query_text={query_text} placement="right-end"/>
                            </FlatBord>
                        </VStack>
                    </Flex>
                }
                <Box flexGrow={1}>
                    {
                        isTagBoardDisplay ? <TipsyTagsBoard query_text={query_text} isDisplay={isTagBoardDisplay}/> : null
                    }
                    {

                    }
                    <TipsyPostsSearchBoard 
                    query_text={query_text} selectedTid={null}
                    isTagBoardDisplay={isTagBoardDisplay} 
                    handleTagDisplay={handleTagDisplay}
                    />
                </Box>
            </Flex>

            {
                isMobile && 
                <LinkCollectionFooter query_text={query_text}/>
            }
        </>
    )
}

export default Search