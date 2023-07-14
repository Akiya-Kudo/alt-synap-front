import { NextPage } from 'next';
import { Box, Button, Center, Heading } from '@chakra-ui/react';
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
                {/* <Button onClick={handleTagDisplay}>click me</Button> */}
                {
                    isTagBoardDisplay ? <TipsyTagsBoard query_text={query_text} isDisplay={isTagBoardDisplay}/> : null
                }
                <Center my={3} w={"100%"} maxW={1100} flexDir={"column"} marginX="auto">
                    <DentBord 
                    w={130} h={"40px"} 
                    justifyContent="center" alignItems={"center"} 
                    my={3} borderRadius={"full"} 
                    position={"relative"}
                    >
                        {
                        isTagBoardDisplay ||
                        <SwitchButtonConcave 
                        onClick={handleTagDisplay}
                        position={"absolute"} left={200} top={2} h={6} fontSize={10} 
                        color={"white"} Hcolor={"whiteAlpha.600"} 
                        bgGradient={"linear(to-l, tipsy_color_2, tipsy_color_3)"} 
                        HbgGradient={"linear(to-l, tipsy_color_active_2, tipsy_color_active_3)"}
                        >
                            タグ検索ON
                        </SwitchButtonConcave>
                        }
                        <Heading size={"sm"}>Post</Heading>
                    </DentBord>
                </Center>
                <TipsyPostsboard query_text={query_text}/>
            </Box>
        </>
    )
}

export default Search