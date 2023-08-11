import { Avatar, Center, Icon, IconButton, MenuButton, Spinner } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { IoMdSettings } from 'react-icons/io';
import { FaQuestion } from 'react-icons/fa';
import { DentBord, FlatBord, FullfyBord } from '../../component/atom/bords';
import { ClickButtonFlat } from '../../component/atom/buttons';
import Link from 'next/link';
import { useNeumorphismColorMode } from '../../util/hook/useColor';
import { LinkSelectboard } from '../helper/LinkSelectMenu';
import { client } from '../../pages/_app';
import { auth } from '../../util/firebase/init';
import { USER_COLLECTION_FRAGMENT, USER_QUERY } from '../../util/graphql/queries/users.query.schema';
import { AuthContext } from '../../util/hook/authContext';
import { Collection } from '../../type/global';
import { BiCategoryAlt } from 'react-icons/bi';

const LinkBoard = ({query_text}: {query_text: string}) => {

    const { userState } = useContext(AuthContext);
    const [collection, setCollection] = useState<Collection[]>([])
    const [displayCid, setDlisplayCid] = useState<number | undefined>(undefined)
    
    useEffect(() => {
        const read_collections = client.readQuery({
            query: USER_QUERY,
            variables: {
                uid: auth.currentUser?.uid,
            },
        });
        setCollection(read_collections?.user?.collections)
        setDlisplayCid(read_collections?.user?.collections[0]?.cid)
    }, [userState]);
    
    const handleSelect = (cid: number) => setDlisplayCid(cid)

    const handleLink = (url: string, query_name: string, query_joint: string) => {
        const joined_words = query_text?.toLowerCase().replace(/　/g, ' ').replace(' ', query_joint)
        const link_path = url + "?" + query_name + "=" + joined_words
        window.open(link_path, '_blank'); // 新しいタブでリンクを開く
    }

    const { highlight, shadow } = useNeumorphismColorMode()
    return(
        <FlatBord
        height={"70vh"} p={1} borderRadius={"full"}
        flexDirection={"column"} gap={3}
        neumH="shallow"
        >
            <>
            <LinkSelectboard title={"- COLLECTIONを選択 -"} collections={collection} handleClick={handleSelect}>
                <MenuButton
                transition={".3s"}
                h={"45px"} w={"45px"} borderRadius={"full"}
                boxShadow={`5px 5px 15px ${shadow}, -5px -5px 15px  ${highlight}, inset -5px -5px 15px -3px ${shadow}, inset 5px 5px 15px -3px  ${highlight};`}
                _hover={{
                    boxShadow: `2px 2px 10px ${shadow}, -2px -2px 10px  ${highlight}, inset -2px -2px 10px -3px ${shadow}, inset 2px 2px 10px -3px  ${highlight};`,
                    fontSize: ".95rem"
                }}
                >
                    <Center><Icon aria-label='link_setting' as={BiCategoryAlt} color="tipsy_color_2" /></Center>
                </MenuButton>
            </LinkSelectboard>
            {
                collection && displayCid && collection.find(col => col.cid == displayCid)?.link_collections?.map(li_col => {
                    return (
                        <ClickButtonFlat
                        id={li_col.lid?.toString()}
                        onClick={() => handleLink(li_col.links.url_scheme, li_col.links.query, li_col.links.joint)}
                        p={0}
                        >
                            <Avatar src={li_col.links.image_path} name={li_col.links.link_name} size={"sm"}/>
                        </ClickButtonFlat>
                    )
                })
            }
            <Link href={"/user/edit/link_setting"}>
                <DentBord 
                h={"45px"} w={"45px"} 
                >
                    <Icon aria-label='link_setting' as={IoMdSettings} color="tipsy_color_2" />
                </DentBord>
            </Link>
            </>
        </FlatBord>
    )
}

export default LinkBoard

export const data = [
    {
        lid: 1,
        link_icon: "https://cdn.imgbin.com/3/12/23/imgbin-google-pSzwF41a4Xjza6ydKK0wQZgjq.jpg",
        link_name: "Google",
        url: "https://www.bing.com/search",
        query_name: "q",
        query_joint: "+",
        uuid_uid: "4f92df84-eca9-4a9c-a64e-c9cdfdcaaa46",
        publish: true,
    },
    {
        lid: 2,
        link_icon: "https://th.bing.com/th/id/OIP.uQlQc1ej3xTRMpywzGuFvAHaHw?pid=ImgDet&rs=1",
        link_name: "Twitter",
        url: "https://twitter.com/search",
        query_name: "q",
        query_joint: "%20",
        uuid_uid: "4f92df84-eca9-4a9c-a64e-c9cdfdcaaa46",
        publish: true,
    },
    {
        lid: 3,
        link_icon: "https://www.sagamax.cyou/images/icon_qiita.png",
        link_name: "Qiita",
        url: "https://qiita.com/search",
        query_name: "q",
        query_joint: "+",
        uuid_uid: "4f92df84-eca9-4a9c-a64e-c9cdfdcaaa46",
        publish: true,
    },
    {
        lid: 4,
        link_icon: "https://th.bing.com/th/id/OIP.NIeqJOiiXTgXEhOjQckIvQHaHa?pid=ImgDet&rs=1",
        link_name: "Zenn",
        url: "https://zenn.dev/search",
        query_name: "q",
        query_joint: "%2520",
        uuid_uid: "4f92df84-eca9-4a9c-a64e-c9cdfdcaaa46",
        publish: true,
    },
    {
        lid: 5,
        link_icon: "https://th.bing.com/th/id/OIP.vQLzC0qMv8odxkXW1JwlhwHaHa?pid=ImgDet&w=768&h=768&rs=1",
        link_name: "Netflix",
        url: "https://www.netflix.com/search",
        query_name: "q",
        query_joint: "%20",
        uuid_uid: "4f92df84-eca9-4a9c-a64e-c9cdfdcaaa46",
        publish: true,
    },
    {
        lid: 6,
        link_icon: "https://th.bing.com/th/id/OIP.Zqez7MQnPnxA_ivGrJjF0QHaHa?pid=ImgDet&rs=1",
        link_name: "Pinterest",
        url: "https://www.pinterest.jp/search",
        query_name: "q",
        query_joint: "%20",
        uuid_uid: "4f92df84-eca9-4a9c-a64e-c9cdfdcaaa46",
        publish: true,
    },
]

export const collections_data = [
    
]