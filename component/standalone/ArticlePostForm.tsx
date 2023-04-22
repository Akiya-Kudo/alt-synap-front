// import dynamic from "next/dynamic";
import { Box, Flex, Grid, GridItem, Text, Tooltip, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { DentBord, FlatBord } from "../atom/bords";
import { GlassFormInput, NeumFloatFormInput } from "../atom/inputs"
import { NeumIconButton } from "../atom/buttons"
// import { useEffect, useState } from "react";

import dynamic from "next/dynamic";
import { FaImage, FaLink, FaQuestion, FaTags } from "react-icons/fa";
import { ArticlePostFormProps } from "../../type/standalone";
import { Validation_post_title } from "../../util/form/validation";
import { PostReferencePopover } from "../helper/TopLinkInputPopover";

const ArticleEditor = dynamic(
    () => import("../atom/ArticleEditor"),
    { ssr: false }
);

// 投稿stateの管理はheaderでの処理があるためpageコンポーネントで行う
export const ArticlePostForm = ({register, errors, formState, childFormRef, handleChange_title, handleChange_top_link, stateValue}:ArticlePostFormProps) => {
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
                <VStack gap={1}>
                    <PostReferencePopover
                    errors={errors} register={register} formState={formState}
                    onChange={handleChange_top_link} value={stateValue.top_link}
                    
                    id={"input_top_link"} title="WEBブックマーク" icon={<FaLink/>}
                    tooltipContent={<Text fontSize={".6.5rem"} pb={2}>WEBブックマークを付けると、投稿を開かずにリンクに飛ぶことができます。すぐ確認し直したい時に便利です！</Text>}
                    />
                    <NeumIconButton 
                    aria-label="top-image-modal-button" 
                    icon={<FaImage/>}
                    size={"md"}
                    neumH="shallow"
                    />
                    <NeumIconButton 
                    aria-label="tag-selector-modal-button" 
                    icon={<FaTags/>}
                    size={"md"}
                    neumH="tall"
                    />
                    <DentBord
                    h={"30px"}
                    w={"30px"}
                    >
                        <FaQuestion fontSize={".6rem"} color="orange" />
                    </DentBord>
                </VStack>
            </GridItem>
        </Grid>
    </>
    )
}