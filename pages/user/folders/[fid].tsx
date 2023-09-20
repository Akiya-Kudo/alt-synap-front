import { useLazyQuery, useQuery } from '@apollo/client'
import { Avatar, Box, Center, Flex, Heading, Image, Link } from '@chakra-ui/react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { SharpBoard } from '../../../component/atom/bords'
import { PostHeader } from '../../../component/layout/Header'
import { Folder, FolderPost, Post } from '../../../type/global'
import { auth } from '../../../util/firebase/init'
import { USER_QUERY } from '../../../util/graphql/queries/users.query.schema'
import { GET_FOLDER_POSTS } from '../../../util/graphql/queries/folders.query.scheme'
import { AuthContext } from '../../../util/hook/authContext'
import { client } from '../../_app'
import { useNeumorphismColorMode } from '../../../util/hook/useColor'

const TipsyPostsDisplay = dynamic(
    () => import('../../../component/helper/TipsyPostsDisplay'),
    { ssr: false }
);

const TopicPage: NextPage = () => {
    const { userState } = useContext(AuthContext);
    const router = useRouter()
    const fid = parseInt( router.query.fid as string )

    const [folderInfo, setFolderInfo] = useState<Folder | null>(null)
    const [displayPosts, setDisplayPosts] = useState<Post[]>([])
    const [allPostsCount, setAllPostsCount] = useState<number>(0)
    const [getPostsOfFolder, { error, loading, data, fetchMore }] = useLazyQuery(GET_FOLDER_POSTS, {
        variables: {
            fid: fid,
            offset: 0
        },
    })

    const handleFetchMoreFolderPosts = async () => {
        const res = await fetchMore({ variables: { offset: displayPosts.length }})
        const posts = res.data.get_folder_posts.map((fol_pos: FolderPost) => fol_pos.posts)
        setDisplayPosts([...displayPosts, ...posts])
    }


    useEffect(() => {
        if (userState == "isUser") {
            const cache = client.readQuery({ query: USER_QUERY, variables: { uid:  auth.currentUser?.uid }})
            setFolderInfo(cache?.user.folders?.find((folder: Folder) => folder.fid == fid))

            getPostsOfFolder().then(res => {
                const posts = res.data.get_folder_posts.map((fol_pos: FolderPost) => fol_pos.posts)
                setDisplayPosts(posts)
                setAllPostsCount(res.data.count_folder_posts)
            })
        }
    },[userState])
    
    // console.log(displayPosts);
    // console.log(allPostsCount);
    const { highlight, shadow } = useNeumorphismColorMode()
    return (
        <>
        <Head><title>{"Folder : " + folderInfo?.title}</title></Head>
            <PostHeader title={"〜の投稿"}></PostHeader>

            <Flex flexDir={"column"} align={"center"} mt={5} className="page" gap={10}>
                <SharpBoard
                maxW={"90%"} minW={"300px"} justifyContent={"center"} p={5} borderRadius={"30px"} 
                flexDirection={"column"} gap={5}
                neumH={"shallow"}
                >
                    {
                        folderInfo?.top_image &&
                        <Image
                        src={folderInfo?.top_image}
                        width={300} height={300} borderRadius={20}
                        boxShadow={`5px 5px 15px ${shadow}, -5px -5px 15px ${highlight};`}
                        />
                    }
                    <Heading size={"md"} maxW={"700px"}
                    >{folderInfo?.title}</Heading>
                </SharpBoard>

                <TipsyPostsDisplay
                displayPosts={displayPosts}
                allPostsCount={allPostsCount}
                handleFetchMore={handleFetchMoreFolderPosts}
                error={error} loading={loading || userState!="isUser"}
                not_found_message={"Folderの投稿は見つかりませんでした"}
                />
            </Flex>
        </>
    )
}

export default TopicPage