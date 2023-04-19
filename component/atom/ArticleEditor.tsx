import { useEffect, useRef, useState } from "react";
import EditorJS, { API, OutputData } from "@editorjs/editorjs";
import { ArticleEditorProps } from "../../type/atom";
// import { EditorTools, i18n } from "@constants/EditorTools";

const ArticleEditor = ({
    defaultValue,
    placeholder="aaaaaa",
    readOnly=false,
    onReady,
    onChange,
    onSave,
}: ArticleEditorProps) => {
    const id = "editorjs-article-editor"
    const editorJS = useRef<EditorJS | null>(null);
    const [currentArticle, setCurrentArticle] = useState<OutputData | null>(null);
    useEffect(() => {
        if (editorJS.current === null) {
            editorJS.current = new EditorJS({
                placeholder,
                readOnly,
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
                // i18n,
                // tools: EditorTools,
            });
        }
    }, []);
    useEffect(() => {
        console.log("currentArticleが行きます")
        console.log(currentArticle);
    }, [currentArticle]);
    return <div id={id}/>;
};

export default ArticleEditor;