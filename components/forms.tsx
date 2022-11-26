import { Box, BoxProps, Button, Divider, Flex, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement, Link, ModalBody, Text, Textarea } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { useLogInFunc, useSocialLoginFunc } from '../utils/hooks/useAuth';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import NextLink from "next/link"
import { useForm } from 'react-hook-form';

import ImageThumnail from "../public/thumnailimage.svg";
import Image from 'next/image';
 
import { storage } from '../utils/firebase/init';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { setUserInfoContext, UserInfoContext } from '../context/auth';
import { useUserInfoUpdater } from '../utils/hooks/useMutation';

// useFormは呼び出し先で変数定義する

type Props = {
  text?: string;
  errors?: any;
  formState?: any;
  register?: any;
  password?: string;
  defValue?: string | null;
  isDirty?: boolean;
  imageChanged?: boolean;
}
type DefaultValue = {
  user_name: string | null;
  comment: string | null;
  photo_path: string | null;
}

export const AccountForm = ({user_name, comment, photo_path}: DefaultValue) => {

  const { userInfo } = useContext(UserInfoContext);
  const { setUserInfo } = useContext(setUserInfoContext);

  const [displayImage, setDisplayImage] = useState(photo_path)
  const [imageChanged, setImageChanged] = useState(false)

  const { userInfoUpdater } = useUserInfoUpdater();
  
  const { register, formState: { errors, isDirty, dirtyFields }, formState } = useForm({mode: "all"});

  // Form送信イベントでの処理
  const SubmitChange = (e: any) => {
    e.preventDefault()
    const target = e.target as any;
    const username = target.inputText5.value as string;
    const comment = target.inputText6.value as string;

    const photo = target.inputText7.files[0]; 
    let thumbnail_url = userInfo?.photo_url;


    // 画像Storage 保存処理 + dbへのInsert処理 + state変更処理
    const storageRef = ref(storage, "thumbnail/" + userInfo?.firebase_id);
    if(photo) {
      uploadBytes(storageRef, photo)
      .then((snapshot) => {
        console.log('strage Uploaded a blob or file!');

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
    // comment と　user_nme の　dbへのInsert処理 + state変更処理
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
          setUserInfo(data.data.updateUserInfo)
      }).catch((error: { message: any; }) => {
          console.log(error.message)
          alert(error.message)
      })
    }
  }
  return (
    <>
      {  userInfo ?   
        <Flex
          as="form" 
          direction="column" 
          w="100%" 
          onSubmit={ SubmitChange }
        >
          <ModalBody pb={6}>
              <UserNameInput defValue={ user_name } errors={ errors } register={ register } />
              <CommentInput defValue={ comment } errors={ errors } register={ register }/>
              <ThumbnailInput defValue={ photo_path } setDisplayImage={ setDisplayImage } displayImage={ displayImage } register={ register } setImageChanged={setImageChanged}/>
              <Flex direction='column'  m={3} align='center' justify='center'>
                  <SubmitOnlyWhenChangedButton formState={ formState } isDirty={ isDirty } imageChanged={imageChanged}/>
              </Flex>
          </ModalBody>
        </Flex>
      :
        null
      }
      </>
    )
}

// ログインフォームコンポーネント定義
export const LoginForm = () => {

  const { register, formState: { errors }, formState } = useForm({mode: "all"});

  const {execute} = useLogInFunc()

  return (
      <Flex
          as="form" 
          direction="column" 
          w="100%" 
          onSubmit={async e => {
              e.preventDefault()
              const target = e.target as any;
              const email = target.inputText3.value as string;
              const password = target.inputText2.value as string;
              execute(email, password);
          }}
      >
        <ModalBody pb={6}>
            <EmailInput  errors={ errors } register={ register }/>
            <PasswordInput  errors={ errors } register={ register }/>
            <Flex direction='column'  m={3} align='center' justify='center'>
                <SubmitButton text='Log in' formState={ formState }/>
                <FotgetPassLink/>
            <Divider/>
            </Flex>
            <SocialLoginButtons/>
        </ModalBody>
      </Flex>
  )
}

export function UserNameInput({ errors, register, defValue }: Props  ) {

  return (
    <FormControl
    id="inputText5"
    isInvalid={errors.inputText5 ? true : false}
    isRequired
    my={5}
    >
      <FormLabel>User Name : ユーザネーム</FormLabel>
      <Input
        focusBorderColor='teal.300'
        placeholder="Tipsco"
        defaultValue={defValue}

        {...register("inputText5",  {
          maxLength: { value: 50, message: 'Please make User Name less than 50 words' },
          minLength: { value: 2, message: "Please make User Name more than 2 words" }
        })}
      />
      <FormErrorMessage>
        {errors.inputText5 && <div role="alert">{errors.inputText5?.message + " "}</div>}
      </FormErrorMessage>
    </FormControl>
  )
}

export function CommentInput({ errors, register, defValue }: Props) {
  return (
    <FormControl
    id="inputText6"
    isInvalid={errors.inputText6 ? true : false}
    my={5}
    >
      <FormLabel>Comment : コメント</FormLabel>
      <Textarea 
        focusBorderColor='teal.300'
        placeholder="Hy I study Python & PHP."
        defaultValue={defValue}
        {...register("inputText6", {
          maxLength: { value: 150, message: "Please make Comment less than 150 words" }
        })}
      />
      <FormErrorMessage>
        {errors.inputText6 && <div role="alert">{errors.inputText6?.message + " "}</div>}
      </FormErrorMessage>
    </FormControl>
  )
}

export function ThumbnailInput ({displayImage, setDisplayImage, register, setImageChanged}: any) {
  
  // 画像を選択したら画面に表示する処理
  const ImageSet = (e: any) => {
    const file = e.target.files[0]
    const image = window.URL.createObjectURL(file)
    setDisplayImage(image)
    setImageChanged(true)
  }

  return (
    <FormControl
    id="inputText7"
    my={5}
    >
      <FormLabel mb={5}>User Photo : ユーザ画像 (Jpeg・Png Only)</FormLabel>
        <Box display={"flex"} justifyContent="center" alignItems={"center"} gap={10}>          
          { displayImage 
          ? 
            <Box style={{width: 100, height: 100}} borderRadius={10} overflow="hidden"  boxShadow="0px 0px 20px gray">
              <Image alt="" src={displayImage} width={100} height={100} layout={'responsive'} /> 
            </Box>
          : 
            null 
          }
          <Box border="1.5px dashed #319795" borderRadius={5} pos="relative" display={"flex"} flexDirection="column" alignItems={"center"} justifyContent="center" textAlign={"center"} p={5}>
              <Box style={{width: 100, height: 100}} borderRadius={10} overflow="hidden">
                <Image alt="" src={ ImageThumnail} width={100} height={100} layout={'responsive'} />
              </Box>
              <Text color={"gray.500"} mt={2}>Click or Drug & Drop</Text>
            <Input   
            {...register("inputText7")}
            type={"file"} 
            accept=" .png, .jpeg, .jpg, .svg"
            onChange={ ImageSet }
            cursor={"pointer"} w="100%" h="100%" pos={"absolute"} left={0} right={0} opacity={0} />
          </Box>
        </Box>
    </FormControl>
  )
}

export function EmailInput({ errors, register }: Props) {
  return (
    <FormControl
      id="inputText3"
      isRequired
      isInvalid={errors.inputText3 ? true : false}
      m={2}
    >
      <FormLabel>Email</FormLabel>
      <Input
        focusBorderColor='teal.300'
        placeholder="test@example.com"
        {...register("inputText3", {
          required: "メールアドレスは必須です | password required",
          pattern: {
            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "メールアドレス形式で入力してください | email required",
          },
        })}
      />
      <FormErrorMessage>
        {/* {errors.inputText3 && errors.inputText3?.message} */}
        {errors.inputText3 && <div role="alert">{errors.inputText3?.message + " "}</div>}
      </FormErrorMessage>
  </FormControl>
  )
}


export function PasswordInput({ errors, register }: Props) {

  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  return (
    <FormControl
      id="inputText2"
      isRequired
      isInvalid={errors.inputText2 ? true : false}
      m={2}
    >
      <FormLabel>Password</FormLabel>
      <InputGroup size='md'>
        <Input
          focusBorderColor='teal.300'
          placeholder='Enter password'
          type={show ? 'text' : 'password'}
          {...register("inputText2", {
            required: "パスワードは必須です | password required",
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,24}$/,
              message: "8文字以上、大文字アルファベット、小文字アルファベット、数字を一文字以上含めてください | At least 8 characters, upper & lower case letter & number",
            },
          })}
        />
        <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={handleClick}>
            {show ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>
        {/* {errors.inputText2 && errors.inputText2?.message} */}
        {errors.inputText2 && <div role="alert">{errors.inputText2?.message + " "}</div>}
      </FormErrorMessage>
    </FormControl>
  )
}


export function PasswordRemaindInput({ errors, register, password }: Props) {

  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  return (
    <FormControl
      id="inputText4"
      isRequired
      isInvalid={errors.inputText4 ? true : false}
      m={2}
    >
      <FormLabel>Password Again</FormLabel>
      <InputGroup size='md'>
        <Input
          focusBorderColor='teal.300'
          placeholder='Enter password'
          type={show ? 'text' : 'password'}
          {...register("inputText4", {
            required: "パスワード確認は必須です。",
            validate: (value: any) => {
              return (
                value === password || "パスワードが一致しません | password do not match"
              );
            }
          })}
        />
        <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={handleClick}>
            {show ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>
        {/* {errors.inputText4 && errors.inputText4?.message} */}
        {errors.inputText4 && <div role="alert">{errors.inputText4?.message + " "}</div>}
      </FormErrorMessage>
    </FormControl>
  )
}


export function SubmitButton ({ text = "Submit", formState }:Props) {
  return (
    <Button 
      colorScheme="teal" 
      m={5}
      type="submit" 
      disabled={!formState.isValid}
      isLoading={formState.isSubmitting}
    >
      {text}
    </Button>
  )
}

export function SubmitOnlyWhenChangedButton ({ text = "Submit", formState, isDirty, imageChanged }:Props) {

  return (
    <Button 
      colorScheme="teal" 
      m={5}
      type="submit" 
      disabled={ !formState.isValid || (!isDirty && !imageChanged ) }
      isLoading={formState.isSubmitting}
    >
      {text}
    </Button>
  )
}

// google ログインボタンコンポーネント定義
export const SocialLoginButtons = (props : BoxProps) => {

  const {executeGoogle, executeGithub} = useSocialLoginFunc();

  return (
      <>
      <Flex direction='row' mt={0} align='center' justify='center'>
          <Button colorScheme='facebook' bg='facebook.400' rightIcon={<FaGithub />} m={2} px={10} onClick={ () => executeGithub() }>Github</Button>
          <Button colorScheme='red' bg='red.400' rightIcon={<FaGoogle/>} m={2} px={10} onClick={ () => executeGoogle() } >GMail</Button>
      </Flex>
      </>
  )
}

export const FotgetPassLink = () => {

  return (
    <NextLink href='/guest/changePassword' passHref>
      <Link color='teal.600' mb={3}>Forget Your Password ?</Link>
    </NextLink>
  )
}