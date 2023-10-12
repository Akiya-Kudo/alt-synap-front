// import dynamic from "next/dynamic";
import { Box, Flex, Grid, GridItem, PlacementWithLogical, Stack, Text, useBreakpointValue, VStack } from "@chakra-ui/react";
import { DentBord, FlatBord } from "../atom/bords";
import { NeumFloatFormInput } from "../atom/inputs"

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
    contentDefaultValue,
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
    
    const isMobile = useBreakpointValue([true, true, false])
    const titleHeight = useBreakpointValue(["80px", "105px", "140px"])
    const popoverHeight = useBreakpointValue(["40px", "50px"])
    const popoverPlacement = useBreakpointValue(["bottom-end", "bottom-end", "left"]) as PlacementWithLogical
    return (
        <>
        <Grid
        templateAreas={
            !isMobile ? `"title empty"
                        "editor popovers"`
                    :  `"popovers"
                        "title"
                        "editor"`
        }
        gridTemplateColumns={!isMobile ? '1fr 85px' : "1fr"}
        gridTemplateRows={!isMobile ? `${titleHeight} 1fr` : `${popoverHeight} ${titleHeight} 1fr`}
        w={["95%", "90%", "90%"]} h="100%" maxWidth="1100px" ms={["0px", "0px", "70px"]}
        as="form"
        >
            <GridItem colSpan={1} area={'title'}>
                <NeumFloatFormInput
                id="input_article_title"
                labelName={"タイトル"} 
                validation={Validation_post_title}
                errors={errors} register={register} 
                isRequired
                borderRadius="15px"
                fontWeight={"bold"}
                onChange={handleTitle}
                defaultValue={stateValue.title}
                />
            </GridItem>

            <GridItem colSpan={1} area={'empty'}/>

            <GridItem colSpan={1} area={'editor'}>
                <FlatBord
                minH={"65vh"} //editorの基準の高さ( 調整する場合は他のスタイルも同様に変更する必要あり )
                w={"100%"}
                maxWidth={"1100px"} //editorの基準の幅( 調整する場合は他のスタイルも同様に変更する必要あり )
                >
                    <ArticleEditor
                    setValue={handleContent} 
                    defaultValue={ contentDefaultValue }
                    />
                </FlatBord>
            </GridItem>
            
            <GridItem 
            colSpan={1} area={'popovers'} zIndex={1}
            as={Flex} flexDirection={["row", "row", "column"]}  gap={3} m={[1, 1, 4]} align="center"
            >
                <TopLinkInputPopover
                id={"input_top_link"} title="参照リンク" icon={<FaLink/>} setValue={handleTopLink} value={stateValue.top_link}
                tooltipContent={<Text fontSize={".8rem"}>参照リンクを追加することで元情報をすぐ確認することができます。</Text>}
                errors={errors} register={register} formState={formState}
                placement={popoverPlacement}
                />
                <TopImageInputPopover
                id="input_top_image" title="サムネイル" icon={<FaImage/>} 
                image={stateValue.top_image} imageFile={stateValue.top_image_file} setImage={handleTopImage} setImageFile={handleTopImageFile}
                tooltipContent={<Text fontSize={".8rem"}>投稿のサムネイルを追加できます。わかりやすく特徴的な投稿にすることができます。</Text>}
                errors={errors} register={register} formState={formState}
                placement={popoverPlacement}
                />
                <TagInputPopover 
                id="input_tags" title="タグ" icon={<FaTags/>} setValue={handleTagsAdd} value={stateValue.tags} onDeleteClick={handleTagDelete}
                tooltipContent={<Box fontSize={".8rem"}>投稿にタグを最大で５つまで指定することができます。関連する名前のタグを追加すると検索に役立ち、投稿を整理することができます。</Box>}
                errors={errors} register={register} formState={formState}
                placement={popoverPlacement}
                />
            </GridItem>
        </Grid>
    </>
    )
}