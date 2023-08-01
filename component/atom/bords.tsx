import { Box, forwardRef } from "@chakra-ui/react"
import { GlassBordProps, NeumBordProps } from "../../type/atom";
import { useGlassColorMode, useNeumorphismColorMode } from "../../util/hook/useColor";

export const FlatBord = ({
    neumH="shallow",
    bg="transparent", color="text_normal", borderRadius="20",
    display="flex", flexDirection="row", justifyContent="center", alignItems="center", children,
    ...props
}: NeumBordProps) => {
    const { highlight, shadow } = useNeumorphismColorMode()
    const neumHeight = neumH=="shallow" ? `5px 5px 15px ${shadow}, -5px -5px 15px ${highlight};` : `15px 15px 30px ${shadow}, -15px -15px 30px ${highlight};`
    return (
        <Box
        {...props}
        boxShadow={neumHeight}
        borderRadius={borderRadius} bg={bg} color={color}
        display={display} flexDirection={flexDirection} justifyContent={justifyContent} alignItems={alignItems}
        >{children}</Box>
    )
}

export const FullfyBord = ({
    neumH="shallow",
    bg="transparent", color="text_normal",borderRadius="50",
    display="flex", flexDirection="row", justifyContent="center", alignItems="center",
    ...props
}: NeumBordProps) => {
    const { highlight, shadow } = useNeumorphismColorMode()
    const neumHeight = neumH=="shallow" ? `5px 5px 15px ${shadow}, -5px -5px 15px  ${highlight}, inset -5px -5px 15px -3px ${shadow}, inset 5px 5px 15px -3px  ${highlight};` : `15px 15px 30px ${shadow}, -15px -15px 30px  ${highlight}, inset -15px -15px 30px -10px ${shadow}, inset 15px 15px 30px -10px  ${highlight};`
    return (
        <Box
        {...props}
        boxShadow={neumHeight}
        borderRadius={borderRadius} bg={bg} color={color}
        display={display} flexDirection={flexDirection} justifyContent={justifyContent} alignItems={alignItems}
        />
    )
}

//ref参照のためforwardRefで定義する
export const DentBord = forwardRef<NeumBordProps, "div">(
    function DentBord ({
    neumH="shallow",
    bg="transparent",color="text_normal", borderRadius="50",
    display="flex", flexDirection="row", justifyContent="center", alignItems="center",
    ...props
}, ref) {
    const { highlight, shadow } = useNeumorphismColorMode()
    const neumHeight = neumH=="shallow" ? `inset -5px -5px 15px -3px ${highlight}, inset 5px 5px 15px -3px  ${shadow};` : `inset -15px -15px 30px -10px ${highlight}, inset 15px 15px 30px -10px  ${shadow};`
    return (
        <Box
        {...props}
        boxShadow={neumHeight}
        borderRadius={borderRadius} bg={bg} color={color}
        display={display} flexDirection={flexDirection} justifyContent={justifyContent} alignItems={alignItems}
        ref={ref}
        />
    )
})

// shadow　&　highlight　の半透明バージョン  コンポーネントが重なる場合のshadow/highlightの打ち消し対処
export const TabBord = ({
    neumH="shallow",
    bg="transparent", color="text_normal", borderRadius="20",
    display="flex", flexDirection="row", justifyContent="center", alignItems="center", 
    ...props
}: NeumBordProps) => {
    const { highlight_transparent, shadow_transparent } = useNeumorphismColorMode()
    const neumHeight = neumH=="shallow" ? `5px 5px 15px ${shadow_transparent}, -5px -5px 15px ${highlight_transparent};` : `15px 15px 30px ${shadow_transparent}, -15px -15px 30px ${highlight_transparent};`
    return (
        <Box
        {...props}
        boxShadow={neumHeight}
        borderRadius={borderRadius} bg={bg} color={color}
        display={display} flexDirection={flexDirection} justifyContent={justifyContent} alignItems={alignItems}
        />
    )
}