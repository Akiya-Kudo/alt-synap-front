import { useEffect, useState } from "react"
import { FaGithub, FaGoogle } from "react-icons/fa"

import { FormProvider, useForm } from "react-hook-form"
import { Box, Button, Flex } from "@chakra-ui/react"

import { Validation_email, Validation_password, Validation_password_re, Validation_username } from "../../util/form/validation"
import { useSignUpFunc, useSocialLoginFunc } from "../../util/hook/useAuth"
import { ClickButton, ClickButton_submit } from "../atom/buttons"
import { BasicInput, NeumInput, NeumInput_password } from "../atom/inputs"

export const SignupForm = () => {
    const {execute} = useSignUpFunc()
    const  { register, formState: { errors }, formState, getValues, trigger } = useForm({mode: "all"});
    const handleSubmit = async (e:any) => {
            e.preventDefault()
            const target = await e.target as any;
            const email = await target.input_email.value as string;
            const user_name = await target.input_username.value as string;
            const password = await target.inputText2.value as string;
            execute(email, password, user_name );
    }
    const [pass, setPass] = useState("")
    // useEffect(() => {
        // console.log(getValues("input_password") == getValues("input_password_re"))
    // })
    return (
        <Flex
        as="form" 
        direction="column" 
        w={700} maxW={"80%"}
        justify="center" 
        align="center" 
        onSubmit={handleSubmit}
        >
            <NeumInput
            id={"input_email"} 
            labelName={"メールアドレス"} 
            placeholder="sample.com"
            validation={Validation_email}
            errors={errors} register={register} 
            isRequired
            my={1}
            />
            <NeumInput
            id={"input_username"} 
            labelName={"ユーザネーム"} 
            placeholder="Tipsko"
            validation={Validation_username}
            errors={errors} register={register} 
            isRequired
            my={1}
            />
            <NeumInput_password
            id={"input_password"} 
            labelName={"パスワード"} 
            placeholder="Password00"
            validation={Validation_password}
            errors={errors} register={register} 
            isRequired
            my={1}
            onChange={ (e:any) => {setPass(e.target.value)} }
            onBlur={ () => trigger("input_password_re", { shouldFocus: true }) }
            />
            <NeumInput_password
            id={"input_password_re"} 
            labelName={"パスワード確認"} 
            placeholder="Password00"
            validation={Validation_password_re(getValues("input_password"))}
            errors={errors} register={register}
            isRequired
            my={1}
            onChange={(e:any)=>console.log(e.target.value)}
            />
            {/* <PasswordRemaindInput  errors={ errors } register={ register } password={getValues("inputText2")}/> */}
            <ClickButton_submit
            type="submit"
            formState={formState} 
            fontSize={15}
            mt={2} mb={10}
            size={"md"}
            >
                登録する
            </ClickButton_submit>
        </Flex>
    )
}