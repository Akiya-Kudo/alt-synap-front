import { useContext, useEffect, useState } from "react"
import Link from "next/link"
import { AuthContext } from "../../util/hook/authContext"

import { auth } from "../../util/firebase/init"
import { Avatar, Box, Button, Center, Flex, Heading, IconButton, MenuButton } from "@chakra-ui/react"
import { AddIcon, ArrowBackIcon } from "@chakra-ui/icons"
import { TfiUnlink } from "react-icons/tfi"

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
import { useLoading } from "../../util/hook/useAuth"
import { data } from "../standalone/LinkBoard"
import { LinkSelectMenu } from "../helper/LinkSelectMenu"
import { Collection } from "../../type/global"
import { client } from "../../pages/_app"
import { USER_QUERY } from "../../util/graphql/queries/users.query.schema"
import { useLinkSearch } from "../../util/hook/useLink"
import { AddPostSelectMenu } from "../helper/AddPostSelectNemu"

export const BasicHeader = () => {

    const [searchWords, setSearchWords] = useState<string>("")

    //input value取得 & ページによる切り替え & 検索
    const router = useRouter()
    const defValue = router.query.words as string
    useEffect(() => {
        if (router.pathname == '/search') setSearchWords(defValue)
        else setSearchWords("")
    },[defValue])
    const handleSearch = () => {
        router.push({
            pathname: '/search',
            query: {words: searchWords},
        })
    }    

    //header内user情報
    const { userState } = useContext(AuthContext);

    let collections = [] as Collection[]
    const data_user = client.readQuery({
        query: USER_QUERY,
        variables: {
            uid: auth.currentUser?.uid,
        },
    });
    if (data_user) {
        collections = data_user?.user?.collections
    } 
    if (userState == "guest") {
        //サンプルコレクションを表示
    }

    const handleMultLink = (cid: number) => {
        const links = collections.find(col => col.cid == cid)?.link_collections?.map(li_col => {
            useLinkSearch(li_col.links, searchWords)
            const joined_words = searchWords?.toLowerCase().replace(/　/g, ' ').replace(' ', li_col.links.joint)
            const link_path = li_col.links.url_scheme + "?" + li_col.links.query + "=" + joined_words
            return link_path
        })
        // links?.map(link => window.open(link, '_blank'))
    }

    return (
        <BasicHeaderStyleContainer>
            {userState=="loading" && useLoading()}
            <Flex
            alignItems='center' 
            gap={5}
            >
                <TitleLink fontSize={"1.3rem"}>tipsy</TitleLink>
                <ColorModeButton />
                <GlassInput_search 
                id="search"
                value={searchWords}
                setValue={ setSearchWords }
                onSearch={ handleSearch }
                right_element={(                
                    <Center>
                            <LinkSelectMenu title={"- Mult Link Search -"} collections={collections} handleClick={handleMultLink}>
                                <MenuButton 
                                as={IconButton} icon={<TfiUnlink/>} aria-label="multi-link-search"
                                _hover={{ filter: 'brightness(1.2)' }} 
                                color="tipsy_color_2"
                                bg={"bg_popover_switch"}
                                borderRadius={"full"}
                                fontSize={"1.3rem"} size={"sm"}
                                />
                            </LinkSelectMenu>
                    </Center>
                )}
                />
                { userState == 'isUser' &&   
                    <>
                        <AddPostSelectMenu >
                            <MenuButton 
                            as={IconButton} icon={<AddIcon />} 
                            color="tipsy_color_3" p={0} borderRadius={"full"}
                            />
                        </AddPostSelectMenu>
                        <Link href="/user/my_page" passHref>
                            <Box bg={"tipsy_color_3"} p={0.5} borderRadius="full">
                                <Avatar size='sm' m={0} name={ data_user.user.user_name } src={ data_user.user.user_image }/>
                            </Box>
                        </Link>
                        <HeaderMenu user_name={data_user.user.user_name} children={undefined}/>
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
            </Flex>
        </BasicHeaderStyleContainer>
    )
}

export const PostHeader = ({
    children, title
}: PostHeaderProps) => {
    const router = useRouter()
    const { userState } = useContext(AuthContext);
    return (
        <BasicHeaderStyleContainer>
            {userState=="loading" && useLoading()}
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

export const LinkHeader = ({
    children, title
}: PostHeaderProps) => {
    const router = useRouter()
    const { userState } = useContext(AuthContext);
    return (
        <BasicHeaderStyleContainer>
            {userState=="loading" && useLoading()}
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