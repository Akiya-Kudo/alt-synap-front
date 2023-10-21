import React from "react"
import { Avatar, Box } from '@chakra-ui/react';
import { Collection, Link } from '../../type/global';
import { ClickButtonFlat, GlassButton } from '../../component/atom/buttons';

export const NeumLinkDisplay = ({collection, handleLink, direction, h, w}: {
    collection?: Collection, handleLink: (link: Link) => void,
    direction: "column" | "row", h?: string | number | (string | number)[], w?: string | number | (string | number)[],
}) => {
    return (
        <Box overflow={"scroll"} whiteSpace={direction=="column"? "normal" : "nowrap"} 
        h={direction=="column" ? h : undefined}
        w={direction=="row" ? w : undefined} ms={direction=="column" ? 2 : undefined}
        >
            {
                collection?.link_collections?.map((li_col, _i )=> {
                    return (
                        <>
                            <ClickButtonFlat
                            id={li_col.lid?.toString()} key={_i}
                            onClick={() => handleLink(li_col.links)}
                            p={1} m={direction=="column" ? "3px 0" : "0 3px"}
                            >
                                <Avatar src={li_col.links.image_path} name={li_col.links.link_name} size={"sm"}/>
                            </ClickButtonFlat>
                        </>
                    )
                })
            }
        </Box>
    )
}

export const GlassLinkDisplay =({collection, handleLink, direction, h, w}: {
    collection?: Collection, handleLink: (link: Link) => void,
    direction: "column" | "row", h?: string | number | (string | number)[], w?: string | number | (string | number)[],
}) => {
    return (
        <Box overflow={"scroll"} whiteSpace={direction=="column"? "normal" : "nowrap"} 
        h={direction=="column" ? h : undefined}
        w={direction=="row" ? w : undefined} 
        ms={direction=="column" ? 2 : undefined}
        mx={direction=="row" ? 2 : undefined}
        maxW={"65vw"}
        >
            {
                collection?.link_collections?.map((li_col, _i )=> {
                    return (
                        <GlassButton
                        id={li_col.lid?.toString()} key={_i}
                        onClick={() => handleLink(li_col.links)}
                        p={1} m={direction=="column" ? "3px 0" : "0 3px"}
                        >
                            <Avatar src={li_col.links.image_path} name={li_col.links.link_name} size={"sm"}/>
                        </GlassButton>
                    )
                })
            }
        </Box>
    )
}