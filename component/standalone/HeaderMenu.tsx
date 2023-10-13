import { Button, Menu, MenuButton, IconButton, MenuProps, MenuGroup, MenuList, MenuItem, MenuItemOption, MenuDivider, Box, Divider } from "@chakra-ui/react";
import { useLogOutFunc, usePassChangeSendEmail } from "../../util/hook/useAuth";
import { HamburgerIcon } from "@chakra-ui/icons";
import { auth } from "../../util/firebase/init";
import Link from "next/link";
import { GlassMenuProps } from "../../type/helper";

export const HeaderMenu = ({
    user_name, itemFontSize="0.8rem", 
    ...props
}: GlassMenuProps) => {
    const {execute} = useLogOutFunc()
    const {executeSendEmail} = usePassChangeSendEmail();
    return (
        <Menu 
        {...props}
        >
            <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<HamburgerIcon />}
            variant='outline'
            borderRadius="full"
            />
            <MenuList 
            pos={"relative"}
            fontSize={itemFontSize}
            borderRadius={[8, 10, 15]} 
            backdropFilter={"blur(17px)"}
            backgroundColor={"bg_popover_switch"}
            >
                <MenuGroup 
                title={"- " + ( user_name && user_name?.length > 10 ?  user_name?.slice(0, 10) + "..." : user_name )+ " -"}
                pr={[20, 0]}
                >
                    <Link href="/user/edit/my_profile" passHref>
                        <MenuItem
                        backgroundColor={"transparent"}
                        _hover={{backgroundColor: "rgba(130,130,130, 0.25)", color: "white"}}
                        >プロフィール編集</MenuItem>
                    </Link>
                    <Link href="/user/edit/link_setting" passHref>
                        <MenuItem
                        backgroundColor={"transparent"}
                        _hover={{backgroundColor: "rgba(130,130,130, 0.25)", color: "white"}}
                        >LINK-SEARCH の設定</MenuItem>
                    </Link>
                    <MenuItem 
                    onClick={ () => {execute();}}
                    backgroundColor={"transparent"}
                    _hover={{backgroundColor: "rgba(130,130,130, 0.25)", color: "white"}}
                    >
                        ログアウト
                    </MenuItem>
                    { auth.currentUser?.email && 
                    <MenuItem 
                    onClick={() => executeSendEmail(auth.currentUser?.email)}
                    backgroundColor={"transparent"}
                    _hover={{backgroundColor: "rgba(130,130,130, 0.25)", color: "white"}}
                    >
                        パスワードを変更する
                    </MenuItem> 
                    }
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title='- その他 -'>
                    <Link href="/guide/explanation" passHref>
                        <MenuItem
                        backgroundColor={"transparent"}
                        _hover={{backgroundColor: "rgba(130,130,130, 0.25)" , color: "white"}}
                        >
                            tipsyについて
                        </MenuItem>
                    </Link>
                    <Link href="/guide/contact" passHref>
                        <MenuItem
                        backgroundColor={"transparent"}
                        _hover={{backgroundColor: "rgba(130,130,130, 0.25)", color: "white"}}
                        >
                            お問い合わせ
                        </MenuItem>
                    </Link>
                </MenuGroup>
            </MenuList>
        </Menu>
    )
}