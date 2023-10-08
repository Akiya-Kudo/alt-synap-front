import { Box, Button, Divider, Flex, Input, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { useLogInFunc } from "../../util/hook/useAuth"
import { GlassButton, GlassButton_submit, GlassSwitchButton } from "../atom/buttons"
import { BasicLink } from "../atom/links"
import { GlassFloatFormInput, GlassFormInput } from "../atom/inputs"
import { Validation_post_title, Validation_url_required } from "../../util/form/validation"
import React, { useState } from "react"
import { usePost } from "../../util/hook/usePost"
import { LinkPostData, Post } from "../../type/global"
import { useCustomToast } from "../../util/hook/useCustomToast"

// ログインフォームコンポーネント定義
export const LinkPostForm = ({onClose, onExecute, defaultPostValue = DefauldPostCreateData}: {
    onClose: () => void, 
    onExecute: (linkPostEditData: LinkPostData) => any,
    defaultPostValue?: LinkPostData, 
}) => {
    const { register, formState: { errors }, formState } = useForm({mode: "all"});
    const {toastSuccess, toastError} = useCustomToast()

    const [currentPost, setCurrentPost] = useState<LinkPostData>(defaultPostValue)
    const [isSaveButtonLoading, setIsSaveButtonLoading] = useState<boolean>(false) 

    const handlePublish = (e: boolean) => setCurrentPost({...currentPost, publish: e})
    const handleTitle = (e: any) => setCurrentPost({...currentPost, title: e.target.value})
    const handleTopLink = (e: any) => setCurrentPost({...currentPost, top_link: e.target.value})
    const SubmitChange = async (e: any) => {
        e.preventDefault()

        setIsSaveButtonLoading(true)
        await onExecute(currentPost).then((res: any) => {
            toastSuccess("保存が完了しました")
            onClose()
        }).catch((error: Error) => toastError("保存に失敗しました。", error.message))
        .finally(() =>setIsSaveButtonLoading(false))
    }
    
    return (
        <Flex
            as="form" 
            direction="column" 
            w="100%" 
            onSubmit={ SubmitChange }
        >
            <ModalBody pb={6}>
                <GlassFloatFormInput
                id="title" errors={errors} register={register} validation={Validation_post_title}
                labelName={"タイトル"}
                isRequired borderRadius={15}
                my={3}
                onInput={handleTitle}
                defaultValue={currentPost.title}
                />
                <GlassFormInput
                id="top_link" errors={errors} register={register} validation={Validation_url_required}
                labelName={"URL"} placeholder={"http://"} 
                isRequired
                borderRadius={15} 
                my={3}
                onInput={handleTopLink}
                defaultValue={currentPost.top_link}
                />
                <Flex direction='row'  mb={5} my={5} gap={5} align='center' justify='center'>
                    <GlassSwitchButton
                    getState={handlePublish} defStateValue={currentPost.publish}
                    variant={"outline"} fontSize={".9rem"} 
                    SBgGradient={"linear(to-tl, tipsy_color_2, tipsy_color_3)"} SHBgGradient={"linear(to-tl, tipsy_color_active_2, tipsy_color_active_3)"}
                    Scolor={"bg_switch"} Acolor={"tipsy_color_active_3"} Hcolor={"tipsy_color_3"}
                    Schildren={"公開中"}
                    >
                    公開する
                    </GlassSwitchButton>
                    <GlassButton
                    isDisabled={ currentPost.title=="" || currentPost.top_link=="" || !(!errors.title) || !(!errors.top_link)}
                    isLoading={isSaveButtonLoading}
                    bg={"text_light"} type="submit"
                    px={10} fontSize={"0.9rem"} w={[100, 150]}
                    bgGradient={"linear(to-l, tipsy_color_2, tipsy_color_3)"} color="bg_switch"
                    _hover={{bgGradient: "linear(to-l, tipsy_color_active_2, tipsy_color_active_3)"}}
                    >
                        保存
                    </GlassButton>
                </Flex>
            </ModalBody>
        </Flex>
    )
}

export const LinkPostModal = ({
    isOpen, onOpen, onClose,
    children, 
    onExecute, defaultPostValue,
}: {
    isOpen: boolean, onOpen: ()=>void, onClose: () => void, 
    children?: any, 
    onExecute: (linkPostEditData: LinkPostData)=>any,
    defaultPostValue?: LinkPostData,
}) => {
    return (
        <>
            <Box onClick={onOpen}>
                { children }
            </Box>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size={["xl", "lg","md"]}
            >
                <ModalOverlay 
                backdropFilter={"blur(2px)"} 
                bg="bg_transparent_reverse"
                />
                <ModalContent
                borderRadius={[10, 15, 20]}
                backdropFilter={"blur(15px)"}
                bg="bg_transparent"
                p={1}
                >
                    <ModalHeader 
                    borderTopRadius={20}
                    >
                        <Flex fontSize="1rem">
                            <Box>Linkを保存する</Box>
                        </Flex>
                        <ModalCloseButton color={"text_light"}/>
                    </ModalHeader>

                    <LinkPostForm onClose={onClose} onExecute={onExecute} defaultPostValue={defaultPostValue}/>

                </ModalContent>
            </Modal>
        </>
    )
}

const DefauldPostCreateData = {
    uuid_pid: undefined,
    title: "",
    top_link: "",
    content_type: 2,
    publish: false
} as LinkPostData