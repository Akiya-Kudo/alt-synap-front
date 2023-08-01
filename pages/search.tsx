import { NextPage } from 'next';
import { AbsoluteCenter, Box, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import TipsyTagsBoard from '../component/standalone/TipsyTagsBoard';
import LinkBoard from '../component/standalone/LinkBoard';
import { makeVar, useReactiveVar } from '@apollo/client';

export const isTagBoardDisplayVar = makeVar(true as boolean)

const TipsyPostsboard = dynamic(
    () => import("../component/standalone/TipsyPostsBoard"),
    { ssr: false }
);
const Search: NextPage  = () => {
    const router = useRouter()
    const { query } = router
    const query_text = query.words as string

    const isTagBoardDisplay = useReactiveVar(isTagBoardDisplayVar)
    const handleTagDisplay = () => isTagBoardDisplayVar(!isTagBoardDisplay)

    return (
        <>
            <Flex className="page">
                <Box className='side-bar' 
                position={"fixed"}
                width={150} height={"90vh"}
                >
                    <AbsoluteCenter>
                        <LinkBoard
                        query_text={query_text}/>
                    </AbsoluteCenter>
                </Box>
                <Box flexGrow={1}>
                    {
                        isTagBoardDisplay ? <TipsyTagsBoard query_text={query_text} isDisplay={isTagBoardDisplay}/> : null
                    }
                    <TipsyPostsboard query_text={query_text} isTagBoardDisplay={isTagBoardDisplay} handleTagDisplay={handleTagDisplay}/>
                </Box>
            </Flex>
        </>
    )
}

export default Search