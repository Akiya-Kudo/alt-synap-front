import { Center, IconButton, InputGroup, InputRightElement, MenuButton, useDisclosure, VStack } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { TfiUnlink } from 'react-icons/tfi'
import { client } from '../../pages/_app'
import { auth } from '../../util/firebase/init'
import { USER_QUERY } from '../../util/graphql/queries/users.query.schema'
import { FlatBord } from '../atom/bords'
import { NeumInputDefault } from '../atom/inputs'
import { LinkSelectMenu } from '../helper/LinkSelectMenu'
import {NeumLinkBoard} from './LinkBoard'
import { useLinkSearch } from "../../util/hook/useLink"
import { Collection } from '../../type/global';
import { NeumIconButton } from '../atom/buttons'
import { AuthContext } from '../../util/hook/authContext'
import { useLazyQuery, useQuery } from '@apollo/client'
import { GET_GUEST_COLLECTIOINS } from '../../util/graphql/queries/links.query.scheme'

const LinkSearchableBoard = () => {
    const { userState } = useContext(AuthContext);
    const { onClose, isOpen, onToggle, onOpen } = useDisclosure()
    const [word, setWord] = useState<string>("")
    const [collections, setCollections] = useState<Collection[]>([])

    const [getGuestCollections] = useLazyQuery(GET_GUEST_COLLECTIOINS)
    const data_user = client.readQuery({
        query: USER_QUERY,
        variables: { uid: auth.currentUser?.uid }
    });

    useEffect(() => {
        if (userState=="isUser") {
            setCollections(data_user?.user?.collections ? data_user?.user?.collections : [])
        } else if (userState=='guest') {
            getGuestCollections().then(res => setCollections(res.data.get_guest_collections)).catch(error => console.log(error)
            )
        }
    },[data_user, userState])

    const handleMultLink = (cid: number) => {
        collections.find(col => col.cid == cid)?.link_collections?.map(li_col => { useLinkSearch(li_col.links, word) })
    }

    const [composing, setComposition] = useState(false);
    const handleKeyDown = (e:any) => {
        if (
            e.key === 'Enter' 
            && !composing 
            && e.target.value!="" 
        ) { //入力キーが"Enter"　かつ validation errorsが無い かつ 変換中じゃない かつ valueが入力済み かつ すでに追加済みじゃない　場合
            e.preventDefault();
            onOpen()
            
        }
    }
    return (
        <>
            <VStack mb={5}>
                <FlatBord
                h={"70px"} minW={"90vw"}
                px={3} py={1} borderRadius={"full"}
                flexDirection={"row"} gap={3}
                neumH="shallow"
                justifyContent={"start"}
                >
                    <InputGroup
                    zIndex={1}
                    >
                        <NeumInputDefault
                        placeholder='Linkで検索'
                        fontSize={16}
                        onInput={(e:any) => setWord(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault()
                                handleKeyDown(e)
                            }
                        }}
                        onCompositionStart={ ()=>setComposition(true) } onCompositionEnd={ ()=>setComposition(false) }
                        />
                        <InputRightElement
                        pe={1}
                        >
                            <Center>
                                <LinkSelectMenu title={"- Mult Link Search -"} 
                                collections={collections} handleClick={handleMultLink}
                                onClose={onClose} isOpen={isOpen}
                                menuDisplaymargin={"60px 0 0 -100px"}
                                >
                                    <MenuButton 
                                    as={NeumIconButton} icon={<TfiUnlink/>} aria-label="multi-link-search"
                                    _hover={{ filter: 'brightness(1.2)' }} 
                                    color="tipsy_color_2"
                                    bg={"transparent"}
                                    borderRadius={"full"}
                                    fontSize={"1.3rem"} size={"sm"}
                                    onClick={onToggle}
                                    />
                                </LinkSelectMenu>
                            </Center>
                        </InputRightElement>
                    </InputGroup>

                    <NeumLinkBoard query_text={word} flexDirection="row" direction='row'/>
                </FlatBord>
            </VStack>
        </>
    )
}

export default LinkSearchableBoard