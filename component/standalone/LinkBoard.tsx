import { Avatar, Box, Center, Flex, Icon, MenuButton, ResponsiveValue, useDisclosure } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { IoMdSettings } from 'react-icons/io';
import { DentBord } from '../../component/atom/bords';
import { ClickButtonFlat, GlassIconButton, NeumIconButton } from '../../component/atom/buttons';
import Link from 'next/link';
import { useNeumorphismColorMode } from '../../util/hook/useColor';
import { LinkSelectMenu } from '../helper/LinkSelectMenu';
import { client } from '../../pages/_app';
import { auth } from '../../util/firebase/init';
import { USER_QUERY } from '../../util/graphql/queries/users.query.schema';
import { AuthContext, LoginToggleContext } from '../../util/hook/authContext';
import { Collection, Link as LinkType } from '../../type/global';
import { BiCategoryAlt } from 'react-icons/bi';
import {useLinkSearch} from '../../util/hook/useLink'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { SET_TOP_COLLECTION } from '../../util/graphql/mutation/collections.mutation.scheme';
import { GET_GUEST_COLLECTIOINS } from '../../util/graphql/queries/links.query.scheme';
import { GlassLinkDisplay, NeumLinkDisplay } from '../helper/LinkDisplay'
import { FaQuestion } from 'react-icons/fa';

export const NeumLinkBoard = ({
    query_text, flexDirection="column", direction="column",
}: {
    query_text: string, flexDirection?: ResponsiveValue<any> | undefined, direction?: "column" | "row",
}) => {
    const { onClose, isOpen, onToggle } = useDisclosure()
    const { onOpen_login,  } = useContext(LoginToggleContext);

    const { userState } = useContext(AuthContext);
    const [collections, setCollections] = useState<Collection[]>([])
    const [displayCid, setDlisplayCid] = useState<number | undefined>(undefined)

    const [setTopCollection] = useMutation(SET_TOP_COLLECTION)
    const [getGuestCollections] = useLazyQuery(GET_GUEST_COLLECTIOINS)
    
    useEffect(() => {
        if (userState=="isUser") {
            const read_collections = client.readQuery({
                query: USER_QUERY,
                variables: {
                    uid: auth.currentUser?.uid,
                },
            });
            setCollections(read_collections?.user?.collections ? read_collections?.user?.collections : [])
            // return index, if the collection is not find in array => return -1
            const top_collection = read_collections?.user?.collections.find((collection: Collection) => collection.cid == read_collections?.user?.top_collection)
            setDlisplayCid( top_collection ? top_collection.cid : read_collections?.user?.collections[0]?.cid )
        } else if (userState=="guest") {
            getGuestCollections().then(res => {
                setCollections(res.data.get_guest_collections)
                setDlisplayCid(res.data.get_guest_collections[0]?.cid)
            })
        }
    }, [userState]);
    
    
    const handleSelect = (cid: number) => {
        setDlisplayCid(cid)
        if (userState=="isUser") setTopCollection({variables: { cid: cid }})
    }

    const handleLink = (link: LinkType) => useLinkSearch(link, query_text)

    const { highlight, shadow } = useNeumorphismColorMode()
    return(
        <>
            <LinkSelectMenu 
            title={"- COLLECTIONを選択 -"} collections={collections} handleClick={handleSelect}
            onClose={onClose} isOpen={isOpen}
            placement={'bottom'}
            >
                <MenuButton
                transition={".3s"}
                h={"45px"} w={"45px"} borderRadius={"full"} p={3}
                boxShadow={`5px 5px 15px ${shadow}, -5px -5px 15px  ${highlight}, inset -5px -5px 15px -3px ${shadow}, inset 5px 5px 15px -3px  ${highlight};`}
                _hover={{
                    boxShadow: `2px 2px 10px ${shadow}, -2px -2px 10px  ${highlight}, inset -2px -2px 10px -3px ${shadow}, inset 2px 2px 10px -3px  ${highlight};`,
                    fontSize: ".95rem"
                }}
                onClick={onToggle}
                >
                    <Center><Icon aria-label='link_setting' as={BiCategoryAlt} color="tipsy_color_2" /></Center>
                </MenuButton>
            </LinkSelectMenu>
            
            <NeumLinkDisplay 
            collection={collections && collections.find(col => col.cid == displayCid)} 
            handleLink={handleLink}
            direction={direction}
            h={direction=="column" ? 270 : undefined } 
            w={direction=="row" ? 390 : undefined}
            />

            {
                userState=="isUser" ?
                <Link href={"/user/edit/link_setting"}>
                    <DentBord 
                    h={"45px"} w={"45px"} p={3}
                    >
                        <Icon aria-label='link_setting' as={IoMdSettings} color="tipsy_color_2" />
                    </DentBord>
                </Link>
                :
                <DentBord 
                h={"30px"} w={"30px"} p={3}
                >
                    <Icon fontSize={".9rem"} aria-label='link_setting' as={FaQuestion} color="orange" />
                </DentBord>
            }
        </>
    )
}

export const GlassLinkBoard = ({
    query_text, flexDirection="column", direction="column", flexGrow,
}: {
    query_text: string, flexDirection?: ResponsiveValue<any> | undefined, direction?: "column" | "row", flexGrow?: number,
}) => {
    const { onClose, isOpen, onToggle } = useDisclosure()

    const { userState } = useContext(AuthContext);
    const [collections, setCollections] = useState<Collection[]>([])
    const [displayCid, setDlisplayCid] = useState<number | undefined>(undefined)

    const [setTopCollection] = useMutation(SET_TOP_COLLECTION)
    const [getGuestCollections] = useLazyQuery(GET_GUEST_COLLECTIOINS)
    
    useEffect(() => {
        if (userState=="isUser") {
            const read_collections = client.readQuery({
                query: USER_QUERY,
                variables: {
                    uid: auth.currentUser?.uid,
                },
            });
            setCollections(read_collections?.user?.collections ? read_collections?.user?.collections : [])
            // return index, if the collection is not find in array => return -1
            const top_collection = read_collections?.user?.collections.find((collection: Collection) => collection.cid == read_collections?.user?.top_collection)
            setDlisplayCid( top_collection ? top_collection.cid : read_collections?.user?.collections[0]?.cid )
        } else if (userState=="guest") {
            getGuestCollections().then(res => {
                setCollections(res.data.get_guest_collections)
                setDlisplayCid(res.data.get_guest_collections[0]?.cid)
            })
        }
    }, [userState]);
    
    
    const handleSelect = (cid: number) => {
        setDlisplayCid(cid)
        if (userState=="isUser") setTopCollection({variables: { cid: cid }})
    }

    const handleLink = (link: LinkType) => useLinkSearch(link, query_text)
    return (
        <Flex align={"center"} flexGrow={flexGrow} mx={1}>
            <LinkSelectMenu 
            title={"- COLLECTIONを選択 -"} collections={collections} handleClick={handleSelect}
            onClose={onClose} isOpen={isOpen}
            position={"absolute"} bottom={10} left={10}
            >
                <MenuButton
                as={GlassIconButton}
                transition={".3s"}
                onClick={onToggle}
                >
                    <Center><Icon aria-label='link_setting' as={BiCategoryAlt} color="tipsy_color_2" /></Center>
                </MenuButton>
            </LinkSelectMenu>

            <GlassLinkDisplay 
            collection={collections && collections.find(col => col.cid == displayCid)} 
            handleLink={handleLink}
            direction={direction}
            />

            {
                userState=="isUser" ?
                <Link href={"/user/edit/link_setting"}>
                    <GlassIconButton 
                    aria-label='link_setting_link'
                    >
                        <Icon aria-label='link_setting' as={IoMdSettings} color="tipsy_color_2" />
                    </GlassIconButton>
                </Link>
                :
                <GlassIconButton 
                aria-label='link_setting_link'
                >
                    <Icon aria-label='link_setting' as={FaQuestion} color="orange" />
                </GlassIconButton>
            }
            
        </Flex>
    )
}