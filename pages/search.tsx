import { NextPage } from 'next';
import { Box, Button, Center, Heading, Highlight, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import TipsyTagsBoard from '../component/standalone/TipsyTagsBoard';
import { makeVar, useReactiveVar } from '@apollo/client';
import { useState } from 'react';
import { DentBord } from '../component/atom/bords';
import { ClickButton, SwitchButtonConcave, SwitchButton_tab } from '../component/atom/buttons';

export const isTagBoardDisplayVar = makeVar(false as boolean)

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
            <Box className="page">
                {
                    isTagBoardDisplay ? <TipsyTagsBoard query_text={query_text} isDisplay={isTagBoardDisplay}/> : null
                }
                <TipsyPostsboard query_text={query_text} isTagBoardDisplay={isTagBoardDisplay} handleTagDisplay={handleTagDisplay}/>
            </Box>
        </>
    )
}

export default Search