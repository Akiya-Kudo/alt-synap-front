import { useMutation } from "@apollo/client";
import { CloseIcon } from "@chakra-ui/icons";
import { Icon, Menu, MenuButton, MenuGroup, MenuItem, MenuList, useDisclosure } from "@chakra-ui/react"
import React from "react"
import { BiDotsVerticalRounded } from "react-icons/bi";
import { DELETE_POST } from "../../util/graphql/mutation/posts.mutation.scheme";
import { useCustomToast } from "../../util/hook/useCustomToast";
import { GlassAlert } from "../atom/alerts";

export const EditPostMenu = ({uuid_pid}: {uuid_pid: string}) => {
    const {toastSuccess, toastError} = useCustomToast()
    const { isOpen: isOpen_delete, onOpen: onOpen_delete, onClose: onClose_delete } = useDisclosure()

    const [deletePost] = useMutation(DELETE_POST, { 
        variables: { uuid_pid: uuid_pid },
        update( cache, { data: { delete_post } } ) {
            const isDeleted = cache.evict({ id: cache.identify(delete_post) })
            //userのfolder一覧のキャッシュは削除されないが、表示と機能的に問題がないためクエリの変更は見送る
        }
    })

    const handleDeletePost = async () => {
        await deletePost()
        .then(res => toastSuccess("削除が完了しました"))
        .catch(error => {
            console.log(error);
            toastError("に失敗しました。", error.message)
        })
        onClose_delete()
    }
    return (
        <Menu>
            <MenuButton>
                <Icon as={BiDotsVerticalRounded} width={5} height={5} mt={1}/>
            </MenuButton>

            <MenuList
            pos={"relative"}
            borderRadius={15}
            backdropFilter={"blur(17px)"}
            backgroundColor={"bg_menu_mock"}
            fontSize="0.8rem"
            >
                <MenuItem
                backgroundColor={"transparent"}
                _hover={{backgroundColor: "rgba(130,130,130, 0.25)", color: "white"}}
                >
                    Folderを編集
                </MenuItem>

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
                cancelMessage={"やめる"} handleExecute={handleDeletePost}
                />
            </MenuList>
        </Menu>
    )
}