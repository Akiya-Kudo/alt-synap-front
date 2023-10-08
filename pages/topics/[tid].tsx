import { useMutation, useQuery } from '@apollo/client'
import { Avatar, Box, Flex, Heading, Link } from '@chakra-ui/react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { FaHashtag } from 'react-icons/fa'
import { DentBord } from '../../component/atom/bords'
import { SwitchButton } from '../../component/atom/buttons'
import { UserTag } from '../../type/global'
import { auth } from '../../util/firebase/init'
import { TOGGLE_USER_TAG } from '../../util/graphql/mutation/users.mutation.scheme'
import { GET_TAG } from '../../util/graphql/queries/tags.query.scheme'
import { USER_QUERY } from '../../util/graphql/queries/users.query.schema'
import { AuthContext, LoginToggleContext } from '../../util/hook/authContext'
import { useColorRandomPick } from '../../util/hook/useColor'
import { client } from '../_app'

const TipsyPostsSearchBoard = dynamic(
    () => import("../../component/standalone/TipsyPostsSearchBoard"),
    { ssr: false }
);

const TopicPage: NextPage = () => {
    const router = useRouter()
    const tid = parseInt( router.query.tid as string )
    const { userState } = useContext(AuthContext);
    const { onOpen_login } = useContext(LoginToggleContext);

    const { loading, error, data } = useQuery(GET_TAG,  { variables: { tid: tid }})

    const [isFavorite, setIsFavorite] = useState(false)
    const [toggleUserTag, {error: error_user_tags}] = useMutation(TOGGLE_USER_TAG, {
        variables: { tid: tid },
        update( cache, { data: { favorite_tag_toggle } } ) {
            //update login user's num
            cache.updateQuery({
                query: USER_QUERY,
                variables: {uid: auth.currentUser?.uid},
            },
            (data) => {
                if (isFavorite) {
                    return ({ user: { user_tags: data.user.user_tags.filter((userTag: UserTag) => userTag.tid !== favorite_tag_toggle.tid)}})
                } else {
                    return ({ user: { user_tags: [...data.user.user_tags, favorite_tag_toggle] }})
                }
                
            }
        )
        }
    })

    const handleFavoriteButton = async (e:any) => {
        if (userState=='isUser') {
            await toggleUserTag()
            .catch(error => console.log(error))
        } else if (userState=='guest') {
            onOpen_login()
        }
    }
    
    // read which login user is favariting the tag, when userState is work
    useEffect(()=>{
        const user_data = client.readQuery({ query: USER_QUERY, variables: { uid: auth.currentUser?.uid }});
        setIsFavorite(user_data?.user.user_tags.some((userTag: UserTag) => userTag.tid === tid) )
    },[userState])
    
    const colorList = useColorRandomPick(undefined, 9)
    if (error) console.log(error);
    return (
        <>
        <Head><title>Tipsy | タグ:{}</title></Head>
            <Flex flexDir={"column"} align={"center"} mt={5} className="page">
                <DentBord 
                maxW={"1100px"} w={"90%"} justifyContent={"start"} p={7} borderRadius={"30px"} 
                flexDir={["column", "column", "row"]}
                >
                    <Flex flexDir={["column", "row"]} flexGrow={1} alignItems={"center"}>
                        { data?.tag?.tag_image ? 
                            <Avatar src={data?.tag?.tag_image} name={data?.tag.display_name} m={1} size={["xl", "lg"]}/> 
                            : 
                            <Box mr={.5} ps={1}><FaHashtag color={colorList[0].split("_")[0]} opacity={0.7} fontSize={"60px"}/></Box>
                        }

                        <Flex ms={[0, 5, 5]} direction="column" alignItems={["center", "start"]}>
                            <Heading size={"lg"} m={1}>{data?.tag.display_name}</Heading>
                            <Flex align={"center"} flexWrap={"wrap"}>
                                <Heading size={"sm"} mx={3} my={1} whiteSpace={"nowrap"}>Googleで調べる : </Heading>
                                <Link 
                                whiteSpace={"nowrap"}
                                color={"tipsy_color_2"} fontSize={".75rem"} isExternal
                                href={`https://www.google.co.jp/search?q=${data?.tag.display_name}`}
                                >
                                    {`https://www.google.co.jp/search?q=${data?.tag.display_name}`}
                                </Link>
                            </Flex>
                        </Flex>
                    </Flex>

                    <Box>
                        {
                            data?.tag &&
                            <SwitchButton
                            fontSize={[10, 12, 15, 22, 30, 40]}
                            mx={1} my={[8,8,0]} px={10} py={[7, 5, 4]}
                            Hcolor={"tipsy_color_1"} Acolor={"tipsy_color_1v2"} Scolor={"tipsy_color_1v2"}
                            defaultChecked={ isFavorite }
                            Schildren={"お気に入り"}
                            onClick={handleFavoriteButton}
                            ActiveDisabled={userState!='isUser'}
                            >
                                お気に入りに登録
                            </SwitchButton>
                        }
                    </Box>
                </DentBord>

                <TipsyPostsSearchBoard query_text={null} selectedTid={tid} isTagBoardDisplay/>
            </Flex>
        </>
    )
}

export default TopicPage