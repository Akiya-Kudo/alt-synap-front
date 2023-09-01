import React from "react";
import { Avatar, AvatarGroup, Menu, MenuGroup, MenuItem, MenuList } from "@chakra-ui/react"
import { AddPostSelectMenuProps, LinkSelectBoardProps } from "../../type/helper";
import { Collection } from "../../type/global";
import { EditIcon, ExternalLinkIcon, LinkIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { LinkPostModal } from "../standalone/LinkPostFormModal";

export const AddPostSelectMenu = ({
    children,
    ...props
}:AddPostSelectMenuProps) => {
    const onClick = (cid: number) => {
    }
    return (
        <Menu 
        {...props}
        >
            <>
            {children}
            <MenuList 
            fontSize={".8rem"} p={0}
            borderRadius={10}
            backdropFilter={"blur(17px)"}
            backgroundColor={"bg_popover_switch"}
            >
                <LinkPostModal>
                    <MenuItem 
                    icon={<LinkIcon fontSize={"1.2rem"}/>} command='⌘J'
                    backgroundColor={"transparent"} px={2} py={3} borderTopRadius={10}
                    _hover={{backgroundColor: "rgba(170,170,170, 0.35)", color: "tipsy_color_active_1"}}
                    >
                        リンクを保存
                    </MenuItem>
                </LinkPostModal>
                <Link href="/user/post_create" passHref>
                    <MenuItem
                    icon={<EditIcon fontSize={"1.2rem"} />} command='⌘M'
                    backgroundColor={"transparent"} px={2} py={3} borderBottomRadius={10}
                    _hover={{backgroundColor: "rgba(170,170,170, 0.35)", color: "tipsy_color_active_3"}}
                    >
                            投稿を作成
                    </MenuItem>
                </Link>
            </MenuList>
            </>
        </Menu>
    )
}