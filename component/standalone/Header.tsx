import { useContext } from "react"
import Link from "next/link"
import { AuthContext, UserInfoContext } from "../../util/hook/authContext"

import { auth } from "../../util/firebase/init"
import { Avatar, Box, Button, Flex, Heading } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"

import { Header } from "../../components/layouts/Header/Header"
import { ColorModeButton, GlassButton } from "../atom/buttons"
import { HeaderStyleContainer } from "../atom/containers"
import { GlassSearchInput } from "../atom/inputs"
import { TitleText } from "../atom/texts"
import { HeaderMenu } from "../helper/HeaderMenu"

export const BasicHeader = () => {
    const { userState } = useContext(AuthContext);
    const { userInfo } = useContext(UserInfoContext);
    const photo_path = userInfo?.photo_url ? userInfo.photo_url : auth.currentUser?.photoURL ? auth.currentUser.photoURL: undefined
    const user_name = userInfo?.user_name ? userInfo.user_name : auth.currentUser?.displayName ? auth.currentUser.displayName : "Guest";
    return (
        <HeaderStyleContainer>            
            {/* <Header/> */}
            <TitleText fontSize={"1.3rem"}>tipsy</TitleText>
            <ColorModeButton />
            <GlassSearchInput/>
            { userState == 'isUser' &&   
                <>
                    <Link href="/user/post_create" passHref>
                        <GlassButton color="tipsy_gradient_2" p={0}><AddIcon /></GlassButton>
                    </Link>
                    <Link href="/user/my_page" passHref>
                        <Box bg={"tipsy_gradient_3"} p={0.5} borderRadius="full">
                            <Avatar size='sm' m={0} name={ user_name } src={ photo_path }/>
                        </Box>
                    </Link>
                    <HeaderMenu user_name={user_name} children={undefined}/>
                </>
            }
            {/* { userState == 'guest' &&
                <>
                    <Link href="/signup" passHref><Button colorScheme='orange' color='orange.300' variant='ghost' size='sm'>SIGN UP</Button></Link>
                    <MyModal title={"LOG IN"}>
                        <LoginForm/>
                    </MyModal>

                </>
            }
            { userState == 'loading' &&   
                <><Loading message="User Info Loading"/></>
            } */}
        </HeaderStyleContainer>
    )
}