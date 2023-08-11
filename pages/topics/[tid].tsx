import { Box, Center, Heading, Stack } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

const TopicPage: NextPage = () => {
const router = useRouter()
const tid = router.query.tid
return (
    <Box className="page">
        <Center>
            <Heading size={"md"}>これはTOPICページです</Heading>
            <Heading size={"md"}>tid : {tid}</Heading>
        </Center>
    </Box>
    )
}

export default TopicPage