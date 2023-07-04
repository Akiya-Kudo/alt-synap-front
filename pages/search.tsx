import { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { TipsyPostsboard } from '../component/standalone/TipsyPostsBoard';
import { TabBord } from '../component/atom/bords';
import { TabButtonSelectGroup } from '../component/helper/TabRadioGroup';
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
                defaultValue='人気順' 
                m={"20px"}
                />
                <TipsyPostsboard query_text={query_text}/>
            </Box>
        </>
    )
}

export default Search