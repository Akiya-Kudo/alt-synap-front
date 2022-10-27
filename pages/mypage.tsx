import React from 'react'
import { NextPage } from 'next'

import { Header } from '../components/layouts/Header/Header'

import { Box } from '@chakra-ui/react'
import MyTop from '../components/MyTop'

const Mypage: NextPage  = () => {

    return (
    <>
        <Header/>
        <Box className="page"  >
            <MyTop/>
        </Box>
    </>
    )
}

export default Mypage