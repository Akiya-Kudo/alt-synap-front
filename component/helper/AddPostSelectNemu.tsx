import React from "react";
import { Avatar, AvatarGroup, Menu, MenuGroup, MenuItem, MenuList, useDisclosure } from "@chakra-ui/react"
import { AddPostSelectMenuProps, LinkSelectBoardProps } from "../../type/helper";
import { Collection } from "../../type/global";
import { EditIcon, ExternalLinkIcon, LinkIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { LinkPostModal } from "../standalone/LinkPostFormModal";
import { useHotkeys } from "react-hotkeys-hook";
import { useRouter } from "next/router";
import { usePost } from "../../util/hook/usePost";

export const AddPostSelectMenu = ({
    children,
    ...props
}:AddPostSelectMenuProps) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    // updateと inset時でupdate関数を切り替えるためここで定義
    const { createLinkPost } = usePost();

    const router = useRouter()
    useHotkeys('mod+j', (e) => {
        e.preventDefault()
        if (isOpen) onClose()
        else onOpen()
    })
    useHotkeys('mod+m', (e) => {
        e.preventDefault()
        router.push("/user/post_create")
    })
    return (
        <Menu 
        {...props}
        >
            <>
            {children}
            <MenuList 
            fontSize={".8rem"} p={0}
            borderRadius={[8, 10, 15]}
            backdropFilter={"blur(17px)"}
            backgroundColor={"bg_popover_switch"}
            >
                <MenuItem 
                icon={<LinkIcon fontSize={"1.2rem"}/>} command='⌘J'
                backgroundColor={"transparent"} px={2} py={3} borderTopRadius={10}
                _hover={{backgroundColor: "rgba(170,170,170, 0.35)", color: "tipsy_color_active_1"}}
                onClick={onOpen}
                >
                    リンクを保存
                </MenuItem>
                <LinkPostModal
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                onExecute={createLinkPost}
                defaultPostValue={undefined}
                />

                <Link href="/user/post_create" passHref>
                    <MenuItem
                    icon={<EditIcon fontSize={"1.2rem"} />} command='⌘M'
                    backgroundColor={"transparent"} px={2} py={3} borderBottomRadius={10}
                    _hover={{backgroundColor: "rgba(170,170,170, 0.35)", color: "tipsy_color_active_3"}}
                    >
                            文章を作成
                    </MenuItem>
                </Link>
            </MenuList>
            </>
        </Menu>
    )
}