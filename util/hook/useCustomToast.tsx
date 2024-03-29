import { Box, Toast, useToast } from "@chakra-ui/react"

export const useCustomToast = () => {
    const toast = useToast()

    
    const toastSuccess = (title: string, description?: string) => {
        toast({
            position: "bottom-right",
            isClosable: true,
            title: title,
            description: description,
            status: "success",
            duration: 5000,
            variant: "subtle",
        });
    }

    const toastInfo = (title: string, description?: string) => {
        toast({
            position: "bottom-right",
            isClosable: true,
            title: title,
            description: description,
            status: "info",
            duration: 5000,
            variant: "subtle",
        });
    }
    
    const toastError = (title: string, description: string) => {
        toast({
            position: "bottom-right",
            isClosable: true,
            title: "ERROR : " + title,
            description: description,
            status: "error",
            duration: 5000,
            variant: "subtle",
        });
    }

    const toastNetDisconnectedError = () => toast({
        position: "bottom-left",
        duration:null,
        render: () => (
            <Box fontSize={"0.8rem"}>
                <Toast title="ネットワークが接続されていません" status='error' variant={"subtle"} />
            </Box>
        ),
    })
    return {toastSuccess, toastError, toastInfo, toastNetDisconnectedError}
}