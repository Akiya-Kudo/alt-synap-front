import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, HStack, Input, Stack } from "@chakra-ui/react"
import { NextPage } from "next"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { NeumFloatFormInput, NeumFloatFormInput_password, NeumFormInput } from "../component/atom/inputs"
import { Validation_email } from "../util/form/validation"
import { useNeumorphismColorMode } from "../util/hook/useColor"
import { useNeumStyle } from "../util/hook/useTheme"

const Test:NextPage = () => {
    const { highlight, shadow } = useNeumorphismColorMode()
    const  { register, formState: { errors }, formState, getValues, trigger, watch } = useForm({mode: "all" ,reValidateMode: "onChange"});
    const Input1Value = watch("input1")
    return (
        <> 
        <Stack>
            <Flex as="form">
                <Box>{Input1Value}</Box>
                <Box>{getValues("input1")}</Box>
                <Box>{}</Box>
                <FormControl isInvalid={errors.input1 ? true : false}>
                    <Input
                    {...register("input1", {
                        required: "11111",
                    })}
                    onBlur={ (e:any) => {
                        const a = trigger("input2", { shouldFocus: true }) 
                    }}
                    />
                    <FormErrorMessage ms={5}>
                    {errors.input1 && <div role="alert">{errors.nput1?.message + " "}</div>}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.input2 ? true : false}>
                    <Input
                    {...register("input2", {
                        required: "22222",
                        validate: (value: any) => {
                            return (
                            value === Input1Value || "パスワードが一致しません | password do not match"
                            );
                        }
                    })}
                    m={10}
                    />
                    <FormErrorMessage ms={5}>
                    {errors.input2 && <div role="alert">{errors.input2?.message + " "}</div>}
                    </FormErrorMessage>
                </FormControl>
            </Flex>
            {/* <Stack w="500px">
                <NeumFloatFormInput m={10} id="hello1" errors={errors} validation={Validation_email} labelName="Email" register={register} isRequired/>
                <NeumFloatFormInput_password id="hello2" errors={errors} validation={Validation_email} labelName="Email" register={register} isRequired/>
            </Stack>
            <Stack w="500px">
                <NeumFormInput m={10} id="hello4" size="sm" errors={errors} validation={Validation_email} labelName="Email" register={register} isRequired />
                <NeumFormInput m={10} id="hello5" size="md" errors={errors} validation={Validation_email} labelName="Email" register={register} isRequired />
                <NeumFormInput placeholder="fvkdson" m={10} id="hello6" size="lg" errors={errors} validation={Validation_email} labelName="Email" register={register} isRequired />
            </Stack>
            <Stack w="500px">
                <Input m={10} id="hello4" size="sm"  isRequired />
                <Input  m={10} id="hello5" size="md"  isRequired />
                <Input size="lg"isRequired />
            </Stack> */}
        </Stack>
        </>
    )
}
export default Test