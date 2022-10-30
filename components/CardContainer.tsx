import { ContentCard, LinkOnlyCard, PictureContentCard, PictureLinkOnlyCard } from './cards'
import React from 'react'

import styles from '../styles/components/Top.module.css'
import { Grid, GridItem, SimpleGrid } from '@chakra-ui/react'

const CardContainer = () => {

    return (
        <div className={ styles.container }>
            <Grid 
            templateColumns={{ base:"repeat(1, 1fr)", lg: "repeat(2, 1fr)"}}  
            templateRows={"repeat(20, 1fr)"}
            gap='30px'
            >
            {/* SimpleGrid {[1, null, 2, null, null, null, 3]} */}
                <LinkOnlyCard title="これから学ぶべきTypeScriptフレームワーク 4選" />
                <ContentCard title="Tailwind の命名方法" />
                <GridItem rowSpan={2}>
                    <PictureLinkOnlyCard title="【設計編】はじめてのReactで都道府県を当てるゲームをつくりました" src="/image3.png"/>
                </GridItem>
                <GridItem rowSpan={1}>
                    <LinkOnlyCard title="【設計編】はじめてのReactで都道府県を当てるゲームをつくりました" />
                </GridItem>
                <GridItem rowSpan={1}>
                    <ContentCard title="Tailwind の命名方法" />
                </GridItem>
                <GridItem rowSpan={1}>
                    <LinkOnlyCard title="【設計編】はじめてのReactで都道府県を当てるゲームをつくりました" />
                </GridItem>
                <GridItem rowSpan={1}>
                    <ContentCard title="html : positionプロパティ集" />
                </GridItem>
                <GridItem rowSpan={2}>
                    <PictureLinkOnlyCard title="Tailwind の命名方法" src="/image1.jpg"/>
                </GridItem>
                <GridItem rowSpan={2}>
                    <PictureContentCard title="Tailwind の命名方法" src="/image2.png"/>
                </GridItem>
                <GridItem rowSpan={2}>
                    <PictureLinkOnlyCard title="Tailwind の命名方法" src="/image2.png"/>
                </GridItem>
                <GridItem rowSpan={1}>
                    <ContentCard title="html : positionプロパティ集" />
                </GridItem>
            </Grid>
        </div>
    )
}

export default CardContainer