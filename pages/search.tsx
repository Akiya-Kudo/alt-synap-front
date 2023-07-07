import { NextPage } from 'next';
import { Box, Center } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { TabButtonSelectGroup } from '../component/helper/TabRadioGroup';
import dynamic from 'next/dynamic';
import TipsyTagsBoard from '../component/standalone/TipsyTagsBoard';

const TipsyPostsboard = dynamic(
    () => import("../component/standalone/TipsyPostsBoard"),
    { ssr: false }
);
const Search: NextPage  = () => {
    const router = useRouter()
    const { query } = router
    const query_text = query.words as string

    return (
        <>
            <Box className="page">
                    <TabButtonSelectGroup
                    onChange={ () =>{} } 
                    options={["StackOverFlow", "YouTube", "Tipsy", "Qiita", "その他"]}  
                    defaultValue='Tipsy' 
                    m={5}
                    borderRadius={"full"}
                    />
                <TipsyTagsBoard query_text={query_text}/>
                <TipsyPostsboard query_text={query_text}/>
            </Box>
        </>
    )
}

export default Search