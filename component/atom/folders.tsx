import React, { useState } from "react"
// import Image from 'next/image';
import NextLink from 'next/link'
import { useNeumorphismColorMode } from "../../util/hook/useColor"
import { Avatar, Center,  Heading, Icon, Flex, Image, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Menu, MenuButton, MenuList, MenuItem, Text, useBreakpointValue } from "@chakra-ui/react"
import { FolderCardProps } from "../../type/atom";
import { AddIcon, CloseIcon, EditIcon, HamburgerIcon } from "@chakra-ui/icons";
import { GlassFloatFormInput } from "./inputs";
import { useForm } from "react-hook-form";
import { Validation_folder_name } from "../../util/form/validation";
import { ImageSetPopover } from "../helper/ImageSetPopover";
import { EditingFolder, Folder } from "../../type/global";
import { FiImage } from "react-icons/fi"
import { GlassButton, GlassIconButton } from "./buttons";
import { useFolder } from "../../util/hook/useFolder";
import { useCustomToast } from "../../util/hook/useCustomToast";
import { GlassAlert } from "./alerts";
import { DELETE_FOLDER } from "../../util/graphql/mutation/folders.mutation.scheme";
import { useMutation } from "@apollo/client";
import { TruncatedHeading } from "./texts";

export const FolderCreateCard = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { highlight, shadow } = useNeumorphismColorMode()
    return (
        <>
            <Flex
            width={"100%"} height={50}
            p={3} 
            align={"center"}
            borderRadius={15}
            transition={".3s"}
            boxShadow={`inset 2px 2px 5px -2px ${shadow}, inset -2px -2px 5px -2px ${highlight};`}
            _hover={{
                boxShadow: `inset 0px 0px 2px ${shadow}, inset -0px -0px 2px ${highlight};`, 
            }}
            onClick={onOpen}
            >
                <AddIcon color={"tipsy_color_2"} ms={3}/>
                <Text ms={3} fontSize={".9rem"} color={"tipsy_color_2"}>Folderを新規作成</Text>
            </Flex>
            <FolderEditModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </>
    )
}





export const FolderCard = ({
    fid, title, top_image,
    ...props
}: FolderCardProps) => {
    const { isOpen: isOpen_delete, onOpen: onOpen_delete, onClose: onClose_delete } = useDisclosure()
    const { isOpen: isOpen_editModal, onOpen: onOpen_editModal, onClose: onClose_editModal } = useDisclosure()
    
    const [deleteFolder] = useMutation(DELETE_FOLDER, { 
        variables: { fid: fid },
        update( cache, { data: { delete_folder } } ) {
            const isDeleted = cache.evict({ id: cache.identify(delete_folder) })
            //userのfolder一覧のキャッシュは削除されないが、表示と機能的に問題がないためクエリの変更は見送る
        }
    })
    
    const handleDeleteFolder = async () => {
        await deleteFolder()
        onClose_delete()
    }
    
    const breakpointValue = useBreakpointValue([20, 40, 60, 70]);
    const { highlight, shadow } = useNeumorphismColorMode()
    return (
        <Flex
        width={"100%"}
        p={3} 
        align={"center"}
        borderRadius={20}
        transition={".3s"}
        boxShadow={`inset 6px 6px 13px -5px ${shadow}, inset -6px -6px 15px -5px ${highlight};`}
        _hover={{
            boxShadow: `inset 0px 0px 2px ${shadow}, inset -0px -0px 2px ${highlight};`, 
        }}
        {...props}
        >
            <NextLink href={"/user/folders/" + fid}>
                {
                    top_image 
                    ? <Image src={ top_image } width={50} height={50} borderRadius={10}/>
                    : <Center width={50} height={50} ><Image src={"/tipsy_logo.ico"} width={30} height={30} borderRadius={10}/></Center>
                }
            </NextLink>

            <NextLink href={"/user/folders/" + fid}>
                <TruncatedHeading
                maxLength={breakpointValue} w={"100%"} color={"text_important"} 
                ms={5} flexGrow={1} size={["sm", "sm", "md"]}
                >
                    { title }
                </TruncatedHeading>
            </NextLink>

            <Menu>
                <IconButton
                as={MenuButton}
                icon={<HamburgerIcon/>} aria-label="edit-button"
                transition={".3s"} color="text_normal"
                h={["30px", "35px", "45px"]} w={["30px", "40px", "45px"]} borderRadius={"full"} 
                boxShadow={`5px 5px 15px ${shadow}, -5px -5px 15px  ${highlight}, inset -5px -5px 15px -3px ${shadow}, inset 5px 5px 15px -3px  ${highlight};`}
                _hover={{
                    boxShadow: `2px 2px 10px ${shadow}, -2px -2px 10px  ${highlight}, inset -2px -2px 10px -3px ${shadow}, inset 2px 2px 10px -3px  ${highlight};`,
                    fontSize: ".95rem",
                }}
                />
                <MenuList
                pos={"relative"}
                borderRadius={[10, 12, 15]}
                backdropFilter={"blur(17px)"}
                backgroundColor={"bg_popover_switch"}
                fontSize="0.8rem"
                >
                    <MenuItem
                    backgroundColor={"transparent"}
                    _hover={{backgroundColor: "rgba(130,130,130, 0.25)", color: "white"}}
                    onClick={onOpen_editModal}
                    >
                        Folderを編集
                    </MenuItem>
                    <FolderEditModal 
                    folder={{fid, title, top_image}}
                    isOpen={isOpen_editModal} onOpen={onOpen_editModal} onClose={onClose_editModal} 
                    />

                    <MenuItem
                    icon={<CloseIcon />}
                    backgroundColor={"transparent"} color={"red_switch"}
                    _hover={{backgroundColor: "red_switch", color: "white"}}
                    onClick={onOpen_delete}
                    >
                        削除
                    </MenuItem>
                    <GlassAlert
                    isOpen={isOpen_delete} onOpen={onOpen_delete} onClose={onClose_delete} 
                    alertTitle={"履歴を削除する"} alertMessage={"復元はできません。本当に削除しますか？"}
                    cancelMessage={"やめる"} handleExecute={handleDeleteFolder}
                    />
                </MenuList>
            </Menu>
        </Flex>
    )
}




export const FolderEditModal = ({isOpen, onOpen, onClose, folder}: {isOpen: boolean, onOpen: ()=>void, onClose: ()=>void, folder?: Folder }) => {
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}  size={"sm"}>
                <ModalOverlay 
                backdropFilter={"blur(2px)"} 
                bg="bg_transparent_reverse"
                />
                <ModalContent
                backdropFilter={"blur(10px)"}
                bg="bg_transparent"
                borderRadius={20}
                p={1}
                >
                    <ModalHeader borderTopRadius={20} fontSize="1rem">
                        Folderを編集
                    </ModalHeader>

                    <ModalCloseButton />

                    <ModalBody my={5}>
                        <CreateFolderForm defFolderData={folder} onClose={onClose}/>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}




const CreateFolderForm = ({defFolderData, onClose}: {defFolderData?: Folder, onClose: ()=>void}) => {
    const  { register, formState: { errors }, formState } = useForm({mode: "all"});
    const {upsertFolder} = useFolder()
    const {toastSuccess, toastError} = useCustomToast()

    const [currentFolder, setCurrentFolder] = useState<EditingFolder>({
        fid: defFolderData?.fid,
        title: defFolderData?.title,
        top_image: defFolderData?.top_image,
        image_file: undefined,
        new_image_url: undefined
    })
    
    const [preViewImage, setPreViewImage] = useState<string | undefined>(defFolderData?.top_image)
    const [isSaveButtonLoading, setIsSaveButtonLoading] = useState<boolean>(false)

    const handleTitle = (e:any) => setCurrentFolder({...currentFolder, title: e.target.value})
    const handlePrevewImage = (photo: string | undefined) => setPreViewImage(photo)
    const handleImageFile = (file: any) => {
        setCurrentFolder({...currentFolder, image_file: file, new_image_url: undefined})
    }
    const handleNoImageFile = (e:any) => {
        setCurrentFolder({...currentFolder, image_file: undefined})
        setPreViewImage(currentFolder?.top_image)
    }
    const handleNewImagepath = (e:any) => {
        if (e.target.value!="") {
            setPreViewImage(e.target.value)
            setCurrentFolder({...currentFolder, new_image_url: e.target.value, image_file: undefined})
        } else {
            setPreViewImage(currentFolder?.top_image)
            setCurrentFolder({...currentFolder, new_image_url: undefined})
        }
    }

    const handleSubmit = ( ) => {
        setIsSaveButtonLoading(true)
        upsertFolder(currentFolder)
        .then(res => toastSuccess(`${res.title}の保存が成功しました`))
        .catch(error => toastError("保存が失敗しました", "インターネット状態や変更内容をもう一度見直してください"))
        .finally(()=> {
            setIsSaveButtonLoading(false)
            onClose()
        })
    }

    return (
        <Flex direction={"column"} align={"center"} gap={3}>
            <ImageSetPopover
            id="top_image_upload" title="画像を変更" register={register} 
            setImage={handlePrevewImage} setImageFile={handleImageFile} setNoImageFile={handleNoImageFile}
            setNewImagePath={handleNewImagepath}
            beforeImage={defFolderData?.top_image}
            isBgMocked
            >
                <Flex flexDir="column" cursor={"pointer"}>
                    {
                        preViewImage 
                        ? (
                            <Avatar 
                            src={preViewImage} name={currentFolder?.title}
                            size={"xl"} m={1} borderRadius={20}
                            >
                                <Flex 
                                position={"absolute"} justify={"center"} align={"center"}
                                w={"100%"} h={"100%"} borderRadius={20} color={"whiteAlpha.50"} transition={".1s"}
                                _hover={{
                                    filter: "auto", backdropFilter: 'auto', backdropBlur: "2px", backdropContrast: '50%', color: "whiteAlpha.800"
                                }}
                                >
                                    <Icon as={EditIcon} w={8} h={8}/>
                                </Flex>
                            </Avatar>
                        )
                        : (
                            <GlassIconButton 
                            icon={<FiImage fontSize={"5rem"}/>} aria-label="def-image-set-icon"
                            borderRadius={20}
                            height={100} width={100} 
                            />
                        )
                    }
                    <Center fontSize={".9rem"}>画像を変更</Center>
                </Flex>
            </ImageSetPopover>

            <GlassFloatFormInput 
            id={"folder_title"}
            register={register}
            errors={errors}
            validation={Validation_folder_name}
            labelName={"タイトル"} borderRadius={15}
            defaultValue={currentFolder.title}
            onInput={handleTitle}
            zIndex={0}
            />

            <GlassButton
            isLoading={isSaveButtonLoading}
            // disabled={ isSaveButtonLoading || !(!formState.errors.input_article_title && currentPost.title && currentPost.title.length!=0 && !formState.errors.input_top_link)}
            isDisabled={ (isSaveButtonLoading || !!errors.folder_title || !currentFolder.title || currentFolder.title.length==0)}
            onClick={handleSubmit}
            _hover={{
            bgGradient: "linear(to-bl, tipsy_color_1, tipsy_color_2)",
            color: "bg_switch",
            border: "none"
            }}
            fontSize=".9rem"
            variant="outline"
            color={"tipsy_color_2"}
            >
                保存
            </GlassButton>
        </Flex>
    )
}