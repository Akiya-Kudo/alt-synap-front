import { useContext } from "react"
import Link from "next/link"
import { AuthContext, UserInfoContext } from "../../util/hook/authContext"

import { auth } from "../../util/firebase/init"
import { Avatar, Box, Button, Flex, Heading, SimpleGrid, Wrap, WrapItem } from "@chakra-ui/react"
import { AddIcon, ArrowBackIcon } from "@chakra-ui/icons"

import { Header } from "../../components/layouts/Header/Header"
import { ColorModeButton, GlassButton, GlassIconButton } from "../atom/buttons"
import { BasicHeaderStyleContainer } from "../atom/containers"
import { GlassInput_search } from "../atom/inputs"
import { TitleLink } from "../atom/links"
import { HeaderMenu } from "../standalone/HeaderMenu"
import { LoginModal } from "../standalone/LoginModal"
import { useForm } from "react-hook-form"
import { PostHeaderProps } from "../../type/layout"
import { useRouter } from "next/router"
import { GlassSwitch } from "../atom/switchs"

export const BasicHeader = () => {

    const { userState } = useContext(AuthContext);
    const { userInfo } = useContext(UserInfoContext);
    const photo_path = userInfo?.photo_url ? userInfo.photo_url : auth.currentUser?.photoURL ? auth.currentUser.photoURL: undefined
    const user_name = userInfo?.user_name ? userInfo.user_name : auth.currentUser?.displayName ? auth.currentUser.displayName : "Guest";
    return (
        <BasicHeaderStyleContainer>
            <Flex
            alignItems='center' 
            gap={5}
            >
                <TitleLink fontSize={"1.3rem"}>tipsy</TitleLink>
                <ColorModeButton />
                <GlassInput_search id="search"/>
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
                        <Link href="/guest/signup" passHref>
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
            </Flex>
        </BasicHeaderStyleContainer>
    )
}

export const PostHeader = ({
    children, title
}: PostHeaderProps) => {
    const router = useRouter()
    return (
        <BasicHeaderStyleContainer>
            <Flex
            alignItems='center' 
            gap={5}
            >
                <GlassIconButton
                aria-label="ページを戻る"
                icon={<ArrowBackIcon/>}
                size={"md"} bg="transparent" color={"tipsy_color_2"} variant='outline'
                onClick={() => {router.back()}}
                />
                <ColorModeButton variant='outline'/>

                {/* 左右要素調整Box */}
                <Box flexGrow={1}></Box>
                {/* 中央要素 */}
                <Heading
                children={title} 
                size={"md"}
                position="absolute"
                left={"50%"}
                top={"50%"}
                transform="translateY(-50%) translateX(-50%)"
                m="auto"
                />
                {children}
            </Flex>
        </BasicHeaderStyleContainer>
    )
}