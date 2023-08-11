import { useMutation } from "@apollo/client"
import { CloseIcon } from "@chakra-ui/icons"
import { Avatar, AvatarBadge, AvatarGroup, Box, Center, Flex, Grid, GridItem, Heading, HStack, IconButton,  Link,  Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tag, Text, useDisclosure, VStack } from "@chakra-ui/react"
import React from "react"
import { Collection, Link as LinkType, LinkDisplaySwitchType } from "../../type/global"
import { LINK_COLLECTION_FRAGMENT } from "../../util/graphql/fragment/fragment.scheme"
import { REMOVE_COLLECTION } from "../../util/graphql/mutation/collections.mutation.scheme"
import { REMOVE_LINK_FROM_COLLECTION } from "../../util/graphql/mutation/links.mutation.scheme"
import { GlassButton } from "../atom/buttons"
import { CollectionEditModal, LinkDetailModal, LinkEditModal } from "./Modals"
import NextLink from 'next/link'
import { LinkGenreNames } from "../../type/standalone"

export const CollectionListItem = ({collection}: {collection: Collection}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
        <Flex
        onClick={onOpen}
        w={"100%"} p={1} key={collection.cid} id={collection.cid.toString()}
        direction={"row"} align={"center"}
        borderRadius={10} transition={".3s"}
        _hover={{ 
            filter: 'brightness(1.2)',
            bg: "whiteAlpha.500"
        }}
        >
            <AvatarGroup size='xs' max={3} fontSize={".7rem"} w={"80px"}>
                {collection.link_collections?.map(li_col => {
                    return (<Avatar name={li_col.links.link_name} src={li_col.links.image_path}/>)
                })}
            </AvatarGroup>
            <Center flexGrow={1}><Heading size={"xs"} overflow={"hidden"}>{collection.collection_name}</Heading></Center>
        </Flex>
        <CollectionEditModal  
        collection={collection}
        onClose={onClose} isOpen={isOpen} onOpen={onOpen}
        />
        </>
    )
}

export const LinkListItem = (
    {link, badgeLidArray, displayMode, uuid_uid}: 
    {link: LinkType, badgeLidArray: string[], displayMode: LinkDisplaySwitchType, uuid_uid: string}
) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
        <Grid
        onClick={onOpen}
        templateColumns={"10% 25% 25% 25% 15%"}
        p={2} key={link.lid.toString()}
        borderRadius={10} transition={".3s"}
        _hover={{ 
            filter: 'brightness(1.2)',
            bg: "whiteAlpha.500"
        }}
        >
            <GridItem>
                <Avatar src={link.image_path} h={7} w={7}>
                    { badgeLidArray.includes(link.lid.toString()) && <AvatarBadge boxSize='.5em' bg='tipsy_color_1' border={"1px"} /> }
                </Avatar>
            </GridItem>

            <GridItem display={"flex"} alignItems={"center"}>
                <Heading size={"sm"} ps={5} isTruncated>{link.link_name}</Heading>
            </GridItem>

            <GridItem display={"flex"} alignItems={"center"}>
                <Link 
                href={ link.url_scheme } isExternal onClick={(e:any)=>e.stopPropagation()}
                color={"tipsy_color_3"} isTruncated fontSize={".7rem"} pe={5}
                >
                    { link.url_scheme }
                </Link>
            </GridItem>

            <GridItem display={"flex"} alignItems={"center"} >
                <NextLink href={"/posts/" + link.uuid_uid}>
                    <Avatar name={ link.users?.user_name } src={link.users?.user_image} size={"2xs"} onClick={(e:any)=>e.stopPropagation()}/>
                </NextLink>
                <NextLink href={"/posts/" + link.uuid_uid} >
                    <Text ps={2} fontSize={"sm"} isTruncated _hover={{ textDecoration: "underline" }} onClick={(e:any)=>e.stopPropagation()} >
                        {link.users?.user_name ? link.users?.user_name : "Guest" }
                    </Text>
                </NextLink>
            </GridItem>

            <GridItem display={"flex"} alignItems={"center"} justifyContent={"space-evenly"}>
                <HStack h={"100%"}><Tag size={"sm"} h={1} fontSize={".7rem"}>{LinkGenreNames[link.genre]}</Tag></HStack>
            </GridItem>
        </Grid>
        <LinkEditModal
        link={link} uuid_uid={uuid_uid} displayMode={displayMode}
        onClose={onClose} isOpen={isOpen} onOpen={onOpen}
        />
        </>
    )
}

export const LinkListItemDeletable = ({link, cid}: {link: LinkType, cid: number}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [removeLink, { error, data, loading }] = useMutation(REMOVE_LINK_FROM_COLLECTION, { 
        update( cache, { data: { remove_link_from_collection } } ) {
            const collections: Collection | null = cache.readFragment({
                id: `Collection:{"cid":${cid}}`,
                fragment: LINK_COLLECTION_FRAGMENT
            })
            if (collections) {
                const newLinkCollections = collections?.link_collections?.filter(li_col => li_col.links.lid != link.lid)
                const changed_col = cache.writeFragment({
                    id: `Collection:{"cid":${cid}}`,
                    fragment: LINK_COLLECTION_FRAGMENT,
                    data: { link_collections: newLinkCollections } 
                })
            }
            //アプリ表示機能では直後では履歴画面には反映されないため、queryの結果を変える必要
        }
    })

    const handleDelete = (e: any) => {
        e.stopPropagation()
        removeLink({
            variables: { lid: link.lid, cid: cid },
        })
    }
    if (error) alert("Mutation Error: " + error)
    return (
        <>
        <Flex
        onClick={onOpen}
        w={"100%"} p={1} key={link.lid} id={link.lid.toString()}
        direction={"row"} justify={"space-between"} align={"center"}
        borderRadius={10} transition={".3s"}
        _hover={{ 
            filter: 'brightness(1.2)',
            bg: "whiteAlpha.500"
        }}
        >
            <Flex align={"center"}>
                <Avatar name={link.link_name} src={link.image_path} size={"xs"}/>
                <Heading size={"xs"} ms={10} overflow={"hidden"}>{link.link_name}</Heading>
            </Flex>
            <IconButton 
            onClick={handleDelete}
            icon={<CloseIcon/>} aria-label="delete-collection" 
            color={"red.300"} borderColor={"red.300"} bg={"transparent"}
            size={"xs"} 
            borderRadius={30} border={"1px solid"}
            />
        </Flex>
        <LinkDetailModal
        link={link}
        onClose={onClose} isOpen={isOpen} onOpen={onOpen}
        />
        </>
    )
}