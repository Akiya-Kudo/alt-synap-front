import { useContext, useEffect, useState } from "react"
import Link from "next/link"
import { AuthContext, LoginToggleContext } from "../../util/hook/authContext"

import { auth } from "../../util/firebase/init"
import { Avatar, Box, Center, Flex, Heading, IconButton, MenuButton, useBreakpointValue, useDisclosure } from "@chakra-ui/react"
import { AddIcon, ArrowBackIcon } from "@chakra-ui/icons"
import { TfiUnlink } from "react-icons/tfi"

import { ColorModeButton, GlassButton, GlassIconButton } from "../atom/buttons"
import { BasicHeaderStyleContainer } from "../atom/containers"
import { GlassInput_search } from "../atom/inputs"
import { TitleLink } from "../atom/links"
import { HeaderMenu } from "../standalone/HeaderMenu"
import { PostHeaderProps } from "../../type/layout"
import { useRouter } from "next/router"
import { useLoading } from "../../util/hook/useAuth"
import { LinkSelectMenu } from "../helper/LinkSelectMenu"
import { Collection } from "../../type/global"
import { client } from "../../pages/_app"
import { USER_QUERY } from "../../util/graphql/queries/users.query.schema"
import { useLinkSearch } from "../../util/hook/useLink"
import { AddPostSelectMenu } from "../helper/AddPostSelectNemu"
import { useLazyQuery } from "@apollo/client"
import { GET_GUEST_COLLECTIOINS } from "../../util/graphql/queries/links.query.scheme"
import { GlassAlert } from "../atom/alerts"

export const BasicHeader = () => {
    const breakpoint = useBreakpointValue(["base", "sm", "md", "lg", "xl", "2xl"]);
    
    const router = useRouter()
    
    const { userState } = useContext(AuthContext);
    const { onOpen_login } = useContext(LoginToggleContext);

    const { onClose, isOpen, onToggle } = useDisclosure()
    //input value取得 & ページによる切り替え & 検索
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

    const [searchWords, setSearchWords] = useState<string>("")
    const [collections, setCollections] = useState<Collection[]>([])

    const [getGuestCollections] = useLazyQuery(GET_GUEST_COLLECTIOINS)
    const data_user = client.readQuery({
        query: USER_QUERY,
        variables: {
            uid: auth.currentUser?.uid,
        },
    });

    useEffect(() => {
        if (userState=="isUser") {
            setCollections(data_user?.user?.collections ? data_user?.user?.collections : [])
        } else if (userState=='guest') {
            getGuestCollections().then(res => setCollections(res.data.get_guest_collections)).catch(error => console.log(error)
            )
        }
    },[data_user, userState])

    const handleMultLink = (cid: number) => {
        const links = collections.find(col => col.cid == cid)?.link_collections?.map(li_col => {
            useLinkSearch(li_col.links, searchWords)
        })
    }
    return (
        <BasicHeaderStyleContainer>
            {userState=="loading" && useLoading()}
            <Flex
            alignItems='center' 
            gap={5}
            >
                <TitleLink fontSize={"1.5rem"}>tipsy</TitleLink>
                <ColorModeButton />
                <GlassInput_search 
                id="search" placeholder="tipsyで検索"
                value={searchWords}
                setValue={ setSearchWords }
                onSearch={ handleSearch }
                right_element={(                
                    <Center>
                            <LinkSelectMenu 
                            title={"- Mult Link Search -"} collections={collections} handleClick={handleMultLink}
                            onClose={onClose} isOpen={isOpen}
                            placement={'bottom'}
                            >
                                <MenuButton 
                                as={IconButton} icon={<TfiUnlink/>} aria-label="multi-link-search"
                                _hover={{ filter: 'brightness(1.2)' }} 
                                color="tipsy_color_2"
                                bg={"bg_popover_switch"}
                                borderRadius={"full"}
                                fontSize={"1.3em"} size={"sm"}
                                onClick={onToggle}
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
                                <Avatar size='sm' m={0} name={ data_user?.user?.user_name } src={ data_user?.user?.user_image }/>
                            </Box>
                        </Link>
                        <HeaderMenu user_name={data_user?.user?.user_name} children={undefined}/>
                    </>
                }
                { userState == 'guest' &&
                    <>
                        <Link href="/guest/signup" passHref>
                            <GlassButton 
                            color="bg_switch" 
                            borderRadius={"full"} letterSpacing={5} px={[10, 10, 7]}
                            bgGradient={"linear(to-l, tipsy_color_2, tipsy_color_3)"} 
                            _hover={{bgGradient: "linear(to-l, tipsy_color_active_2, tipsy_color_active_3)"}}
                            >
                                新規登録
                            </GlassButton>
                        </Link>
                        <GlassButton 
                        onClick={onOpen_login}
                        borderRadius={"full"} letterSpacing={5} px={[10, 10, 7]}
                        bgGradient={"linear(to-l, tipsy_color_1, tipsy_color_2)"} color="bg_switch" 
                        _hover={{bgGradient: "linear(to-l, tipsy_color_active_1, tipsy_color_active_2)"}}
                        >
                            ログイン
                        </GlassButton>
                    </>
                }
            </Flex>
        </BasicHeaderStyleContainer>
    )
}

export const PostHeader = ({
    children, title, isBackAlertOn=false,
}: PostHeaderProps) => {
    const router = useRouter()
    const { userState } = useContext(AuthContext);
    const { isOpen: isOpen_back, onOpen: onOpen_back, onClose: onClose_back } = useDisclosure()
    const handleBack = () => {
        if (isBackAlertOn) {
            onOpen_back()
        } else {
            router.back()
        }
    }
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
                onClick={handleBack}
                />
                <GlassAlert
                isOpen={isOpen_back} onOpen={onOpen_back} onClose={onClose_back} 
                alertTitle={"投稿がセーブされていません。"} alertMessage={"セーブせずに戻ると編集した内容がすべて削除されます。本当に戻りますか？"} 
                exeMessage="はい" cancelMessage={"やめる"} handleExecute={() => {router.back()}}
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