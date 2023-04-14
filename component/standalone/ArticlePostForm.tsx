import { Box } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FlatBord } from "../atom/bords";
import { NeumFloatFormInput } from "../atom/inputs"

export const ArticlePostForm = () => {
    const  { register, formState: { errors }, formState, trigger, watch } = useForm({mode: "all"});
    return (
        <>
            <Box display={"flex"} flexDirection={"column"} w="90%" h="100%">
                <NeumFloatFormInput
                id="input_article_title"
                labelName={"タイトル"} 
                validation={undefined}
                errors={errors} register={register} 
                isRequired
                borderRadius="15px"
                my={3}
                fontWeight={"bold"}
                />
                <FlatBord
                h="60vh"
                my={3}
                >editor</FlatBord>
            </Box>
        </>
    )
}