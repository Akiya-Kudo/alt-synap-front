import { Box, Toast, useToast } from "@chakra-ui/react"

export const useCustomToast = () => {
    const toast = useToast()

    const toastPostSuccess = () => toast({
        position: "bottom-right",
        render: () => (
            <Box fontSize={"0.8rem"}>
                <Toast title="投稿を正常に保存しました" status="success" variant={"subtle"} duration={5000} isClosable />
            </Box>
        ),
    })

    const toastPostError = () => toast({
        position: "bottom-right",
        render: () => (
            <Box fontSize={"0.8rem"}>
                <Toast title="ERROR : 保存に失敗しました" description={"ネットワーク環境や投稿の内容を確認してください"} status='error'
                variant={"subtle"} duration={5000} isClosable />
            </Box>
        ),
    })

    const toastNetDisconnectedError = () => toast({
        position: "bottom-left",
        duration:null,
        render: () => (
            <Box fontSize={"0.8rem"}>
                <Toast title="ネットワークが接続されていません" status='error' variant={"subtle"} />
            </Box>
        ),
    })
    return {toastPostSuccess, toastPostError, toastNetDisconnectedError}
}