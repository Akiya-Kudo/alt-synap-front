import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from "@chakra-ui/react"

type Props = {
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

export const PostTitleInput = ({ errors, register }: Props) => {
    return (
        <FormControl
        id="inputText10"
        isInvalid={errors.inputText10 ? true : false}
        isRequired
        my={3}
        >
            <FormLabel>Title</FormLabel>
            <Input
            focusBorderColor='teal.300'
            placeholder="Pathとは"
    
            {...register("inputText10",  {
                required: "this is required to fill",
                maxLength: { value: 50, message: 'Please make Title less than 60 words' },
                minLength: { value: 5, message: "Please make Title more than 5 words" }
            })}
            />
            <FormErrorMessage>
                {errors.inputText10 && <div role="alert">{errors.inputText10?.message + " "}</div>}
            </FormErrorMessage>
        </FormControl>
    )
}

export const TopLinkInput = ({ errors, register }: Props) => {
    return (
        <FormControl
        id="inputText11"
        isInvalid={errors.inputText11 ? true : false}
        my={3}
        >
            <FormLabel>Top Link </FormLabel>
            <Input
            type="url"
            focusBorderColor='teal.300'
            placeholder="https://"
    
            {...register("inputText11",  {
                maxLength: { value: 1000, message: 'Please make Link less than 1000 words' },
                minLength: { value: 7, message: "Please make Link more than 7 words" }
            })}
            />
            <FormHelperText>投稿の参照したページやURLを入力してください（Referred Link）</FormHelperText>
            <FormErrorMessage>
                {errors.inputText11 && <div role="alert">{errors.inputText11?.message + " "}</div>}
            </FormErrorMessage>
        </FormControl>
    )
}