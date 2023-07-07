import { NextPage } from 'next';
import { Box, Link, Tag } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { TabButtonSelectGroup } from '../component/helper/TabRadioGroup';
import dynamic from 'next/dynamic';

const Tipsyboard = dynamic(
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
                m={"20px"}
                />
                <Tipsyboard query_text={query_text}/>
            </Box>
        </>
    )
}

export default Search