import React, { useState } from "react"
import { Avatar, Flex, HStack, useDisclosure, IconButton, Box } from '@chakra-ui/react'
import NextLink from 'next/link'
import { TruncatedHeading } from '../../component/atom/texts'
import { BasicFooterStyleContainer } from '../../component/atom/containers'
import { LikeButton } from '../../component/atom/likes'
import { BookMarkButton } from '../../component/atom/bookmarks'
import { Post } from "../../type/global"
import { AttachmentIcon, CloseIcon, HamburgerIcon } from "@chakra-ui/icons"
import { GlassIconButton } from "../atom/buttons"
import { useGlassColorMode } from "../../util/hook/useColor"
import { GlassLinkBoard } from "../standalone/LinkBoard"

export const PostDisplayFooterMobile = ({post, login_user}: {post: Post, login_user: any}) => {
    const [isOpen, setIsOpen] = useState<boolean>(true)

    const {glass_bg_switch_footer} = useGlassColorMode()
    if (!isOpen) {
        return (
            <GlassIconButton
            aria-label="menu-open-button" icon={<AttachmentIcon/>}
            position={"fixed" }
            bottom={5} right={5}
            onClick={()=>setIsOpen(true)}
            backdropFilter={"blur(10px)"}
            border={"0.3px solid rgba(200,200,200, 0.7)"} bg={glass_bg_switch_footer}
            />
        )
    }
    return (
        <>
        <BasicFooterStyleContainer direction={"row"} justify={"space-between"} isOpen={isOpen}>
            <Flex direction={"row"} gap={2} align={"center"}>
                <NextLink href={"/users/" + post?.users.uuid_uid}>
                        <Avatar h={10} w={10} size={'xs'} name={post?.users.user_name} src={post?.users.user_image} />
                </NextLink>
                <NextLink href={"/users/" + post?.users.uuid_uid}>
                        <TruncatedHeading maxLength={40} size={"sm"}>{post?.users.user_name}</TruncatedHeading>
                </NextLink>
            </Flex>

            <HStack>
                <LikeButton
                likes_num={post?.likes_num} 
                defaultIsLiked={ post?.likes && post?.likes?.length!=0 ? true : false} 
                uuid_pid={post?.uuid_pid}
                size={6} ms={3} mt={2}
                />

                <BookMarkButton
                uuid_pid={post?.uuid_pid} folder_posts={post?.folder_posts} folders={login_user?.folders} post={post}
                size={6} ms={3} mt={2} mr={5}
                />

                <IconButton
                variant={"outline"} borderRadius={"full"} color={"text_normal"}
                icon={<CloseIcon />} aria-label="toggle_button"
                onClick={()=>setIsOpen(false)}
                />
            </HStack>
        </BasicFooterStyleContainer>
        </>
    )
}

export const LinkCollectionFooter = ({query_text}: {query_text: string}) => {
    const [isOpen, setIsOpen] = useState<boolean>(true)

    const {glass_bg_switch_footer} = useGlassColorMode()
    if (!isOpen) {
        return (
            <GlassIconButton
            aria-label="menu-open-button" icon={<AttachmentIcon/>}
            position={"fixed" }
            bottom={5} right={5}
            onClick={()=>setIsOpen(true)}
            backdropFilter={"blur(10px)"}
            border={"0.3px solid rgba(200,200,200, 0.7)"} bg={glass_bg_switch_footer}
            />
        )
    }
    return (
        <>
            <BasicFooterStyleContainer direction={"row"} justify={"space-between"} isOpen={isOpen}>

                <GlassLinkBoard query_text={query_text} direction={"row"} flexGrow={1}/>

                <IconButton
                variant={"outline"} borderRadius={"full"} color={"text_normal"}
                icon={<CloseIcon />} aria-label="toggle_button"
                onClick={()=>setIsOpen(false)}
                />
            </BasicFooterStyleContainer>
        </>
    )
}