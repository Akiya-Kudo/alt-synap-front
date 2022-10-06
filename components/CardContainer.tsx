import { ContentCard, LinkOnlyCard, PictureLinkOnlyCard } from './cards'
import React from 'react'

import styles from '../styles/components/Top.module.css'
import { SimpleGrid } from '@chakra-ui/react'

const CardContainer = () => {
    return (
        <div className={ styles.container }>
            <SimpleGrid columns={[1, null, 2, null, null, null, 3]} spacing='30px'>
                <LinkOnlyCard title="これから学ぶべきTypeScriptフレームワーク 4選" />
                <ContentCard title="Tailwind の命名方法" />
                <PictureLinkOnlyCard title="Tailwind の命名方法" />
                <ContentCard title="Tailwind の命名方法" />
                <LinkOnlyCard title="【設計編】はじめてのReactで都道府県を当てるゲームをつくりました" />
                <ContentCard title="html : positionプロパティ集" />
            </SimpleGrid>
        </div>
    )
}

export default CardContainer