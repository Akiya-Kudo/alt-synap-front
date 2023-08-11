import { useLazyQuery, useQuery } from "@apollo/client";
import { Box, Center, Heading, Flex } from "@chakra-ui/react";
import React, {SetStateAction, Dispatch, useEffect, useState} from "react";
import { client } from "../../pages/_app";
import { Collection, Link, LinkCollection, LinkDisplaySwitchType } from "../../type/global";
import { LinkGenre, LinkGenreNames } from "../../type/standalone";
import { ALL_LINKCOLLECTIONS } from "../../util/graphql/fragment/fragment.scheme";
import { GET_LINKCOLLECTION_HISTORY, GET_PUBLISHED_LINKS, GET_USER_MADE_LINKS } from "../../util/graphql/queries/links.query.scheme";
import { FlatBord } from "../atom/bords";
import { BasicSelect } from "../atom/select";
import { LinkListItem } from "../helper/ListItems";
import { TabSwitchGroup_3 } from "../helper/TabRadioGroup";

const LinkSettingBoard = ({uuid_uid}: {uuid_uid: string}) => {

    const [displayLinks, setDisplayLinks] = useState<Link[] | undefined>([])
    const [displayMode, setDisplayMode] = useState<LinkDisplaySwitchType>("公開中")
    const [displayGenre, setDispayGenre] = useState<LinkGenre | null>(null)

    const { data: public_link_data } = useQuery( GET_PUBLISHED_LINKS );
    const [getUserLinkHistory] = useLazyQuery( GET_LINKCOLLECTION_HISTORY);
    const [getUserMadeLink] = useLazyQuery( GET_USER_MADE_LINKS );

    const allLinkCollections = client.readFragment({
        id: `User:{"uuid_uid":"${ uuid_uid }"}`,
        fragment: ALL_LINKCOLLECTIONS,
    })
    const usingLidMap = new Map(); //現在ユーザのCOllectionで使用されているLinkCollectionのlidを配列で所持
    allLinkCollections?.collections.forEach((col: Collection) => col.link_collections?.forEach((li_col: LinkCollection) => usingLidMap.set(li_col.lid, li_col.lid.toString() )))

    const handleMode = async (e: any) => {
        setDisplayMode(e)
        if ( e == "公開中") setDisplayLinks(public_link_data?.get_published_links)
        if ( e == "履歴" ) {
            //userのlinkCollectin全ての配列
            const linkCollections = await getUserLinkHistory({ variables: { uuid_uid: uuid_uid }}) 
            //一つもdeletedがfalseでないLinkを一意に取得する
            console.log(linkCollections.data?.get_link_collections_used);
            const linkMap = new Map();
            linkCollections.data?.get_link_collections_used.forEach(( li_col: LinkCollection )  => {
                if ( !linkMap.has(li_col.lid) && !usingLidMap.has(li_col.lid)) {
                    linkMap.set(li_col.lid, li_col.links);
                }
            })
            //Mapオブジェクトから配列を作成
            const uniqueLinks = Array.from(linkMap.values());
            setDisplayLinks(uniqueLinks)
        }
        if (e == "作成済み") {
            const links = await getUserMadeLink({ variables: { uuid_uid: uuid_uid }})
            setDisplayLinks(links.data.get_link_made_by_user)
        }
    }
    
    useEffect(()=>{setDisplayLinks(public_link_data?.get_published_links)},[public_link_data])
    
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => setDispayGenre(event.target.value ? parseInt(event.target.value) : null)
    return (
    <>
        <Center>
            <TabSwitchGroup_3
            optionLeft="公開中"
            optionCenter="履歴"
            optionRight="作成済み"
            defaultValue={displayMode}
            onChange={ handleMode }
            fontSize={10} gap={1} p={1} w={250}
            position={"relative"}
            isDisabledCenter={!uuid_uid} isDisabledRight={!uuid_uid}
            >
                <BasicSelect
                placeholder='条件なし' 
                position={"absolute"}
                left={300} top={3}
                onChange={handleSelectChange}
                >
                    { Object.entries(LinkGenreNames).map( ([key, name]) => <option value={parseInt(key)} >{name}</option>)}
                </BasicSelect>
            </TabSwitchGroup_3>
        </Center>
        <FlatBord h={"90%"} flexDirection={"column"} m={3}>
            <Box flexGrow={1} w={"100%"} h={"100px"} overflowY={"scroll"} p={2}>
                {displayLinks && 
                displayLinks?.filter((link: Link) => {
                    if (displayGenre || displayGenre==0) return link.genre == displayGenre
                    else return true
                }).map((link: Link) => {

                    return (
                        <LinkListItem link={link}  badgeLidArray={ Array.from(usingLidMap.values()) } displayMode={displayMode} uuid_uid={uuid_uid}/>
                    )
                })}
            { displayLinks && displayLinks.length == 0 && <Center w={"100%"} h={"100px"}>LINKが見つかりませんでした</Center> }
            </Box>
            <Flex w={"100%"} my={2} px={2} h={"50px"} align={"center"} borderRadius={10}
            fontSize={".8rem"}
            _hover={{ 
                filter: 'brightness(1.2)',
                bg: "whiteAlpha.500"
            }}
            >
                ＋ 新しい検索リンクを作成する
            </Flex>
        </FlatBord>
    </>
    )
}
    export default LinkSettingBoard