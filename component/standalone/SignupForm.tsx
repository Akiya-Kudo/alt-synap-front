import { useEffect, useState } from "react"

import { useForm } from "react-hook-form"
import { Flex } from "@chakra-ui/react"

import { Validation_email, Validation_password, Validation_password_re, Validation_username } from "../../util/form/validation"
import { useSignUpFunc } from "../../util/hook/useAuth"
import { ClickButton_submit } from "../atom/buttons"
import { NeumFloatFormInput, NeumFloatFormInput_password, NeumFormInput, NeumFormInput_password } from "../atom/inputs"

export const SignupForm = () => {
    const {execute} = useSignUpFunc()
    const  { register, formState: { errors }, formState, trigger, watch } = useForm({mode: "all"});
    const PassWatch = watch("input_password")
    const handleSubmit = async (e:any) => {
            e.preventDefault()
            const target = await e.target as any;
            const email = await target.input_email.value as string;
            const user_name = await target.input_username.value as string;
            const password = await target.input_password.value as string;
            execute(email, password, user_name );
    }
    return (
        <Flex
        as="form" 
        direction="column" 
        w={700} maxW={"80%"}
        justify="center" 
        align="center" 
        onSubmit={handleSubmit}
        >
            <NeumFloatFormInput
            id={"input_email"} 
            labelName={"メールアドレス"} 
            validation={Validation_email}
            errors={errors} register={register} 
            isRequired
            my={1}
            />
            <NeumFloatFormInput
            id={"input_username"} 
            labelName={"ユーザネーム"} 
            validation={Validation_username} maxLength={50}
            errors={errors} register={register} 
            isRequired
            my={1}
            />
            <NeumFloatFormInput_password
            id={"input_password"} 
            labelName={"パスワード"} 
            validation={Validation_password}
            errors={errors} register={register} 
            isRequired
            my={1}
            onBlur={ (e:any) => {
                trigger("input_password_re", { shouldFocus: true }) 
            }}
            />
            <NeumFloatFormInput_password
            id={"input_password_re"} 
            labelName={"パスワード確認"} 
            placeholder="Password00"
            validation={Validation_password_re(PassWatch)}
            errors={errors} register={register}
            isRequired
            my={1}
            />
            <ClickButton_submit
            type="submit"
            formState={formState} 
            fontSize={15}
            mt={4} mb={10}
            size={"md"}
            >
                登録する
            </ClickButton_submit>
        </Flex>
    )
}