// import dynamic from "next/dynamic";
import { Box, Flex } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FlatBord } from "../atom/bords";
import { NeumFloatFormInput } from "../atom/inputs"
// import { useEffect, useState } from "react";

import dynamic from "next/dynamic";

const ArticleEditor = dynamic(
    () => import("../atom/ArticleEditor"),
    { ssr: false }
);


export const ArticlePostForm = () => {
    const  { register, formState: { errors }, formState, trigger, watch } = useForm({mode: "all"});
    return (
        <>
        <Flex flexDirection={"column"} w="90%" h="100%">
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
            h="65vh"
            my={3}
            >
            <ArticleEditor
            defaultValue={undefined}
            onChange={(api:any, event:any) =>{}}
            onReady={() => console.log("ready")}
            onSave={() => console.log("saved")}
            />
            </FlatBord>
        </Flex>
    </>
    )
}




// const ArticleEditor = dynamic(() => import("../atom/ArticleEditor"), { ssr: false, loading: () => <p>Loading ...</p>, });

// export const ArticlePostForm = () => {
    // const  { register, formState: { errors }, formState, trigger, watch } = useForm({mode: "all"});

//     // let [editorInstance, setEditorInstance] = useState({})
//     // const handleInstance = (instance: any) => {
//     //     setEditorInstance(instance)
//     // }

//     return (
        // <>
        //     <Flex flexDirection={"column"} w="90%" h="100%">
        //         <NeumFloatFormInput
        //         id="input_article_title"
        //         labelName={"タイトル"} 
        //         validation={undefined}
        //         errors={errors} register={register} 
        //         isRequired
        //         borderRadius="15px"
        //         my={3}
        //         fontWeight={"bold"}
        //         />
        //         <FlatBord
        //         h="65vh"
        //         my={3}
        //         >
        //             {/* {ArticleEditor && <ArticleEditor handleInstance={handleInstance}/>} */}
        //             {ArticleEditor && <ArticleEditor/>}
        //         </FlatBord>
        //     </Flex>
        // </>
//     )
// }

