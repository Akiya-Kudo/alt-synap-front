import { EditIcon } from "@chakra-ui/icons";
import { Avatar, Box, Center, Flex, Icon, Text, Textarea } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ClickButton } from "../../../component/atom/buttons";
import { NeumFloatFormInput, NeumFormInput, NeumFormTextArea, NeumTextAreaDefault } from "../../../component/atom/inputs";
import { ImageSetPopover } from "../../../component/helper/ImageSetPopover";
import { LinkHeader } from "../../../component/layout/Header";
import { EditingUser } from "../../../type/global";
import { auth } from "../../../util/firebase/init";
import { Validation_comment, Validation_username } from "../../../util/form/validation";
import { USER_QUERY } from "../../../util/graphql/queries/users.query.schema";
import { AuthContext } from "../../../util/hook/authContext";
import { useCustomToast } from "../../../util/hook/useCustomToast";
import { useUser } from "../../../util/hook/useUser";
import { client } from "../../_app";

const MyProfile: NextPage  = () => {
  const { userState } = useContext(AuthContext);
  const router = useRouter()
  useEffect(() => { if (userState == 'guest')  router.replace('/') }, [userState])
  // reload時のuserData取得 + isSaveButtonLoading　解除
  useEffect(()=>{
    if (userState=="isUser") {
    const data = client.readQuery({ query: USER_QUERY, variables: { uid: auth.currentUser?.uid }});
    setPreViewImage(data?.user.user_image)
    setCurrentUser({
      uuid_uid: data?.user.uuid_uid,
      user_name: data?.user.user_name,
      user_image: data?.user.user_image,
      comment: data?.user.comment,
    })
  }
  },[userState])

  const {updateUserInfo} = useUser()
  const  { register, formState: { errors }, formState, } = useForm({mode: "all"});
  const {toastSuccess, toastError} = useCustomToast()
  
  const [currentUser, setCurrentUser] = useState<EditingUser>({})
  const [preViewImage, setPreViewImage] = useState<string | undefined>(currentUser?.user_image)
  const [isSaveButtonLoading, setIsSaveButtonLoading] = useState<boolean>(false) 

  const handleUserName = (e:any) => setCurrentUser({...currentUser, user_name: e.target.value})
  const handleComment = (e:any) => setCurrentUser({...currentUser, comment: e.target.value})

  const handlePrevewImage = (photo: string | undefined) => setPreViewImage(photo)
  const handleImageFile = (file: any) => {
    setCurrentUser({...currentUser, image_file: file, new_image_url: undefined})
  }
  const handleNoImageFile = (e:any) => {
    setCurrentUser({...currentUser, image_file: undefined})
    setPreViewImage(currentUser?.user_image)
  }
  const handleNewImagepath = (e:any) => {
    if (e.target.value!="") {
      setPreViewImage(e.target.value)
      setCurrentUser({...currentUser, new_image_url: e.target.value, image_file: undefined})
    } else {
      setPreViewImage(currentUser?.user_image)
      setCurrentUser({...currentUser, new_image_url: undefined})
    }
  }

  const handleSubmit = async () => {
    setIsSaveButtonLoading(true)
    updateUserInfo(currentUser)
    .then(res => {
      setCurrentUser(res)
      toastSuccess("変更が保存されました")
  })
    .catch(error => toastError("変更が失敗しました", "インターネット状態や変更内容をもう一度見直してください"))
    .finally(()=> setIsSaveButtonLoading(false))
  }
  return (
    <>
    <Head><title>Tipsy | ユーザ情報編集</title></Head>
      <Box >
        <LinkHeader title={"プロフィールを編集する"}/>
        <Flex
        className="page" 
        justify={"center"}
        >
          <Flex
          direction={"column"}
          w="600px"
          >
            <Flex align={"end"} justify={"center"} mt={5} position={"relative"}>
              <ImageSetPopover
              id="user_image_upload" title="画像を変更" register={register} 
              setImage={handlePrevewImage} setImageFile={handleImageFile} setNoImageFile={handleNoImageFile}
              setNewImagePath={handleNewImagepath}
              beforeImage={currentUser?.user_image}
              >
                <Flex flexDir="column" cursor={"pointer"}>
                  <Avatar 
                  src={preViewImage} name={currentUser?.user_name} 
                  size={"xl"} m={1} 
                  >
                    <Flex 
                    position={"absolute"} justify={"center"} align={"center"}
                    w={"100%"} h={"100%"} borderRadius={"full"} color={"whiteAlpha.50"} transition={".1s"}
                    _hover={{
                      filter: "auto", backdropFilter: 'auto', backdropBlur: "2px", backdropContrast: '50%', color: "whiteAlpha.800"
                    }}
                    >
                      <Icon as={EditIcon} w={8} h={8}/>
                    </Flex>
                  </Avatar>
                  <Center fontSize={".9rem"}>画像を変更</Center>
                </Flex>
              </ImageSetPopover>
            </Flex>
            <NeumFormInput
            mt={2}
            id="user_name" register={register} errors={errors} validation={Validation_username}
            defaultValue={currentUser?.user_name} placeholder={"Name"} labelName={"名前"}
            onChange={handleUserName}
            />
            <NeumFormTextArea
            mt={5}
            id="comment" register={register} errors={errors} validation={Validation_comment}
            defaultValue={currentUser?.comment} placeholder={"Comment..."} labelName={"コメント"}
            fontSize={[18]} rows={6}
            onChange={handleComment}
            />
            <Center mt={5}>
              <ClickButton
              w={"200px"}
              color={"bg_switch"} Hcolor={"bg_switch"} 
              onClick={handleSubmit}
              isLoading={isSaveButtonLoading}
              bg={!(!errors.user_name) || !(!errors.comment) ? "transparent" : "tipsy_color_3"}
              isDisabled={!(!errors.user_name) || !(!errors.comment)}
              >保存</ClickButton>
            </Center>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

export default MyProfile