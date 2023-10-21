import { useEffect, useRef, useState } from "react";
import { ArticleEditorProps } from "../../type/atom";
import { Box } from "@chakra-ui/react";
import EditorJS, { API, OutputData } from "@editorjs/editorjs";
import { EditorTools, i18n } from "../../util/form/editorjs_tools";
// import { EditorTools, i18n } from "@constants/EditorTools";

const ArticleEditor = ({
    defaultValue,
    setValue,
    placeholder="文章を書きはじめる",
    maxWidth="1100px", w="100%", minHeight="65vh",
}: ArticleEditorProps) => {
    const id = "article-editorjs"
    const editorJS = useRef<EditorJS | null>(null);

    useEffect(() => {
        if (editorJS.current === null) {
            editorJS.current = new EditorJS({
                placeholder,
                readOnly: false,
                holder: id,
                // data: defaultValue,
                onChange(api: API, event: CustomEvent) {
                    editorJS.current?.save().then((res) => {
                        setValue && setValue(res);
                    });
                },
                onReady() {},
                i18n: i18n,
                tools: EditorTools,
                autofocus: true,
                defaultBlock: "paragraph"
            });
        }
    }, []);

    useEffect(() => {
        // defaultValueが変更された場合にデータをセット
        // contentにfake data (the case user write nothing) がある場合には clear & renderしない
        if (editorJS.current !== null && defaultValue && defaultValue?.blocks.length>0) {
            editorJS.current.isReady
                .then(() => {
                    editorJS.current?.clear();
                    editorJS.current?.render(defaultValue)
                })
                .catch((error) => {console.error("EditorJS is not ready:", error)})
        }
    }, [defaultValue]);

    return <Box id={id} minHeight={minHeight} w={w} maxWidth={maxWidth}/>;
};

export default ArticleEditor;