import React from 'react'
import { NextPage } from 'next'

import { Header } from '../../components/layouts/Header/Header'
import MyTop from '../../components/MyTop'

import  styles  from '../../style/components/Top.module.css';
import { Box } from '@chakra-ui/react'
import { BasicHeader } from '../../component/layout/Header';

const Mypage: NextPage  = () => {
    // レンダリング時にuser情報をfirebaseから取得し直す処理（（SSG時にはnullになっている？）
    return (
    <>
        <BasicHeader></BasicHeader>
        <Box className="page"  >
            <MyTop/>
            <div className={ styles.container }>
                
            </div>
        </Box>
    </>
    )
}

export default Mypage