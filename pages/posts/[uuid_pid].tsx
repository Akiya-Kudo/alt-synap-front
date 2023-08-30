import { Box, Center, Heading, Stack } from '@chakra-ui/react'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

const PostPage: NextPage = () => {
const router = useRouter()
const uuid_pid = router.query.uuid_pid
return (
    <>
    <Head><title>Tipsy | 投稿:{}</title></Head>
        <Box className="page">
            <Center>
                <Heading size={"md"}>これは投稿ページです</Heading>
                <Heading size={"md"}>uuid_pid : {uuid_pid}</Heading>
            </Center>
        </Box>
    </>
    )
}

export default PostPage