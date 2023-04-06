import { useEffect, useState } from "react"

import { useForm } from "react-hook-form"
import { Flex } from "@chakra-ui/react"

import { Validation_email, Validation_password, Validation_password_re, Validation_username } from "../../util/form/validation"
import { useSignUpFunc } from "../../util/hook/useAuth"
import { ClickButton_submit } from "../atom/buttons"
import { NeumInput, NeumInput_password } from "../atom/inputs"

export const SignupForm = () => {
    const {execute} = useSignUpFunc()
    const  { register, formState: { errors }, formState, getValues, trigger } = useForm({mode: "all" ,reValidateMode: "onChange"});
    const handleSubmit = async (e:any) => {
            e.preventDefault()
            const target = await e.target as any;
            const email = await target.input_email.value as string;
            const user_name = await target.input_username.value as string;
            const password = await target.input_password.value as string;
            execute(email, password, user_name );
    }
    //このuseStateをinputのonChangeで呼び出さないとパスワード確認のバリデーションがinput_passwordのonBlur時に起動しない
    const [pass, setPass] = useState("")
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
            // onChengeがないとonBlurでの確認時のvalueが１入力にゅうりょく前になる
            onChange={ (e:any) => {setPass(e.target.value)} }
            onBlur={ () => {
                const a = trigger("input_password_re", { shouldFocus: true }) 
                console.log("🚀 ~ file: SignupForm.tsx:64 ~ SignupForm ~ a:", a)
                
            }}
            />
            <NeumInput_password
            id={"input_password_re"} 
            labelName={"パスワード確認"} 
            placeholder="Password00"
            validation={Validation_password_re(getValues("input_password"))}
            errors={errors} register={register}
            isRequired
            my={1}
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