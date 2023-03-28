import { Box, BoxProps, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement, Link, ModalBody, Text, Textarea } from '@chakra-ui/react'
import React from 'react'
import { useSocialLoginFunc } from '../../util/hook/useAuth';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import NextLink from "next/link"

import ImageThumnail from "../../public/thumnailimage.svg";
import Image from 'next/image';

type InputProps = {
  text?: string;
  errors?: any;
  formState?: any;
  register?: any;
  password?: string;
  defValue?: string | null;
  isDirty?: boolean;
  imageChanged?: boolean;
  onClose?: any;
}

export function UserNameInput({ errors, register, defValue }: InputProps  ) {

  return (
    <FormControl
    id="inputText5"
    isInvalid={errors.inputText5 ? true : false}
    isRequired
    my={5}
    >
      <FormLabel>User Name</FormLabel>
      <Input
        focusBorderColor='teal.300'
        placeholder="Tipsco"
        defaultValue={defValue}

        {...register("inputText5",  {
          required: "this is required to fill",
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

export function CommentInput({ errors, register, defValue }: InputProps) {
  return (
    <FormControl
    id="inputText6"
    isInvalid={errors.inputText6 ? true : false}
    my={5}
    >
      <FormLabel>Comment</FormLabel>
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

export function ThumbnailInput ({image, setImage, setImageFile, register, setImageChanged}: any) {

  // 画像を選択したら画面に表示する処理
  const ImageSet = (e: any) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file)
      const photo = window.URL.createObjectURL(file)
      setImage(photo)
      setImageChanged(true)
    }
  }

  return (
    <FormControl
    id="inputText7"
    my={5}
    >
      <FormLabel mb={5}>User Photo (Jpeg・Png Only)</FormLabel>
        <Box display={"flex"} justifyContent="center" alignItems={"center"} gap={10}>          
          { image 
          ? 
            <Box style={{width: 100, height: 100}} borderRadius={10} overflow="hidden"  boxShadow="0px 0px 20px gray">
              <Image alt="" src={image} width={100} height={100} layout={'responsive'} /> 
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

export function EmailInput({ errors, register }: InputProps) {
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


export function PasswordInput({ errors, register }: InputProps) {

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


export function PasswordRemaindInput({ errors, register, password }: InputProps) {

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


export function SubmitButton ({ text = "Submit", formState }:InputProps) {
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

export function SubmitOnlyWhenChangedButton ({ text = "Submit", formState, isDirty, imageChanged, onClose }:InputProps) {

  return (
    <Button 
      colorScheme="teal" 
      m={5}
      type="submit" 
      disabled={ !formState.isValid || (!isDirty && !imageChanged ) }
      isLoading={formState.isSubmitting}
      onClick={onClose}
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