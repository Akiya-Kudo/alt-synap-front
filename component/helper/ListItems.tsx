import { useMutation } from "@apollo/client"
import { CloseIcon } from "@chakra-ui/icons"
import { Avatar, AvatarBadge, AvatarGroup, Box, Center, Flex, Grid, GridItem, Heading, HStack, IconButton,  Link,  Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tag, Text, useBreakpointValue, useDisclosure, VStack } from "@chakra-ui/react"
import React from "react"
import { Collection, Follow, Link as LinkType, LinkDisplaySwitchType, User } from "../../type/global"
import { LINK_COLLECTION_FRAGMENT, USER_FOLLOWEE_FRAG } from "../../util/graphql/fragment/fragment.scheme"
import { REMOVE_COLLECTION } from "../../util/graphql/mutation/collections.mutation.scheme"
import { REMOVE_LINK_FROM_COLLECTION } from "../../util/graphql/mutation/links.mutation.scheme"
import { GlassSwitchButton } from "../atom/buttons"
import { CollectionEditModal, LinkDetailModal, LinkEditModal } from "./Modals"
import NextLink from 'next/link'
import { LinkGenreNames } from "../../type/standalone"
import { TOGGLE_FOLLOW } from "../../util/graphql/mutation/follows.mutation.scheme"
import { USER_QUERY } from "../../util/graphql/queries/users.query.schema"
import { auth } from "../../util/firebase/init"
import { TruncatedHeading } from "../atom/texts"

export const CollectionListItem = ({collection}: {collection: Collection}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
        <Flex
        onClick={onOpen}
        w={"100%"} py={2} px={1} key={collection.cid} id={collection.cid.toString()}
        direction={"row"} align={"center"}
        borderRadius={10} transition={".3s"}
        _hover={{ 
            filter: 'brightness(1.2)',
            bg: "whiteAlpha.500"
        }}
        >
            <AvatarGroup size='xs' max={3} w={"80px"}>
                {collection.link_collections?.map((li_col, _i) => {
                    return (<Avatar name={li_col.links.link_name} src={li_col.links.image_path} key={_i}/>)
                })}
            </AvatarGroup>
            <Center flexGrow={1} ms={2}><TruncatedHeading maxLength={20} fontSize={["1rem", "1rem", ".8rem"]} overflow={"hidden"}>{collection.collection_name}</TruncatedHeading></Center>
        </Flex>
        <CollectionEditModal  
        collection={collection}
        onClose={onClose} isOpen={isOpen} onOpen={onOpen}
        />
        </>
    )
}

export const LinkListItemDeletable = ({link, cid}: {link: LinkType, cid: number}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [removeLink, { error, data, loading }] = useMutation(REMOVE_LINK_FROM_COLLECTION, { 
        update( cache, { data: { remove_link_from_collection } } ) {
            //collectionのlink_col配列のの更新
            const collection: Collection | null = cache.readFragment({
                id: `Collection:{"cid":${cid}}`,
                fragment: LINK_COLLECTION_FRAGMENT
            })
            if (collection) {
                const newLinkCollections = collection?.link_collections?.filter(li_col => li_col.links.lid != link.lid)
                cache.writeFragment({
                    id: `Collection:{"cid":${cid}}`,
                    fragment: LINK_COLLECTION_FRAGMENT,
                    data: {
                        ...collection,
                        link_collections: newLinkCollections 
                    } 
                })
            }
            //履歴の表示更新 今のとこok
            //バッチが切り替わるか 今のとこok
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
                <TruncatedHeading maxLength={20} size={"xs"} ms={10} overflow={"hidden"}>{link.link_name}</TruncatedHeading>
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

export const LinkListItem = (
    {link, badgeLidArray, displayMode, uuid_uid}: 
    {link: LinkType, badgeLidArray: string[], displayMode: LinkDisplaySwitchType, uuid_uid: string}
) => {
    const isMobile = useBreakpointValue([true, true, false])
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    return (
        <>
        <Grid
        w={"100%"}
        onClick={onOpen}
        templateColumns={!isMobile ? "10% 25% 25% 20% 15%" : "10% 30% 35% 20%"}
        p={2} key={link.lid.toString()}
        borderRadius={10} transition={".3s"}
        _hover={{ 
            filter: 'brightness(1.2)',
            bg: "whiteAlpha.500"
        }}
        >
            <GridItem>
                <Avatar src={link.image_path} h={7} w={7} name={link.link_name}>
                    { badgeLidArray.includes(link.lid.toString()) && <AvatarBadge boxSize='.5em' bg='tipsy_color_1' border={"1px"} /> }
                </Avatar>
            </GridItem>

            <GridItem display={"flex"} alignItems={"center"}>
                <Heading size={"sm"} ps={1} isTruncated>{link.link_name}</Heading>
            </GridItem>

            {
                !isMobile && 
                <GridItem display={"flex"} alignItems={"center"}>
                    <Link 
                    href={ link.url_scheme } isExternal onClick={(e:any)=>e.stopPropagation()}
                    color={"tipsy_color_3"} isTruncated fontSize={".7rem"} pe={2}
                    >
                        { link.url_scheme }
                    </Link>
                </GridItem>
            }

            <GridItem display={"flex"} alignItems={"center"} >
                <NextLink href={"/users/" + link.uuid_uid}>
                    <Avatar name={ link.users?.user_name } src={link.users?.user_image} size={"2xs"} onClick={(e:any)=>e.stopPropagation()}/>
                </NextLink>
                <NextLink href={"/users/" + link.uuid_uid} >
                    <Text ms={2} pe={[6, 1]} fontSize={"xs"} isTruncated _hover={{ textDecoration: "underline" }} onClick={(e:any)=>e.stopPropagation()} >
                        {link.users?.user_name ? link.users?.user_name : "Guest" }
                    </Text>
                </NextLink>
            </GridItem>
            <GridItem display={"flex"} alignItems={"center"} justifyContent={"space-evenly"}>
                <HStack><Tag size={"xs"} p={1} fontSize={".5rem"} whiteSpace={"nowrap"}>{LinkGenreNames[link.genre]}</Tag></HStack>
            </GridItem>
        </Grid>
        <LinkEditModal
        link={link} uuid_uid={uuid_uid} displayMode={displayMode}
        onClose={onClose} isOpen={isOpen} onOpen={onOpen}
        />
        </>
    )
}


export const UserListItemWithFollow = ({user, onClose}: {user?: User, onClose: any}) => {

    const isFollowed = user?.follows_follows_followee_uuidTousers && user?.follows_follows_followee_uuidTousers.length!=0

    const [toggleFollow, {error: error_follow}] = useMutation(TOGGLE_FOLLOW, {
        variables: { followee_uuid: user?.uuid_uid },
        update( cache, { data: { follow_toggle } } ) {
            //correct cache's displaying user7s followee num
            cache.updateFragment(
                { 
                    id: `User:{"uuid_uid":"${follow_toggle.followee_uuid}"}`,
                    fragment: USER_FOLLOWEE_FRAG
                },
                (data) => {
                    if (data?.follows_follows_followee_uuidTousers) { // post's relation's users cache is less field of regurding of follow, they shold be avoided 
                        if (data.follows_follows_followee_uuidTousers.length!=0) {
                            return ({
                                followee_num: data?.followee_num!=undefined && data?.followee_num  - 1,
                                follows_follows_followee_uuidTousers: []
                            })
                        }
                        else {
                            return ({
                                followee_num: data?.followee_num!=undefined && data?.followee_num  + 1,
                                follows_follows_followee_uuidTousers: [follow_toggle]
                            }) 
                        }
                    }
                }
            )
            cache.updateQuery({
                    query: USER_QUERY,
                    variables: {uid: auth.currentUser?.uid},
                },
                (data) => {
                    if (isFollowed) {
                        return ({ user: { follower_num: data.user.follower_num - 1 }})
                    } else {
                        return ({ user: { follower_num: data.user.follower_num + 1 }})
                    }
                    
                }
            )
        }
    })
    
    return (
        <>
        <Flex
        w={"100%"} py={2}
        direction={"row"} justify={"space-between"} align={"center"}
        borderRadius={10}
        >
            <NextLink href={"/users/" + user?.uuid_uid}>
                <Flex 
                onClick={onClose}
                align={"center"} 
                _hover={{ filter: 'brightness(1.3)' }}
                >
                    <Avatar name={user?.user_name} src={user?.user_image} size={"xs"}/>
                    <Heading ms={3} overflow={"hidden"} minW={100} fontSize={[".5rem", ".8rem"]}>
                        {
                            user?.user_name && user?.user_name.length > 15
                            ? user?.user_name.slice(0, 15) + "..."
                            : user?.user_name
                        }
                    </Heading>
                </Flex>
            </NextLink>
            <GlassSwitchButton
            onClick={() => {toggleFollow()}}
            defStateValue={ isFollowed }
            w={[70, 100]} fontSize={[".3rem", ".8rem"]}
            size="sm" h={[7,7,8,10]} 
            SBgGradient={"linear(to-tl, tipsy_color_2, tipsy_color_3)"} SHBgGradient={"linear(to-tl, tipsy_color_active_2, tipsy_color_active_3)"}
            Scolor={"bg_switch"} Acolor={"tipsy_color_active_3"} Hcolor={"tipsy_color_3"}
            Schildren={"フォロー中"}
            >
                フォローする
            </GlassSwitchButton>
        </Flex>
        </>
    )
}
