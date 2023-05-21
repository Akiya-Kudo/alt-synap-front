import React from 'react'
import { NextPage } from 'next'

import { Box } from '@chakra-ui/react'
import { BasicHeader } from '../../component/layout/Header';

const Mypage: NextPage  = () => {
    // レンダリング時にuser情報をfirebaseから取得し直す処理（（SSG時にはnullになっている？）
    return (
    <>
        <BasicHeader></BasicHeader>
        <Box className="page"  >
        </Box>
    </>
    )
}

export default Mypage