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
            borderRadius={15}
            // backgroundColor={"bg_switch"}
            backdropFilter={"blur(7px)"}
            sx={{"-webkit-backdrop-filter": "blur(7px)"}}
            backgroundColor={"rgba(230,230,230, 0.1)"}
            >
                <MenuGroup title={"- " + user_name + " -"}>
                    <Link href="/mypage" passHref>
                        <MenuItem
                        backgroundColor={"transparent"}
                        _hover={{backgroundColor: "rgba(130,130,130, 0.25)"}}
                        >プロフィール編集</MenuItem>
                    </Link>
                    <MenuItem 
                    onClick={ () => {execute();}}
                    backgroundColor={"transparent"}
                    _hover={{backgroundColor: "rgba(130,130,130, 0.25)"}}
                    >
                        ログアウト
                    </MenuItem>
                    { auth.currentUser?.email && 
                    <MenuItem 
                    onClick={() => executeSendEmail(auth.currentUser?.email)}
                    backgroundColor={"transparent"}
                    _hover={{backgroundColor: "rgba(130,130,130, 0.25)"}}
                    >
                        パスワードを変更する
                    </MenuItem> 
                    }
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title='- その他 -'>
                    <MenuItem
                    backgroundColor={"transparent"}
                    _hover={{backgroundColor: "rgba(130,130,130, 0.25)"}}
                    >
                        ヘルパー
                    </MenuItem>
                    <MenuItem
                    backgroundColor={"transparent"}
                    _hover={{backgroundColor: "rgba(130,130,130, 0.25)"}}
                    >
                        お問い合わせ
                    </MenuItem>
                </MenuGroup>
            </MenuList>
        </Menu>
    )
}