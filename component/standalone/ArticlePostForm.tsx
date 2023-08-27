// import dynamic from "next/dynamic";
import { Box, Flex, Grid, GridItem, Text, Tooltip, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { DentBord, FlatBord } from "../atom/bords";
import { GlassFormInput, NeumFloatFormInput } from "../atom/inputs"

import dynamic from "next/dynamic";
import { FaImage, FaLink, FaQuestion, FaTags } from "react-icons/fa";
import { ArticlePostFormProps } from "../../type/standalone";
import { Validation_post_title } from "../../util/form/validation";
import { TopLinkInputPopover } from "../helper/TopLinkInputPopover";
import { TopImageInputPopover } from "../helper/TopImageInputPopover";
import { TagInputPopover } from "../helper/TagInputPopover";
import { Tag, TagEditing } from "../../type/global";

const ArticleEditor = dynamic(
    () => import("../atom/ArticleEditor"),
    { ssr: false }
);

// 投稿stateの管理はheaderでの処理があるためpageコンポーネントで行う
export const ArticlePostForm = ({
    register, errors, formState, 
    stateValue, setStateValue, 
}:ArticlePostFormProps) => {
    const handleContent = (e: any) => setStateValue((prev) => ({
        ...prev, articleContent: {
            ...prev.articleContent, content: e,
        },
    }));
    const handleTitle = (e:any) => setStateValue((prev)=>({...prev, title: e.target.value}))
    const handleTopLink = (e:any) => setStateValue((prev)=>({...prev, top_link: e.target.value}))
    const handleTopImageFile = (file:any) => setStateValue((prev)=>({...prev, top_image_file: file }))
    const handleTopImage = (photo:any) => setStateValue((prev)=>({...prev, top_image: photo }))
    const handleTagsAdd = (e:any) => {
        // const newTag = e.target.value;
        const newTag: TagEditing = {
            tid: undefined,
            tag_name: e.target.value,
        }
        const tags = [...stateValue.tags, newTag] as Tag[] | TagEditing[]
        setStateValue((preV)=>({...preV, tags: tags}))
    }
    const handleTagDelete = (id:number) => {
        const Array = stateValue.tags
        const newArray = [...Array] as Tag[] | TagEditing[]
        newArray.splice(id,1)
        setStateValue((preV)=>({...preV, tags: newArray}))
    }
    return (
        <>
        <Grid
        gridTemplateColumns={'1fr 50px'}
        w="90%" h="100%" maxWidth="1100px" ms={"70px"}
        gap={4}
        as="form"
        >
            <GridItem colSpan={1}>
                <NeumFloatFormInput
                id="input_article_title"
                labelName={"タイトル"} 
                validation={Validation_post_title}
                errors={errors} register={register} 
                isRequired
                borderRadius="15px"
                fontWeight={"bold"}
                onChange={handleTitle}
                />
            </GridItem>
            <GridItem colSpan={1}/>
            <GridItem colSpan={1}>
                <FlatBord
                minH={"65vh"} //editorの基準の高さ( 調整する場合は他のスタイルも同様に変更する必要あり )
                w={"100%"}
                maxWidth={"1100px"} //editorの基準の幅( 調整する場合は他のスタイルも同様に変更する必要あり )
                >
                    <ArticleEditor
                    setValue={handleContent} value={stateValue.articleContent.content}
                    />
                </FlatBord>
            </GridItem>
            <GridItem colSpan={1} display="flex" flexDirection="column" gap={3} zIndex={1}>
                <VStack gap={1}>
                    <TopLinkInputPopover
                    id={"input_top_link"} title="WEBブックマーク" icon={<FaLink/>} setValue={handleTopLink} value={stateValue.top_link}
                    tooltipContent={<Text fontSize={".6.5rem"}>WEBブックマークを付けると、投稿を開かずにリンクに飛ぶことができます。すぐ確認し直したい時に便利です！</Text>}
                    errors={errors} register={register} formState={formState}
                    />
                    <TopImageInputPopover
                    id="input_top_image" title="サムネイル" icon={<FaImage/>} 
                    image={stateValue.top_image} imageFile={stateValue.top_image_file} setImage={handleTopImage} setImageFile={handleTopImageFile}
                    tooltipContent={<Text fontSize={".6.5rem"}>投稿のトップに画像を追加できます。投稿の内容に沿った画像を表示することで、わかりやすい投稿になります。</Text>}
                    errors={errors} register={register} formState={formState}
                    />
                    <TagInputPopover 
                    id="input_tags" title="タグ" icon={<FaTags/>} setValue={handleTagsAdd} value={stateValue.tags} onDeleteClick={handleTagDelete}
                    tooltipContent={<Box fontSize={".6.5rem"}>投稿にタグを最大で５つまで指定することができます。関連する名前のタグを追加すると検索で探しやすくなります。</Box>}
                    errors={errors} register={register} formState={formState}
                    />
                    <DentBord h={"30px"} w={"30px"} >
                        <FaQuestion fontSize={".6rem"} color="orange" />
                    </DentBord>
                </VStack>
            </GridItem>
        </Grid>
    </>
    )
}