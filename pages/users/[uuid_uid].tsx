import { Box, Center, Heading, Stack } from '@chakra-ui/react'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

const UsersPage: NextPage = () => {
const router = useRouter()
const uuid_uid = router.query.uuid_uid
return (
    <>
    <Head><title>Tipsy | { "userだれ"}</title></Head>
        <Box className="page">
            <Center>
                <Heading size={"md"}>これはUSERページです</Heading>
                <Heading size={"md"}>uuid_uid : {uuid_uid}</Heading>
            </Center>
        </Box>
    </>
    )
}

export default UsersPage