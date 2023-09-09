import React, { useState } from "react"
import { Avatar, Box, Center, Flex, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { useLazyQuery } from "@apollo/client"
import { GET_FOLLW_LIST } from "../../util/graphql/queries/follows.query.scheme"
import { Follow } from "../../type/global"
import { UserListItemWithFollow } from "../helper/ListItems"
import { GlassButton } from "../atom/buttons"

export const FollowListModal = ({
    uuid_uid,
    is_follower_list=false,
    follow_num,
}: {
    uuid_uid: string,
    is_follower_list?: boolean,
    follow_num: number,
}) => {

    const [displayFollow, setDisplayFollow] = useState<Follow[]>([])
    const [maxDisplayNum, setMaxDisplayNum] = useState<number>(50)

    const title = is_follower_list ? "フォロー" : "フォロワー"
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [getFollowList, { fetchMore }] = useLazyQuery(GET_FOLLW_LIST, {
        variables: {
            uuid_uid: uuid_uid,
            is_follower_list: is_follower_list,
            offset: 0
        },
        fetchPolicy: 'no-cache'
    })

    const handleModalOpen = async () => {
        onOpen()
        getFollowList()
        .then(res => setDisplayFollow(res.data.get_follow_list))
        .catch(error => {console.log("fail to get follow list " + error)})
    }
    const handleModalClose = async () => {
        onClose()
        setDisplayFollow([])
        setMaxDisplayNum(50)
    }

    const handleFetchMore = () => {
        fetchMore({
            variables: { offset: displayFollow.length }
        })
        .then(res => {
            setDisplayFollow([...displayFollow, ...res.data.get_follow_list])
            setMaxDisplayNum(maxDisplayNum + 50)
        })
        .catch(error => {console.log("fail to get follow list " + error)})
    }

    return (
        <>
            <Box 
            onClick={handleModalOpen} 
            _hover={{textDecoration: "underline"}}
            >
                { title } : {follow_num}
            </Box>

            <Modal
            isOpen={isOpen}
            onClose={handleModalClose}
            size={"sm"}
            >
                <ModalOverlay
                backdropFilter={"blur(2px)"} 
                bg="bg_transparent_reverse"
                />
                <ModalContent
                backdropFilter={"blur(15px)"}
                bg="bg_transparent"
                borderRadius={20}
                p={1}
                >
                    <ModalHeader
                    borderTopRadius={20}
                    >
                        <Flex fontSize="1rem">
                            <Box>{ title }</Box>
                        </Flex>
                        <ModalCloseButton color={"text_light"}/>
                    </ModalHeader>
                    <ModalBody
                    >
                        <Box
                        w={"100%"} maxH={"400px"} overflowY={"scroll"}
                        >
                        { displayFollow.length != 0 ?
                            <>
                                {
                                    displayFollow.map((follow: Follow, _i: number) => {
                                        const user = is_follower_list 
                                            ? follow.users_follows_followee_uuidTousers 
                                            : follow.users_follows_follower_uuidTousers
                                        return (
                                            <UserListItemWithFollow user={user} onClose={onClose} key={_i}/>
                                        )
                                    })
                                }
                                {
                                    displayFollow.length >= maxDisplayNum &&
                                    (<Center m={3}>
                                        <GlassButton
                                        size={"md"} fontSize={16}
                                        Hcolor={"tipsy_color_3"}
                                        onClick={handleFetchMore}
                                        >
                                            もっと見る
                                        </GlassButton>
                                    </Center>)
                                }
                            </>

                            : <Center>{ title +  "は見つかりませんでした" }</Center>
                        }
                        </Box>
                    </ModalBody>
                </ModalContent>

            </Modal>
        </>
    )
}