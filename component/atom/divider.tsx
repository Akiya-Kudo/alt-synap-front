import { Divider } from "@chakra-ui/react"
import React from "react"
import { useNeumorphismColorMode } from "../../util/hook/useColor"

export const NeumDivider = () => {
    const { highlight, shadow } = useNeumorphismColorMode()
    return (
        <Divider mb={10} boxShadow={`0px 6px 8px ${shadow};`} h={50} bg={"bg_switch"} border={"none"}/>
    )
}