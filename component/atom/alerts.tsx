import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from "@chakra-ui/react"
import React, { useRef } from "react"
import { GlassAlertProps } from "../../type/atom";
import { GlassButton } from "./buttons";

export const GlassAlert = (
    {isOpen, onOpen, onClose,
    alertTitle, alertMessage, cancelMessage="Close", exeMessage="削除", handleExecute=()=>{},
    size=["xl", "md", "sm"],
    exeButtonBg="red_switch"}
    : GlassAlertProps) => {
    const cancelRef = useRef<HTMLButtonElement | null>(null);
    
    return (
        <>
        <AlertDialog
        isOpen={isOpen} onClose={onClose}
        leastDestructiveRef={cancelRef} 
        size={size}
        >
            <AlertDialogOverlay backdropFilter={"blur(10px)"}  bg="bg_transparent_reverse">
                <AlertDialogContent 
                backdropFilter={"blur(107px)"} bg="bg_transparent" borderRadius={20}
                p={1}
                >
                    <AlertDialogHeader fontWeight='bold' borderTopRadius={20} fontSize={["xl", "lg", "md"]} >
                        {alertTitle}
                    </AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody fontSize={["xl", "md", "sm"]}>
                        {alertMessage}
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <GlassButton
                        onClick={handleExecute}
                        size={"md"} ml={3} fontSize={"1rem"}
                        bg={ exeButtonBg }
                        color={"bg_switch"} 
                        _hover={{color: exeButtonBg, bg: "whiteAlpha.100"}}
                        >
                            { exeMessage }
                        </GlassButton>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>

        </>
    )
}