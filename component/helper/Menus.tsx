import { useMutation } from "@apollo/client";
import { CloseIcon, EditIcon } from "@chakra-ui/icons";
import { Icon, Menu, MenuButton, MenuGroup, MenuItem, MenuList, useDisclosure } from "@chakra-ui/react"
import { useRouter } from "next/router";
import React from "react"
import { BiDotsVerticalRounded } from "react-icons/bi";
import { LinkPostData, Post } from "../../type/global";
import { DELETE_POST } from "../../util/graphql/mutation/posts.mutation.scheme";
import { useCustomToast } from "../../util/hook/useCustomToast";
import { usePost } from "../../util/hook/usePost";
import { GlassAlert } from "../atom/alerts";
import { LinkPostModal } from "../standalone/LinkPostFormModal";

export const EditPostMenu = ({uuid_pid, content_type, post}: {
    uuid_pid: string,
    content_type: number,
    post?: Post,
}) => {
    const router = useRouter()
    const {toastSuccess, toastError} = useCustomToast()
    const { isOpen: isOpen_delete, onOpen: onOpen_delete, onClose: onClose_delete } = useDisclosure()
    const { isOpen: isOpen_editModal, onOpen: onOpen_editModal, onClose: onClose_editModal } = useDisclosure()
    // updateと inset時でupdate関数を切り替えるためここで定義
    const { updateLinkPost } = usePost();

    const handleEditOpen = () => {
        if (content_type==1) {
            router.push({
                pathname: '/user/post_edit',
                query: {pid: uuid_pid }
            })
        } else if (content_type==2) onOpen_editModal()
    }

    const [deletePost] = useMutation(DELETE_POST, { 
        variables: { uuid_pid: uuid_pid },
        update( cache, { data: { delete_post } } ) {
            const isDeleted = cache.evict({ id: cache.identify(delete_post) })
            //my_pageでのクエリ全てで投稿のキャッシュを削除するとreact-component上の配列からは消えるためクエリキャッシュの変更は見送る
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
                icon={<EditIcon/>}
                backgroundColor={"transparent"}
                _hover={{backgroundColor: "rgba(130,130,130, 0.25)", color: "white"}}
                onClick={handleEditOpen}
                >
                    編集
                </MenuItem>
                {
                    content_type == 2 &&
                    <LinkPostModal
                    isOpen={isOpen_editModal}
                    onOpen={onOpen_editModal}
                    onClose={onClose_editModal}
                    onExecute={updateLinkPost}
                    defaultPostValue={
                        (post && post.top_link) ? {
                            uuid_pid: uuid_pid,
                            title: post.title,
                            top_link: post.top_link,
                            publish: post.publish,
                            content_type: 2,
                        } : undefined
                    }
                    />
                }

                <MenuItem
                icon={<CloseIcon/>}
                backgroundColor={"transparent"} color={"red_switch"}
                _hover={{backgroundColor: "red_switch", color: "white"}}
                onClick={onOpen_delete}
                >
                    削除
                </MenuItem>
                <GlassAlert
                isOpen={isOpen_delete} onOpen={onOpen_delete} onClose={onClose_delete} 
                alertTitle={"投稿を削除する"} alertMessage={"復元はできません。本当に削除しますか？"}
                cancelMessage={"やめる"} handleExecute={handleDeletePost}
                />
            </MenuList>
        </Menu>
    )
}