import React, { useEffect, useState } from "react"
import { Avatar, AvatarGroup, Box, Center, Flex, Heading, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { GlassTag } from "../atom/tags"
import NextLink from 'next/link'
import { Collection, Link as LinkType, LinkCollection, LinkDisplaySwitchType, User } from "../../type/global";
import { LinkListItemDeletable } from "./ListItems";
import { GlassButton } from "../atom/buttons";
import { useMutation } from "@apollo/client";
import { REMOVE_COLLECTION } from "../../util/graphql/mutation/collections.mutation.scheme";
import { USER_QUERY } from "../../util/graphql/queries/users.query.schema";
import { auth } from "../../util/firebase/init";
import { COLLECTION_FRAGMENT_TO_LINKCOLLECTION, LINK_COLLECTION_FRAGMENT, USER_FRAGMENT_COLLECTION_ONLY } from "../../util/graphql/fragment/fragment.scheme";
import { client } from "../../pages/_app";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { ADD_LINK_TO_COLLECTION, DELETE_LINK, DELETE_LINK_COLLECTION } from "../../util/graphql/mutation/links.mutation.scheme";
import { GlassAlert } from "../atom/alerts";

export const CollectionEditModal = (
    {
        collection,
        isOpen, onOpen, onClose
    }: { collection: Collection, isOpen: any, onClose: any, onOpen: any}
) => {
    const [removeCollection, { data, error}] = useMutation(REMOVE_COLLECTION,{
        update( cache, { data: { remove_collection } } ) {
            const data: {user: User} | null = cache.readQuery({
                query: USER_QUERY,
                variables: {
                    uid: auth?.currentUser?.uid,
                },
            })
            if (data?.user?.uuid_uid) {
                const newCollections = data?.user?.collections?.filter(col => col.cid != remove_collection.cid )
                cache.writeFragment({
                    id: `User:{"uuid_uid":"${data?.user?.uuid_uid}"}`,
                    fragment: USER_FRAGMENT_COLLECTION_ONLY,
                    data: { collections: newCollections } 
                })
            }
        }
    })

    const handleDelete = (e: any) => {
        e.stopPropagation()
        removeCollection({ variables: { cid: collection.cid }})
    }

    if (error) alert("Delete failed Error: " + error)
    return (
        <Modal 
        isOpen={isOpen} 
        onClose={onClose} 
        size={"sm"}
        >
            <ModalOverlay 
            backdropFilter={"blur(2px)"} 
            bg="bg_transparent_reverse"
            />
            <ModalContent
            backdropFilter={"blur(17px)"}
            bg="bg_transparent"
            borderRadius={20}
            p={1}
            >
                <ModalHeader 
                borderTopRadius={20}
                >
                    <Flex fontSize="1rem">
                        <Box>{collection.collection_name}</Box>
                    </Flex>
                    <ModalCloseButton color={"text_light"}/>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {
                        collection.link_collections?.map(li_col => {
                            return (
                                <LinkListItemDeletable link={li_col.links} cid={collection.cid}/>
                            )
                        })
                    }
                    { collection.link_collections?.length==0 && "LINKが設定されていません。" }
                </ModalBody>
                <ModalFooter gap={4}>
                    <GlassButton 
                    size={"sm"} bg={"red_switch"} 
                    color={"bg_switch"} fontSize={".8rem"}
                    onClick={handleDelete}
                    _hover={{color: "red_switch", bg: "whiteAlpha.100"}}
                    >
                        Collecionを削除
                    </GlassButton>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export const LinkDetailModal = (
    {isOpen, onOpen, onClose, link}: {isOpen: any, onClose: any, onOpen: any, link: LinkType}
) => {
    return (
        <Modal
        isOpen={isOpen} 
        onClose={onClose} 
        size={"sm"}
        >
            <ModalOverlay
            backdropFilter={"blur(2px)"} 
            bg="bg_transparent_reverse"
            />
            <ModalContent
            backdropFilter={"blur(17px)"}
            bg="bg_transparent"
            borderRadius={20}
            p={1}
            >
                <ModalHeader
                borderTopRadius={20}
                >
                    <Flex fontSize="1rem" align={"center"} gap={4}>
                        <Avatar name={link.link_name} src={link.image_path} size={"sm"}/>
                        <Box>{link.link_name}</Box>
                        <GlassTag id="link_genre">{ "ジャンル"}</GlassTag>
                    </Flex>
                    <ModalCloseButton color={"text_light"}/>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody fontSize={".8rem"}>
                    <Text m={2}>作成：
                        <NextLink href={"/users/" + link.uuid_uid}>
                            <Box as={"span"} cursor={"pointer"} color={"tipsy_color_3"} _hover={{ textDecoration: "underline" }}>
                                { "作者したのは誰だ" }
                            </Box>
                        </NextLink>
                    </Text>
                    <Text m={2}>説明：<Box as={"span"}>{ link.explanation }</Box></Text>
                    <Text m={2}>プロトコル(URL)：
                        <NextLink href={link.url_scheme}>
                            <Box as={"span"} cursor={"pointer"} color={"tipsy_color_3"} _hover={{ textDecoration: "underline" }}>
                                { link.url_scheme }
                            </Box>
                        </NextLink>
                    </Text>
                    <Text m={2}>クエリ：<Box as={"span"}>{ link.query }</Box></Text>
                    <Text m={2}>結合子：<Box as={"span"}>{ link.joint }</Box></Text>
                    <Text m={2}>その他のクエリ：<Box as={"span"}>{ link.other_queries ? link.other_queries : "未設定" }</Box></Text>
                    <Text m={2}>Pathによる検索：<Box as={"span"}>{ link.is_path_search ? "ON" : "OFF" }</Box></Text>
                    <Text m={2}>作成日<Box as={"span"}>{ link.timestamp.toString().split("-", 3).join("/").split("T", 1) }</Box></Text>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export const LinkEditModal = (
    {isOpen, onOpen, onClose, link, uuid_uid, displayMode}: 
    {isOpen: boolean, onClose: ()=>void, onOpen: ()=>void, link: LinkType, uuid_uid: string, displayMode: LinkDisplaySwitchType}
) => {
    const { isOpen: isOpen_del_li, onOpen: onOpen_del_li, onClose: onClose_del_li } = useDisclosure()
    const { isOpen: isOpen_del_hi, onOpen: onOpen_del_hi, onClose: onClose_del_hi } = useDisclosure()

    const [AddLink, { error, data, loading }] = useMutation(ADD_LINK_TO_COLLECTION, {
        update( cache, { data: { add_link_to_collection } } ) {
            const col: Collection | null = cache.readFragment({
                id: `Collection:{"cid":${add_link_to_collection.cid}}`,
                fragment: LINK_COLLECTION_FRAGMENT
            })
            if (col) {
                const newLinkCollections = [...(col?.link_collections || []), add_link_to_collection];
                cache.writeFragment({
                    id: `Collection:{"cid":${add_link_to_collection.cid}}`,
                    fragment: COLLECTION_FRAGMENT_TO_LINKCOLLECTION,
                    data: { link_collections: newLinkCollections } 
                })
            }
        }
    })

    const [DeleteHistory] = useMutation(DELETE_LINK_COLLECTION, {
        update( cache, { data: { delete_link_collection }}) {
            console.log(delete_link_collection);
            delete_link_collection.forEach((li_col: any) => {
                const boolEvicted = cache.evict({ id: cache.identify(li_col) })
                console.log(boolEvicted);
            })
            //アプリ表示機能では直後では履歴画面には反映されないため、queryの結果を変える必要
            
        }
    })

    const [DeleteLink] = useMutation(DELETE_LINK, {
        update( cache, { data: { delete_link } } ) {
            cache.evict({ id: cache.identify(delete_link) })
            //わかんないけどcollectionsからlinkcollectionの参照が消える
            // とりあえずlinkCollectikonの削除は見送る
        }
    })

    const [collections, setCollections] = useState([])
    useEffect(()=>{
        if (isOpen) { //Modalを開いた時に初期readFragmentが行われる
            const user = client.readFragment({
                id: `User:{"uuid_uid":"${ uuid_uid }"}`,
                fragment: USER_FRAGMENT_COLLECTION_ONLY,
            })
            const selectableCollections = user.collections.filter(( col: Collection )=>{
                const usedLink = col.link_collections?.filter(li_col => li_col.lid == link.lid)
                return usedLink?.length == 0 || !usedLink
            })
            setCollections(selectableCollections);
        }
    },[isOpen])
        
    const handleAddLink = (cid: number) => {
        AddLink({ variables: {
            lid: link.lid,
            cid: cid,
            uuid_uid: uuid_uid
        }})
    }
    const handleDeleteHistory = () => {
        DeleteHistory({ variables: {
            lid: link.lid,
            uuid_uid: uuid_uid
        }})
        console.log(link.lid);
        console.log(uuid_uid);
        
        onClose_del_hi()
    }
    const handleDeleteLink = () => {
        DeleteLink({ variables: { lid: link.lid}})
        onClose_del_li()
    }
    
    return (
        <Modal
        isOpen={isOpen} 
        onClose={onClose} 
        size={"sm"}
        >
            <ModalOverlay
            backdropFilter={"blur(2px)"}  bg="bg_transparent_reverse"
            />
            <ModalContent
            backdropFilter={"blur(17px)"} bg="bg_transparent" borderRadius={20}
            p={1}
            >
                <ModalHeader
                borderTopRadius={20}
                >
                    <Flex fontSize="1rem" align={"center"} gap={4}>
                        <Avatar name={link.link_name} src={link.image_path} size={"sm"}/>
                        <Box>{link.link_name}</Box>
                        <GlassTag id="link_genre">{ "ジャンル"}</GlassTag>
                    </Flex>
                    <ModalCloseButton color={"text_light"}/>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody fontSize={".8rem"}>
                    <Text m={2}>作成：
                        <NextLink href={"/users/" + link.uuid_uid}>
                            <Box as={"span"} cursor={"pointer"} color={"tipsy_color_3"} _hover={{ textDecoration: "underline" }}>
                                { "作者したのは誰だ" }
                            </Box>
                        </NextLink>
                    </Text>
                    <Text m={2}>説明：<Box as={"span"}>{ link.explanation }</Box></Text>
                    <Text m={2}>プロトコル(URL)：
                        <NextLink href={link.url_scheme}>
                            <Box as={"span"} cursor={"pointer"} color={"tipsy_color_3"} _hover={{ textDecoration: "underline" }}>
                                { link.url_scheme }
                            </Box>
                        </NextLink>
                    </Text>
                    <Text m={2}>クエリ：<Box as={"span"}>{ link.query }</Box></Text>
                    <Text m={2}>結合子：<Box as={"span"}>{ link.joint }</Box></Text>
                    <Text m={2}>その他のクエリ：<Box as={"span"}>{ link.other_queries ? link.other_queries : "未設定" }</Box></Text>
                    <Text m={2}>Pathによる検索：<Box as={"span"}>{ link.is_path_search ? "ON" : "OFF" }</Box></Text>
                    <Text m={2}>作成日<Box as={"span"}>{ link.timestamp.toString().split("-", 3).join("/").split("T", 1) }</Box></Text>
                </ModalBody>
                <ModalFooter gap={4} position={"relative"}>
                    <Menu>
                        <MenuButton 
                        as={GlassButton} rightIcon={<ChevronDownIcon />}
                        size={"sm"} fontSize={".8rem"} 
                        color={"tipsy_color_2"} border={"1px"}
                        onClick={()=> {}}
                        >
                            追加
                        </MenuButton>
                        <MenuList
                        fontSize={".8rem"} p={1}
                        borderRadius={10}
                        bg="mock_glass_bg_switch"
                        position={"absolute"} top={"70px"} 
                        >
                            {
                                collections.map(( col: Collection ) => {
                                    return (
                                        <MenuItem
                                        id={col.cid.toString()}  key={col.cid}
                                        backgroundColor={"transparent"} fontWeight={"bold"} borderRadius={5}
                                        _hover={{backgroundColor: "rgba(130,130,130, 0.25)", color: "white"}}
                                        display={"flex"} justifyContent={"center"}
                                        onClick={() => handleAddLink(col.cid)}
                                        >
                                            <Heading size={"xs"} isTruncated>{ col.collection_name }</Heading>
                                        </MenuItem>
                                    )
                                })
                            }
                        </MenuList>
                    </Menu>
                    {
                        displayMode=="履歴" && 
                        <>
                        <GlassButton
                        size={"sm"} 
                        color={"red_switch"} fontSize={".8rem"}
                        onClick={()=>onOpen_del_hi()}
                        _hover={{color: "red.600", bg: "whiteAlpha.500"}}
                        >
                            履歴を削除
                        </GlassButton>
                        <GlassAlert 
                        isOpen={isOpen_del_hi} onOpen={onOpen_del_hi} onClose={onClose_del_hi} 
                        alertTitle={"履歴を削除する"} alertMessage={"削除した場合、復元はできません。本当に削除してよろしいですか"}
                        cancelMessage={"やめる"} handleExecute={handleDeleteHistory}
                        />
                        </>
                    }
                    { 
                        uuid_uid == link.uuid_uid &&
                        <>
                        <GlassButton
                        size={"sm"} bg={"red_switch"}
                        color={"bg_switch"} fontSize={".8rem"}
                        onClick={()=>onOpen_del_li()}
                        _hover={{color: "red_switch", bg: "whiteAlpha.100"}}
                        >
                            リンクを削除
                        </GlassButton>
                        <GlassAlert 
                        isOpen={isOpen_del_li} onOpen={onOpen_del_li} onClose={onClose_del_li} 
                        alertTitle={"LINKを削除する"} alertMessage={"削除した場合、復元はできません。本当に削除してよろしいですか"}
                        cancelMessage={"やめる"} handleExecute={handleDeleteLink}
                        />
                        </>
                    }
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}