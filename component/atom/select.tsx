import { Select } from "@chakra-ui/react";
import { NeumSelectProps } from "../../type/atom";
import { useNeumorphismColorMode } from "../../util/hook/useColor";

export const BasicSelect = ({
    children, w=200, size="xs", borderRadius="full", border="none",
    ...props
}: NeumSelectProps) => {
    const { highlight_transparent, shadow_transparent } = useNeumorphismColorMode()
    const neum = `3px 3px 10px ${shadow_transparent}, -3px -3px 10px ${highlight_transparent};`
    return (
        <Select
        w={w} size={size} borderRadius={borderRadius} border={border}
        boxShadow={neum}
        _focus={{boxShadow: neum}}
        {...props}
        >
            {children}
        </Select>
    )
}