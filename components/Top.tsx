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
                <Flex width="80vw" mx="auto" h={250} bg="white" borderRadius={30} boxShadow='lg'  align="center" mt="20vh" className={ styles.top_card } >
                    <Box className={logo.center} ml="auto">
                        <div className={logo.circle}>
                            <div className={logo.wave}></div>
                            <Text className={logo.title}>t</Text>
                            <Text className={logo.dot}>.</Text>
                        </div>
                    </Box>

                    <Flex mx="6vw" direction="column" align="start" justify="center">
                        <Heading className={ logo.tipsy } fontWeight="extrabold" color='orange.300' fontSize={40}>Tipsy</Heading>
                        <Text fontSize={20} mt="5px" fontWeight="bold" color='orange.300' className={ logo.comment } textShadow='2px 2px #FEEBC8'>Tips Sharing Platform</Text>
                        <Text fontSize={15} fontWeight="bold" mt={1} color="#90CDF4" className={ logo.comment } textShadow='2px 2px #FEEBC8'>Share your Tips</Text>
                        <Text fontSize={15} fontWeight="bold" color="#90CDF4" className={ logo.comment } textShadow='2px 2px #FEEBC8'>Memo & Remember</Text>
                        <Text fontSize={20} fontWeight="bold" color='orange.300' className={ logo.comment } textShadow='2px 2px #FEEBC8'>Enjoy self-studying !</Text>
                    </Flex>
                </Flex>
            </Box>
            <div className={ styles.container }>

            </div>
        </>
    )
}

export default Top