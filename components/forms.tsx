import { BoxProps, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement, Link } from '@chakra-ui/react'
import React from 'react'
import { githubLoginFunc, googleLoginFunc } from '../utils/login';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import NextLink from "next/link"
import { AuthProvider } from 'firebase/auth';

// useFormは呼び出し先で変数定義する

type Props = {
  text?: string;
  errors?: any;
  formState?: any;
  register?: any;
  password?: string;
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
          required: "メールアドレスは必須です。",
          pattern: {
            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "メールアドレス形式で入力してください。",
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
            required: "パスワードは必須です。",
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,24}$/,
              message: "8文字以上、大文字アルファベット、小文字アルファベット、数字を一文字以上含めてください",
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
                value === password || "メールアドレスが一致しません"
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
      m={2}
      type="submit" 
      disabled={!formState.isValid}
      isLoading={formState.isSubmitting}
    >
      {text}
    </Button>
  )
}

// google ログインボタンコンポーネント定義
export const SocialLoginButtons = (props : BoxProps) => {
  return (
      <>
      <Flex direction='row' mt={0} align='center' justify='center'>
          <Button colorScheme='facebook' bg='facebook.400' rightIcon={<FaGithub />} m={2} px={10} onClick={ () => githubLoginFunc() }>Github</Button>
          <Button colorScheme='red' bg='red.400' rightIcon={<FaGoogle/>} m={2} px={10} onClick={ () => googleLoginFunc() } >GMail</Button>
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