import React from 'react'
import { NextPage } from 'next'

import { Header } from '../components/layouts/Header/Header'
import MyTop from '../components/MyTop'

import  styles  from '../styles/components/Top.module.css';
import { Box } from '@chakra-ui/react'

const Mypage: NextPage  = () => {

    return (
    <>
        <Header/>
        <Box className="page"  >
            <MyTop/>
            <div className={ styles.container }>
                
            </div>
        </Box>
    </>
    )
}

export default Mypage