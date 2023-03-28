import { Box, Link } from "@chakra-ui/react"
import NextLink from 'next/link'
import { BasicLinkBoxProps, BasicLinkProps } from "../../type/atom"

export const BasicLink = ({
    children="hello",
    href="/",
    ...props
}: BasicLinkProps) => {
    return (
        <NextLink href={href} passHref>
            <Link 
            {...props}
            >
                {children}
            </Link>
        </NextLink>

    )
}

export const TitleLink = ({
    children="Tipsy",
    bgClip="text", bgGradient="linear(to-tl, tipsy_color_1, tipsy_color_2, tipsy_color_3)",
    letterSpacing=5, fontWeight="bold",
    ...props
}: BasicLinkBoxProps) => {
    return (
        <NextLink href="/" passHref>
            <Box 
            {...props}
            bgGradient={bgGradient} bgClip={bgClip}
            letterSpacing={letterSpacing} fontWeight={fontWeight}
            >
                {children}
            </Box>
        </NextLink>
    )
}
