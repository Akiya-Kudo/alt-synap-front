import { Html, Head, Main, NextScript } from 'next/document'

import { ColorModeScript } from '@chakra-ui/react'
import { theme } from '../style/global/theme';

export default function Document() {
    return (
        <Html lang='ja'>
            <Head/>
            <body>
                <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}