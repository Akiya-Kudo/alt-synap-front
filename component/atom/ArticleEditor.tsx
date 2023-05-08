import { useEffect, useRef, useState } from "react";
import { ArticleEditorProps } from "../../type/atom";
import { Box } from "@chakra-ui/react";
import EditorJS, { API, OutputData } from "@editorjs/editorjs";
import { EditorTools, i18n } from "../../util/form/editorjs_tools";
// import { EditorTools, i18n } from "@constants/EditorTools";

const ArticleEditor = ({
    defaultValue,
    placeholder="文章を書きはじめる",
    readOnly=false,
    onReady,
    onChange,
    onSave,
}: ArticleEditorProps) => {
    const id = "article-editorjs"
    const editorJS = useRef<EditorJS | null>(null);
    const [currentArticle, setCurrentArticle] = useState<OutputData | null>(null);
    useEffect(() => {
        if (editorJS.current === null) {
            editorJS.current = new EditorJS({
                placeholder,
                readOnly: false,
                holder: id,
                data: defaultValue,
                onChange(api: API, event: CustomEvent) {
                    editorJS.current?.save().then((res) => {
                        setCurrentArticle(res);
                        onSave(res);
                    });
                    onChange(api, event);
                },
                onReady() {
                    onReady();
                },
                i18n: i18n,
                tools: EditorTools,
                autofocus: true,
            });
        }
    }, []);
    useEffect(() => {
        console.log("currentArticle")
        console.log(currentArticle);
    }, [currentArticle]);
    return <Box id={id} minHeight={"65vh"} w={"100%"} maxWidth={"1100px"}/>;
    // return <div id={id}/>;
};

export default ArticleEditor;