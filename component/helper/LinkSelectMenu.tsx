import { AddIcon } from "@chakra-ui/icons";
import { Avatar, AvatarGroup, Box, Menu, MenuGroup, MenuItem, MenuList, useDisclosure } from "@chakra-ui/react"
import Link from "next/link";
import { LinkSelectBoardProps } from "../../type/helper";

export const LinkSelectMenu = ({
    collections, children, title,
    onClose, isOpen,
    handleClick=(e: any)=>{},
    menuDisplaymargin,
    ...props
}:LinkSelectBoardProps) => {
    const onClick = (cid: number) => {
        handleClick(cid)
    }
    
    return (
        <Menu 
        {...props}
        isOpen={isOpen}
        onClose={onClose}
        >
            <>
            {children}
            <MenuList 
            fontSize={".8rem"} mx={4}
            borderRadius={15}
            backdropFilter={"blur(17px)"}
            backgroundColor={"bg_popover_switch"}
            m={menuDisplaymargin}
            >
                <MenuGroup title={title} fontSize={".8rem"}>
                    {
                        collections && collections.map(col => {
                            return (
                                <MenuItem
                                id={col.cid.toString()}  key={col.cid}
                                backgroundColor={"transparent"}
                                _hover={{backgroundColor: "rgba(130,130,130, 0.25)", color: "white"}}
                                onClick={() => onClick(col.cid)}
                                >
                                    <AvatarGroup size='xs' max={2} mr='12px' fontSize={".6rem"}>
                                        {
                                            col.link_collections?.map(li_col => <Avatar name={li_col.links?.link_name} src={li_col.links?.image_path} id={li_col.lid?.toString()} key={li_col.lid}/>)
                                        }
                                    </AvatarGroup>
                                    <span>{col.collection_name}</span>
                                </MenuItem>
                            )
                        })
                    }
                    {
                        (collections && collections?.length>=0)  &&
                        <Link href="/user/edit/link_setting">
                            <MenuItem 
                            p={2} fontSize={".8rem"} color={"tipsy_color_2"} bg={"transparent"}
                            _hover={{ backgroundColor: "rgba(130,130,130, 0.25)", color: "white" }}
                            >
                                <AddIcon mr='12px' fontSize={".6rem"}/>
                                <span>新しいCollectionを作成する</span>
                            </MenuItem>
                        </Link>
                    }
                </MenuGroup>
            </MenuList>
            </>
        </Menu>
    )
}