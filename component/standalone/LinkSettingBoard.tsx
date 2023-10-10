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
import NextLink from 'next/link'

const LinkSettingBoard = ({uuid_uid}: {uuid_uid: string}) => {

    const [displayLinks, setDisplayLinks] = useState<Link[] | undefined>([])
    const [displayMode, setDisplayMode] = useState<LinkDisplaySwitchType>("公開中")
    const [displayGenre, setDispayGenre] = useState<LinkGenre | null>(null)

    const { data: public_link_data } = useQuery( GET_PUBLISHED_LINKS );
    const [getUserLinkHistory, {data: link_history_data}] = useLazyQuery( GET_LINKCOLLECTION_HISTORY);
    const [getUserMadeLink, {data: link_madeby}] = useLazyQuery( GET_USER_MADE_LINKS );
    
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
    
    useEffect(()=>{
        if (displayMode=="公開中" ) {
            setDisplayLinks(public_link_data?.get_published_links)
        }
    },[public_link_data])
    useEffect(()=>{
        if (displayMode=="作成済み" ) {
            setDisplayLinks(link_madeby?.get_link_made_by_user)
        }
    },[link_madeby])
    //linkがcollectionから削除され、writeQueryによりクエリのレスポンスが変更された時に発火し再表示する
    useEffect(()=>{ 
        if (displayMode=="履歴" ) {
            const linkMap = new Map();
            link_history_data?.get_link_collections_used.forEach(( li_col: LinkCollection )  => {
                if ( !linkMap.has(li_col.lid) && !usingLidMap.has(li_col.lid)) {
                    linkMap.set(li_col.lid, li_col.links);
                }
            })
            const uniqueLinks = Array.from(linkMap.values());
            setDisplayLinks(uniqueLinks)
        }
    },[link_history_data])
    
    const handleSelectGenre = (event: React.ChangeEvent<HTMLSelectElement>) => setDispayGenre(event.target.value ? parseInt(event.target.value) : null)
    return (
    <>
        <TabSwitchGroup_3
        optionLeft="公開中"
        optionCenter="履歴"
        optionRight="作成済み"
        defaultValue={displayMode}
        onChange={ handleMode }
        gap={1} p={1} mb={1} mt={-2.5}
        chFontSize={[5, 10, 12]} chH={["30px", "30px", "40px"]} chW={[100]}
        isDisabledCenter={!uuid_uid} isDisabledRight={!uuid_uid}
        />
        <FlatBord 
        h={"90%"} 
        w={["100%", "500px", "60vw"]} maxW={"95vw"}
        flexDirection={"column"} my={3} mx={2}
        >
            <Flex w={"100%"} justify="start" p={3}>
                <BasicSelect 
                w={[100, 100, 150]}
                placeholder='条件なし' 
                onChange={handleSelectGenre}
                >
                    { Object.entries(LinkGenreNames).map( ([key, name]) => <option value={parseInt(key)} key={parseInt(key)} >{name}</option>)}
                </BasicSelect>
            </Flex>
            <Box flexGrow={1} w={"100%"} h={"100px"} overflowY={"scroll"} p={2}>
                {displayLinks && 
                displayLinks?.filter((link: Link) => {
                    if (displayGenre || displayGenre==0) return link.genre == displayGenre
                    else return true
                }).map((link: Link, _i) => {

                    return (
                        <LinkListItem link={link}  badgeLidArray={ Array.from(usingLidMap.values()) } displayMode={displayMode} uuid_uid={uuid_uid} key={_i}/>
                    )
                })}
                { 
                displayLinks &&
                displayLinks?.filter((link: Link) => {
                    if (displayGenre || displayGenre==0) return link.genre == displayGenre
                    else return true
                }).length == 0 && 
                <Center w={"100%"} h={"100px"}>LINKが見つかりませんでした</Center> 
                }
            </Box>

            <NextLink href={"/user/link_create/"} >
                <Flex w={"100%"} my={2} px={4} h={["30px", "40px", "50px"]} align={"center"} borderRadius={10}
                fontSize={".8rem"}
                _hover={{
                    filter: 'brightness(1.2)',
                    bg: "whiteAlpha.500"
                }}
                >
                    ＋ 新しい検索リンクを作成する
                </Flex>
            </NextLink>
        </FlatBord>
    </>
    )
}
    export default LinkSettingBoard