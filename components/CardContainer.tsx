import { LinkOnlyCard } from './cards'
import React from 'react'

import styles from '../styles/components/Top.module.css'
import { Box, SimpleGrid } from '@chakra-ui/react'

const CardContainer = () => {
    return (
        <div className={ styles.container }>
            <SimpleGrid columns={[2, 3, 4]} spacing='40px'>
                <LinkOnlyCard />
                <LinkOnlyCard />
                <LinkOnlyCard />
                <LinkOnlyCard />
                <LinkOnlyCard />
                <LinkOnlyCard />
            </SimpleGrid>
        </div>
    )
}

export default CardContainer