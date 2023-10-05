import { Avatar, Box, Center, Icon, MenuButton, ResponsiveValue, useDisclosure } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { IoMdSettings } from 'react-icons/io';
import { DentBord } from '../../component/atom/bords';
import { ClickButtonFlat } from '../../component/atom/buttons';
import Link from 'next/link';
import { useNeumorphismColorMode } from '../../util/hook/useColor';
import { LinkSelectMenu } from '../helper/LinkSelectMenu';
import { client } from '../../pages/_app';
import { auth } from '../../util/firebase/init';
import { USER_QUERY } from '../../util/graphql/queries/users.query.schema';
import { AuthContext } from '../../util/hook/authContext';
import { Collection, Link as LinkType } from '../../type/global';
import { BiCategoryAlt } from 'react-icons/bi';
import {useLinkSearch} from '../../util/hook/useLink'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { SET_TOP_COLLECTION } from '../../util/graphql/mutation/collections.mutation.scheme';
import { GET_GUEST_COLLECTIOINS } from '../../util/graphql/queries/links.query.scheme';

const LinkBoard = ({query_text, flexDirection="column"}: {query_text: string, flexDirection?: ResponsiveValue<any> | undefined}) => {
    const { onClose, isOpen, onToggle } = useDisclosure()

    const { userState } = useContext(AuthContext);
    const [collection, setCollection] = useState<Collection[]>([])
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
            setCollection(read_collections?.user?.collections ? read_collections?.user?.collections : [])
            // return index, if the collection is not find in array => return -1
            const top_collection = read_collections?.user?.collections.find((collection: Collection) => collection.cid == read_collections?.user?.top_collection)
            setDlisplayCid( top_collection ? top_collection.cid : read_collections?.user?.collections[0]?.cid )
        } else if (userState=="guest") {
            getGuestCollections().then(res => {
                setCollection(res.data.get_guest_collections)
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
            title={"- COLLECTIONを選択 -"} collections={collection} handleClick={handleSelect}
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

            <Center flexDirection={flexDirection}>
                {
                    collection && displayCid && collection.find(col => col.cid == displayCid)?.link_collections?.map((li_col, _i )=> {
                        return (
                            <ClickButtonFlat
                            id={li_col.lid?.toString()} key={_i}
                            onClick={() => handleLink(li_col.links)}
                            p={1}
                            >
                                <Avatar src={li_col.links.image_path} name={li_col.links.link_name} size={"sm"}/>
                            </ClickButtonFlat>
                        )
                    })
                }
            </Center>

            <Link href={"/user/edit/link_setting"}>
                <DentBord 
                h={"45px"} w={"45px"} p={3}
                >
                    <Icon aria-label='link_setting' as={IoMdSettings} color="tipsy_color_2" />
                </DentBord>
            </Link>
        </>
    )
}

export default LinkBoard