import { Center, Divider, Flex } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Validation_email } from "../../util/form/validation";
import { usePassChangeSendEmail } from "../../util/hook/useAuth";
import { ClickButton_submit } from "../atom/buttons";
import { NeumInput } from "../atom/inputs";

export const PasswordChangeForm = () => {
    const {executeSendEmail} = usePassChangeSendEmail()
    const { register, formState: { errors }, formState } = useForm({mode: "all"});
    const handleSubmit = async (e:any) => {
        e.preventDefault()
        const target = await e.target as any;
        const email = await target.input_email.value as string;
        executeSendEmail(email)
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
            <NeumInput 
            id={"input_email"} 
            labelName={"メールアドレス"} 
            placeholder="sample.com"
            validation={Validation_email}
            errors={errors} register={register} 
            isRequired
            my={3}
            />
            <ClickButton_submit 
            type="submit"
            formState={formState} 
            fontSize={15}
            my={5} 
            >
                変更する
            </ClickButton_submit>
        </Flex>
    )
}