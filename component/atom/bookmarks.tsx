import { Icon, Menu, MenuButton, MenuGroup, MenuItem, MenuList, useDisclosure } from "@chakra-ui/react"
import { motion, useAnimation } from "framer-motion"
import { useContext, useEffect, useState } from "react"
import { BookMarkButtonProps } from "../../type/atom"
import { MdBookmark, MdBookmarkBorder, MdKingBed } from "react-icons/md"
import { makeVar, useMutation } from "@apollo/client"
import { ADD_POSTS_TO_FOLDER, DELETE_POSTS_FROM_FOLDER } from "../../util/graphql/mutation/folders.mutation.scheme"
import { Folder, FolderPost } from "../../type/global"
import { AddIcon, CheckIcon } from "@chakra-ui/icons"
import { POSTS_FOLDER_POSTS_FRAG } from "../../util/graphql/fragment/fragment.scheme"
import { GET_FOLDER_POSTS } from "../../util/graphql/queries/folders.query.scheme"
import { useCustomToast } from "../../util/hook/useCustomToast"
import { AuthContext, LoginToggleContext } from "../../util/hook/authContext"
import { FolderCreateCard } from "./folders"

export const isBoopkMarkToggledWithCacheExistVar = makeVar(null as { isMarked: boolean, uuid_pid: string, fid: number } | null)

export const BookMarkButton = ({
    folder_posts, folders, post,
    size=5, borderRadius="full", mt="2",
    uuid_pid,
    ...props
}: BookMarkButtonProps) => {
    const { userState } = useContext(AuthContext);
    const { onOpen_login } = useContext(LoginToggleContext);
    
    const { isOpen, onToggle, onClose } = useDisclosure()
    const { isOpen: isOpen_createfolder, onOpen: onOpen_createfolder, onClose: onClose_createfolder } = useDisclosure()
    //animation setting
    const controls = useAnimation()
    const {toastSuccess, toastError} = useCustomToast()

    const [isMarked, setIsMarked] = useState<boolean>(!!(folder_posts && folder_posts.length>0))

    const [addBookmark, { error: e_add, data: d_add, loading: l_add }] = useMutation(ADD_POSTS_TO_FOLDER, {
        update( cache, { data: { add_posts_to_folder } } ) {
            //update get_folder_posts query res
            cache.updateQuery({
                    query: GET_FOLDER_POSTS,
                    variables: {
                        fid: add_posts_to_folder[0].fid,
                        offset: 0
                    }
                },
                (data) => {
                    if (data!=null) {
                        //update query res with post's folder_posts array implaying relations
                        isBoopkMarkToggledWithCacheExistVar({isMarked: true, uuid_pid: uuid_pid, fid: add_posts_to_folder[0].fid})
                        const new_folderPosts_with_posts = {...add_posts_to_folder[0], posts: {
                            ...post,
                            folder_posts: post?.folder_posts ? [...post?.folder_posts, ...add_posts_to_folder] : add_posts_to_folder
                        }}
                        const new_folder_posts_array = [new_folderPosts_with_posts]
                        
                        return ({
                            get_folder_posts: new_folder_posts_array,
                            count_folder_posts: data.count_folder_posts + 1
                        })
                    } else {
                        // the case query is not fetched yet, just modify post's folder_posts array
                        cache.updateFragment({
                                id: `Post:{"uuid_pid":"${uuid_pid}"}`,
                                fragment: POSTS_FOLDER_POSTS_FRAG
                            },
                            (data_post) => ({ folder_posts: [...data_post.folder_posts, ...add_posts_to_folder]})
                        )
                    }
                }
            )
        }
    })
    const [deleteBookmark, { error: e_del, data: d_del, loading: l_del }] = useMutation(DELETE_POSTS_FROM_FOLDER, {
        update( cache, { data: { delete_posts_from_folder } } ) {
            cache.updateFragment({
                    id: `Post:{"uuid_pid":"${uuid_pid}"}`,
                    fragment: POSTS_FOLDER_POSTS_FRAG
                },
                (data) => {
                    const newArray = data.folder_posts.filter((fo_po: FolderPost) => {
                        return delete_posts_from_folder.every((fo_po_del:FolderPost) =>  fo_po.fid !== fo_po_del.fid )
                    })
                    return ({ folder_posts: [...newArray]})
                }
            )

            cache.updateQuery({
                    query: GET_FOLDER_POSTS,
                    variables: {
                        fid: delete_posts_from_folder[0].fid,
                        offset: 0
                    }
                },
                (data) => {
                    if (data!=null) {
                        isBoopkMarkToggledWithCacheExistVar({isMarked: false, uuid_pid: uuid_pid, fid: delete_posts_from_folder[0].fid})
                        return ({
                            get_folder_posts: delete_posts_from_folder,
                            count_folder_posts: data.count_folder_posts - 1
                        })
                    }
            }
        )
        }
    })

    const handleBookMark = async (fid: number, isBookMarked: boolean) => {
        if (isBookMarked) {
            await deleteBookmark({
                variables: {
                    fid,
                    uuid_pids: [uuid_pid]
                }
            }).then(res => toastSuccess("削除が完了しました"))
            .catch(error => toastError("削除に失敗しました。", error.message))
        } else {
            await addBookmark({variables: {
                fid,
                uuid_pids: [uuid_pid]
            }}).then(res => toastSuccess("保存が完了しました。"))
            .catch(error => toastError("保存に失敗しました。", error.message))
        }
        controls.start({ scale: [1.15, 1.2, 1] })
    }

    //when the posts mark state change by refetch, change default folder_posts
    useEffect(()=>setIsMarked(!!(folder_posts && folder_posts.length>0)),[folder_posts])
    return (
        <>
            <Menu
            isOpen={isOpen}
            onClose={onClose}
            >
                <MenuButton onClick={() => {
                    if (userState=='isUser') {
                        onToggle()
                        controls.start({ scale: [0.95, 0.85, 1] })
                    } else if (userState=='guest') {
                        onOpen_login()
                    }
                    }}>
                    <motion.div
                    whileTap={{ scale: 1.1 }} // クリック時のアニメーションを定義
                    whileHover={{ scale: 0.95 }}
                    drag
                    dragConstraints={{
                        top: -400,
                        left: -200,
                        right: 0,
                        bottom: 0
                    }}
                    animate={controls}
                    transition={{ duration: 0.3 }}
                    >
                        <Icon
                        as={ isMarked ? MdBookmark : MdBookmarkBorder }
                        color={ isMarked ? "tipsy_color_3" : "text_light"}
                        borderRadius={borderRadius}
                        h={size} w={size}
                        mt={mt}
                        {...props}
                        />
                    </motion.div>
                </MenuButton>

                <MenuList
                pos={"relative"}
                borderRadius={15}
                backdropFilter={"blur(17px)"}
                backgroundColor={"bg_menu_mock"}
                fontSize="0.8rem"
                >
                    <MenuGroup title='Folderを選択' fontSize={".8rem"}>
                        {
                            folders?.map((folder: Folder) => {
                                const isBookMarked = !!(folder_posts?.some((fo_po: FolderPost) => fo_po.fid===folder.fid ))
                                return (
                                    <MenuItem
                                    key={folder.fid} id={folder.fid.toString()} 
                                    backgroundColor={"transparent"} ps={3}
                                    _hover={{backgroundColor: "rgba(130,130,130, 0.25)", color: "white"}}
                                    icon={ isBookMarked ? <CheckIcon /> : undefined}
                                    onClick={() => handleBookMark(folder.fid, isBookMarked)}
                                    >
                                        {folder.title}
                                    </MenuItem>
                                )
                            })
                        }
                        <FolderCreateCard onOpen={onOpen_createfolder} isOpen={isOpen_createfolder} onClose={onClose_createfolder}>
                            <MenuItem
                            key={"create_folder"} id={"create_folder"} 
                            backgroundColor={"transparent"} ps={3}
                            color={"tipsy_color_2"}
                            _hover={{backgroundColor: "rgba(130,130,130, 0.25)", color: "white"}}
                            icon={<AddIcon ms={3}/>}
                            onClick={onOpen_createfolder}
                            >
                                Folderを新規作成
                            </MenuItem>
                        </FolderCreateCard>
                    </MenuGroup>
                </MenuList>
            </Menu>
        </>
    )
}