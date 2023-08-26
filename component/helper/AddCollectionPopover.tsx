import { useMutation } from "@apollo/client"
import { Flex, Popover, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { User } from "../../type/global"
import { auth } from "../../util/firebase/init"
import { Validation_collection_name } from "../../util/form/validation"
import { USER_FRAGMENT_COLLECTION_ONLY } from "../../util/graphql/fragment/fragment.scheme"
import { CREATE_COLLECTION } from "../../util/graphql/mutation/collections.mutation.scheme"
import { USER_QUERY } from "../../util/graphql/queries/users.query.schema"
import { useGlassColorMode } from "../../util/hook/useColor"
import { GlassButton_submit } from "../atom/buttons"
import { GlassFloatFormInput } from "../atom/inputs"

export const AddCollectionPopover = ({uuid_uid}: {uuid_uid: string}) => {
    const { onOpen, onClose, isOpen } = useDisclosure()
    const {glass_bg_switch } = useGlassColorMode()
    const { register, formState: { errors }, formState } = useForm({mode: "all"});

    const [createCollection] = useMutation(CREATE_COLLECTION, {
        update( cache, { data: { create_collection } } ) {
            //user のcolelction配列の更新
            const data: {user: User} | null = cache.readQuery({
                query: USER_QUERY,
                variables: {
                    uid: auth?.currentUser?.uid,
                },
            })
            if (data?.user?.collections) {
                const newCollections = [...data?.user?.collections, create_collection]
                cache.writeFragment({
                    id: `User:{"uuid_uid":"${uuid_uid}"}`,
                    fragment: USER_FRAGMENT_COLLECTION_ONLY,
                    data: { collections: newCollections } 
                })
            }
        }
    })

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (formState.isValid) {
            const target = e.target as any;
            const collection_name = target.collection_name?.value as string;
            createCollection({ variables: {
                collection_name: collection_name,
                uuid_uid: uuid_uid
            } })
            e.target.collection_name.value = ""
            onClose()
        }
    }
    return (
        <Popover
        placement='top-start'
        isOpen={isOpen} onOpen={onOpen} onClose={onClose}
        >
            <PopoverTrigger>
                <Flex
                w={"100%"} my={2} px={3} h={"50px"} align={"center"} borderRadius={10}
                fontSize={".8rem"}
                _hover={{ 
                    filter: 'brightness(1.2)',
                    bg: "whiteAlpha.500"
                }}
                >
                    ＋ 新しい COLLECTION を作成する
                </Flex>
            </PopoverTrigger>
            <PopoverContent
            backdropFilter={"blur(7px)"}
            backgroundColor={glass_bg_switch}
            borderRadius={"15px"}
            w={"500px"} maxWidth={"100vw"}
            as="form" 
            onSubmit={ handleSubmit }
            >
                <PopoverHeader>COLLECTION 作成</PopoverHeader>
                <PopoverBody 
                as={Flex} alignItems={"center"} justifyContent="center" 
                flexDirection={["column", "row"]} 
                gap={1}
                >
                    <GlassFloatFormInput
                    id="collection_name"
                    labelName="名前"
                    validation={Validation_collection_name}
                    errors={errors} register={ register }
                    fontSize={"0.7rem"} borderRadius={15} 
                    isRequired
                    />
                    {
                        formState.isValid && 
                        <GlassButton_submit
                        formState={formState}
                        bg={"text_light"} 
                        w={["100%", 100]} h="70px"
                        fontSize={"0.7rem"} borderRadius={15}
                        bgGradient={"linear(to-l, tipsy_color_2, tipsy_color_3)"} color="bg_switch"
                        _hover={{bgGradient: "linear(to-l, tipsy_color_active_2, tipsy_color_active_3)"}}
                        >
                            追加
                        </GlassButton_submit>
                    }

                </PopoverBody>
        </PopoverContent>
        </Popover>
    )
}