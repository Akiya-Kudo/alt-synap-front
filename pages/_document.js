import { Html, Head, Main, NextScript } from 'next/document'

import { ColorModeScript } from '@chakra-ui/react'
import { theme } from '../style/global/theme';
import Script from 'next/script';

export default function Document() {
    return (
        <Html lang='ja'>
            <Head>
                <link rel="icon" href="/tipsy_logo.ico" />
                <Script async src="https://cse.google.com/cse.js?cx=000888210889775888983:pqb3ch1ewhg"></Script>
            </Head>
            <body>
                <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}