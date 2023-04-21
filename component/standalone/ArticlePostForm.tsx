// import dynamic from "next/dynamic";
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FlatBord } from "../atom/bords";
import { NeumFloatFormInput } from "../atom/inputs"
import { NeumIconButton } from "../atom/buttons"
// import { useEffect, useState } from "react";

import dynamic from "next/dynamic";
import { SwitchButton } from "../atom/buttons";
import { FaImage, FaLink, FaTags } from "react-icons/fa";
import { useState } from "react";
import { ArticlePostData } from "../../type/page";
import { ArticlePostFormProps } from "../../type/standalone";
import { Validation_post_title } from "../../util/form/validation";

const ArticleEditor = dynamic(
    () => import("../atom/ArticleEditor"),
    { ssr: false }
);


export const ArticlePostForm = ({register, errors, childFormRef, handleChange_title}:ArticlePostFormProps) => {
    //投稿stateの管理はheaderでの処理があるためpageコンポーネントで行う
    return (
        <>
        <Grid
        // gridTemplateRows={'90px 1fr'} //105pxはinputのheight + margin
        gridTemplateColumns={'1fr 50px'}
        w="90%" h="100%" maxWidth="1100px" ms={"70px"}
        gap={4}
        as="form"
        ref={childFormRef}
        >
            <GridItem colSpan={1}>
                <NeumFloatFormInput
                id="input_article_title"
                labelName={"タイトル"} 
                validation={Validation_post_title} maxLength={60}
                errors={errors} register={register} 
                isRequired
                borderRadius="15px"
                fontWeight={"bold"}
                onChange={handleChange_title}
                />
            </GridItem>
            <GridItem colSpan={1}/>
            <GridItem colSpan={1}>
                <FlatBord
                h={"65vh"}
                w={"100%"}
                >
                    <ArticleEditor
                    defaultValue={undefined}
                    onChange={(api:any, event:any) =>{}}
                    onReady={() => console.log("ready")}
                    onSave={() => console.log("saved")}
                    />
                </FlatBord>
            </GridItem>
            <GridItem colSpan={1} display="flex" flexDirection="column" gap={3}>
                <NeumIconButton 
                aria-label="top-link-modal-button" 
                icon={<FaLink/>} 
                size={"md"}
                onClick={()=>{}}
                />
                <NeumIconButton 
                aria-label="top-image-modal-button" 
                icon={<FaImage/>}
                size={"md"}
                onClick={()=>{}}
                />
                <NeumIconButton 
                aria-label="tag-selector-modal-button" 
                icon={<FaTags/>}
                size={"md"}
                onClick={()=>{}}
                />
            </GridItem>
        </Grid>
    </>
    )
}