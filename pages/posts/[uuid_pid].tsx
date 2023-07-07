import { Box, Center, Heading, Stack } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

const PostPage: NextPage = () => {
const router = useRouter()
const uuid_pid = router.query.uuid_pid
return (
    <Box className="page">
        <Center>
            <Heading size={"md"}>これは投稿ページです</Heading>
            <Heading size={"md"}>uuid_pid : {uuid_pid}</Heading>
        </Center>
    </Box>
    )
}

export default PostPage