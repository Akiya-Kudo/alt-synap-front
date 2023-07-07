import React from 'react';
import styles from '../../style/atom/snake_loader.module.css';
import styles2 from '../../style/atom/neum_loader.module.css';
import styles3 from '../../style/atom/circle_loader.module.css';
import { Box, useColorMode } from '@chakra-ui/react';
export const SnakeLoader = () => {
    return (
        <>
        <div className={styles.container}>
            <svg width="100%" height="100" viewBox="-1 -1 22 22">
                <path style={{ '--order': 7 } as React.CSSProperties } className={`${styles.eight} e-8`}></path>
                <path style={{ '--order': 6 } as React.CSSProperties } className={`${styles.eight} e-7`}></path>
                <path style={{ '--order': 5 } as React.CSSProperties } className={`${styles.eight} e-6`}></path>
                <path style={{ '--order': 4 } as React.CSSProperties } className={`${styles.eight} e-5`}></path>
                <path style={{ '--order': 3 } as React.CSSProperties } className={`${styles.eight} e-4`}></path>
                <path style={{ '--order': 2 } as React.CSSProperties } className={`${styles.eight} e-3`}></path>
                <path style={{ '--order': 1 } as React.CSSProperties } className={`${styles.eight} e-3`}></path>
                <path style={{ '--order': 0 } as React.CSSProperties } className={`${styles.eight} e-1`}></path>
            </svg>
        </div>
        </>
    )
}

export const NeumLoader = () => {
    const { colorMode } = useColorMode()
    return (
        <>
        <Box position={"relative"} w={100} h={100}>
            <div className={styles2.loader}>
                <div className={ colorMode === 'dark' ? styles2.item1_dark : styles2.item1 }></div>
                <div className={ colorMode === 'dark' ? styles2.item2_dark : styles2.item2 }></div>
                <div className={ colorMode === 'dark' ? styles2.item3_dark : styles2.item3 }></div>
            </div>
        </Box>
        </>
    )
}

export const CircleLoader = () => {
    const { colorMode } = useColorMode()
    return (
        <div className={ colorMode === 'dark' ? styles3.darkLoader : styles3.lightLoader }></div>
    )
}