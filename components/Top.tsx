import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react'
import  styles  from '../styles/components/Top.module.css';
import logo from '../styles/components/top_logo.module.css';
import TopBack from './TopBack';


const Top = () => {

    return (
        <>
            <Box className={ styles.top } >
                <TopBack/>
                <Flex width="80vw" mx="auto" h={250} bg="white" borderRadius={30} boxShadow='lg'  align="center" mt="20vh" className={ styles.top_card } border=".5px solid rgb(209, 209, 209)">
                    <Box className={logo.center} ml="56.850px">
                        <div className={logo.circle}>
                            <div className={logo.wave}></div>
                            <Text className={logo.title}>t</Text>
                            <Text className={logo.dot}>.</Text>
                        </div>
                    </Box>
                    <Flex mx="6vw" direction="column" align="start" justify="center">
                        <Text fontSize={20} fontWeight="bold" color='orange.300' className={ logo.comment } textShadow='2px 2px #bee3f8'>Welcom to</Text>
                        <Heading className={ logo.tipsy } fontWeight="extrabold" color='orange.300' fontSize={40}>Tipsy</Heading>
                        <Text fontSize={20} mt="5px" fontWeight="normal" color='blue.200' className={ logo.comment } textShadow='2px 2px #FEEBC8'>Tips Sharing Platform</Text>
                        <Text fontSize={15} fontWeight="normal" mt={1} color="#F6AD55" className={ logo.comment } textShadow='2px 2px #D0E6FF'>Share your Tips</Text>
                        <Text fontSize={15} fontWeight="normal" color="#F6AD55" className={ logo.comment } textShadow='2px 2px #D0E6FF'>Memo & Remember</Text>
                        <Text fontSize={20} fontWeight="normal" color='blue.200' className={ logo.comment } textShadow='2px 2px #FEEBC8'>Enjoy self-studying !</Text>
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}

export default Top