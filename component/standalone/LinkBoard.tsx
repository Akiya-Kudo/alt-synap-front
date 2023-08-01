import { Avatar, Icon, IconButton } from '@chakra-ui/react';
import React from 'react';
import { IoMdSettings } from 'react-icons/io';
import { FaQuestion } from 'react-icons/fa';
import { BiCategoryAlt } from 'react-icons/bi';
import { DentBord, FlatBord, FullfyBord } from '../../component/atom/bords';
import { ClickButtonFlat } from '../../component/atom/buttons';
import Link from 'next/link';
import { useNeumorphismColorMode } from '../../util/hook/useColor';

const LinkBoard = ({query_text}: {query_text: string}) => {
    const handleLink = (url: string, query_name: string, query_joint: string) => {
        const joined_words = query_text?.toLowerCase().replace(/　/g, ' ').replace(' ', query_joint)
        const link_path = url + "?" + query_name + "=" + joined_words
        // router.push(link_path)
        window.open(link_path, '_blank'); // 新しいタブでリンクを開く
    }
    const { highlight, shadow } = useNeumorphismColorMode()
    return(
        <FlatBord
        height={"70vh"} p={1} borderRadius={"full"}
        flexDirection={"column"} gap={3}
        neumH="shallow"
        >
            <Link href={"/user/edit/link_setting"}>
                <FullfyBord
                transition={".3s"}
                h={"45px"} w={"45px"} neumH={"shallow"} _hover={{boxShadow: `2px 2px 10px ${shadow}, -2px -2px 10px  ${highlight}, inset -2px -2px 10px -3px ${shadow}, inset 2px 2px 10px -3px  ${highlight};`}}
                >
                    <Icon aria-label='link_setting' as={BiCategoryAlt} color="tipsy_color_2" />
                </FullfyBord>
            </Link>
            {data.map( link => {
                return (
                    <ClickButtonFlat
                    id={link.lid.toString()}
                    onClick={() => handleLink(link.url, link.query_name, link.query_joint)}
                    p={0}
                    >
                        <Avatar src={link.link_icon} name={link.link_name} size={"sm"}/>
                    </ClickButtonFlat>
                )
            })}
            <Link href={"/user/edit/link_setting"}>
                <DentBord 
                h={"45px"} w={"45px"} 
                >
                    <Icon aria-label='link_setting' as={IoMdSettings} color="tipsy_color_2" />
                </DentBord>
            </Link>
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