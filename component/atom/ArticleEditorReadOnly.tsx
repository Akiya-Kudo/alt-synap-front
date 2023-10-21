import { useEffect, useRef, useState } from "react";
import { ArticleEditorProps } from "../../type/atom";
import { Box } from "@chakra-ui/react";
import EditorJS, { API, OutputData } from "@editorjs/editorjs";
import { EditorTools, i18n } from "../../util/form/editorjs_tools";

const ArticleEditorReadOnly = ({
    defaultValue,
    setValue,
    placeholder="文章を書きはじめる",
    maxWidth="1100px", w="100%", minHeight="65vh",
}: ArticleEditorProps) => {
    const id = "article-editorjs"
    const editorJS = useRef<EditorJS | null>(null);
    useEffect(() => {
        if (editorJS.current === null && defaultValue!=null) {
            editorJS.current = new EditorJS({
                placeholder,
                readOnly: true,
                holder: id,
                data: defaultValue,
                onChange(api: API, event: CustomEvent) {
                    editorJS.current?.save().then((res) => {
                        setValue && setValue(res);
                    });
                },
                onReady() {},
                i18n: i18n,
                tools: EditorTools,
                autofocus: true,
            });
        }
    }, []);
    
    return <Box id={id} minHeight={minHeight} w={w} maxWidth={maxWidth}/>;
};

export default ArticleEditorReadOnly;