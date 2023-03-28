import { useContext } from "react"
import Link from "next/link"
import { AuthContext, UserInfoContext } from "../../util/hook/authContext"

import { auth } from "../../util/firebase/init"
import { Avatar, Box, Button, Flex, Heading } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"

import { Header } from "../../components/layouts/Header/Header"
import { ColorModeButton, GlassButton } from "../atom/buttons"
import { HeaderStyleContainer } from "../atom/containers"
import { GlassInput_search } from "../atom/inputs"
import { TitleLink } from "../atom/links"
import { HeaderMenu } from "../standalone/HeaderMenu"
import { LoginModal } from "../standalone/LoginModal"

export const BasicHeader = () => {
    const { userState } = useContext(AuthContext);
    const { userInfo } = useContext(UserInfoContext);
    const photo_path = userInfo?.photo_url ? userInfo.photo_url : auth.currentUser?.photoURL ? auth.currentUser.photoURL: undefined
    const user_name = userInfo?.user_name ? userInfo.user_name : auth.currentUser?.displayName ? auth.currentUser.displayName : "Guest";
    return (
        <HeaderStyleContainer>            
            {/* <Header/> */}
            <TitleLink fontSize={"1.3rem"}>tipsy</TitleLink>
            <ColorModeButton />
            <GlassInput_search errors={undefined} register={undefined} validation={undefined} id="search"/>
            { userState == 'isUser' &&   
                <>
                    <Link href="/user/post_create" passHref>
                        <GlassButton color="tipsy_color_2" p={0}><AddIcon /></GlassButton>
                    </Link>
                    <Link href="/user/my_page" passHref>
                        <Box bg={"tipsy_color_3"} p={0.5} borderRadius="full">
                            <Avatar size='sm' m={0} name={ user_name } src={ photo_path }/>
                        </Box>
                    </Link>
                    <HeaderMenu user_name={user_name} children={undefined}/>
                </>
            }
            { userState == 'guest' &&
                <>
                    <Link href="/signup" passHref>
                        <GlassButton 
                        fontSize={15} 
                        color="bg_switch" 
                        borderRadius={100} letterSpacing={5} px={5}
                        bgGradient={"linear(to-l, tipsy_color_2, tipsy_color_3)"} 
                        _hover={{bgGradient: "linear(to-l, tipsy_color_active_2, tipsy_color_active_3)"}}
                        >
                            新規登録
                        </GlassButton>
                    </Link>
                    <LoginModal/>
                </>
            }
            {/* { userState == 'loading' &&   
                <><Loading message="User Info Loading"/></>
            } */}
        </HeaderStyleContainer>
    )
}