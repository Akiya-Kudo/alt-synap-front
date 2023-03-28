import { Box, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { setUserInfoContext, UserInfoContext } from "../util/hook/authContext";
import { auth, storage } from "../util/firebase/init";
import { useUserInfoUpdater } from "../util/hook/useMutation";
import { CommentInput, SubmitOnlyWhenChangedButton, ThumbnailInput, UserNameInput } from "./Forms/userForms";


export const MyInfoModal = (props: any) => {
  
  
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  // form処理
  const { userInfo } = useContext(UserInfoContext);
  const { setUserInfo } = useContext(setUserInfoContext);

  const [image, setImage] = useState(props.photo_path)
  const [imageFile, setImageFile] = useState(null)
  const [imageChanged, setImageChanged] = useState(false)

  useEffect(() => setImage(userInfo?.photo_url), [userInfo]);
  
  const { userInfoUpdater } = useUserInfoUpdater();
  
  const { register, formState: { errors, isDirty, dirtyFields }, formState, reset } = useForm({mode: "all"});

  // Form送信イベントでの処理
  const SubmitChange = (e: any) => {
    e.preventDefault()
    const target = e.target as any;
    const username = target.inputText5.value as string;
    const comment = target.inputText6.value as string;
    
    let thumbnail_url = userInfo?.photo_url;
    
    // 画像Storage 保存処理 + dbへのInsert処理 + state変更処理
    const storageRef = ref(storage, "thumbnail/" + userInfo?.firebase_id);
    if(imageFile) {
      uploadBytes(storageRef, imageFile)
      .then((snapshot) => {
        console.log('strage Uploaded a blob or file!');
        setImageFile(null)
        setImageChanged(false)
        
        getDownloadURL(storageRef)
        .then((url) => {
          thumbnail_url = url
          userInfoUpdater({ 
            variables: { 
              updateUserInfoData: {
                firebase_id: userInfo?.firebase_id,
                photo_url: thumbnail_url,
              }
            }
          })
          .then((data: any) => {
            console.log('db image path insert cleared')

            reset({inputText7: ""})

            setUserInfo(data.data.updateUserInfo)
          })
          .catch((error: { message: any; }) => {
            console.log(error.message)
          })
        })
        .catch((error) => {console.log(error.message)});
      })
      .catch((error) => {console.log(error.message)});
    }
    // comment と　user_name の　dbへのInsert処理 + state変更処理
    if(dirtyFields.inputText5 || dirtyFields.inputText6) {
      userInfoUpdater({ 
        variables: { 
          updateUserInfoData: {
            firebase_id: userInfo?.firebase_id,
            user_name :  username,
            comment :  comment,
          }
        }
      })
      .then((data: any) => {
        console.log('db insert cleared')

        const result = data.data.updateUserInfo
        reset({inputText5: result.user_name, inputText6: result.comment})

        setUserInfo(data.data.updateUserInfo)
      }).catch((error: { message: any; }) => {
        console.log(error.message)
        alert(error.message)
      })
    }
  }
  return (
    <>
      <Button onClick={onOpen}  colorScheme='orange' bg='orange.300' boxShadow='md' rounded='base' size='sm'>{props.title}</Button>
      <Modal
      isOpen={isOpen}
      onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader boxShadow='base'>
            <Flex fontSize={25}>
              <Box style={{width: 40, height: 40}} mr={2}>
                <Image src='/logo3.svg'  width={300} height={300} layout={'responsive'} alt="logo" priority></Image>
              </Box>
                {props.title}
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <Flex
          as="form" 
          direction="column" 
          w="100%" 
          onSubmit={ SubmitChange }
          >
            <ModalBody pb={6}>
              <UserNameInput defValue={ props.user_name } errors={ errors } register={ register } />
              <CommentInput defValue={ props.comment } errors={ errors } register={ register }/>
              <ThumbnailInput  setImageFile={ setImageFile } image={ image } setImage={ setImage } register={ register } setImageChanged={setImageChanged}/>
              <Flex direction='column'  m={3} align='center' justify='center'>
                  <SubmitOnlyWhenChangedButton formState={ formState } isDirty={ isDirty } imageChanged={imageChanged} onClose={onClose}/>
              </Flex>
            </ModalBody>
          </Flex>
          <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
  export const MyModal = (props: any) => {
    
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button onClick={onOpen}  colorScheme='orange' bg='orange.300' boxShadow='md' rounded='base' size='sm'>{props.title}</Button>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader boxShadow='base'>
                        <Flex fontSize={25}>
                            <Box style={{width: 40, height: 40}} mr={2}>
                                <Image src='/logo3.svg'  width={300} height={300} layout={'responsive'} alt="logo" priority></Image>
                            </Box>
                            {props.title}
                        </Flex>
                    </ModalHeader>
                    <ModalCloseButton />
                    { props.children }
                    <ModalFooter>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

