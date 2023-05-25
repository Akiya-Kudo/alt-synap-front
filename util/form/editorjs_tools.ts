import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Delimiter from "@editorjs/delimiter";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import Code from "@editorjs/code";
import Warning from "@editorjs/warning"
import inlineCode from "@editorjs/inline-code"
import Marker from '@editorjs/marker'
// import { SimpleImage } from "./my-simple-image/my-simple-image.jsx"
// import NestedList from '@editorjs/nested-list';
// import Embed from "@editorjs/embed";
// import LinkTool from "@editorjs/link";
// import Link from "@editorjs/link";
// import ImageTool from "@editorjs/image";
// import { container } from "tsyringe";

// import { fetchRoutes } from "@repositories/EditorRepository";
// import { UploadFileForm } from "@schemas/validations/Editor/uploadFileForm";
// import { UploadUrlForm } from "@schemas/validations/Editor/uploadUrlForm";
// import EditorService from "@services/EditorService/EditorService";

// const editorService = container.resolve(EditorService);
export const EditorTools = {
    header: {
        class: Header,
        inlineToolbar: true,
        shortcut: "CMD+SHIFT+H",
        config: {
            placeholder: "見出し",
            levels: [1, 2, 3, 4, 5, 6],
            defaultLevel: 4,
        },
    },
    list: {
        class: List,
        inlineToolbar: true,
        config: {
            defaultStyle: 'unordered'
        },
        shortcut: "CMD+SHIFT+L",
    },
    quote: {
        class: Quote,
        inlineToolbar: true,
        shortcut: "CMD+SHIFT+O",
        config: {
            quotePlaceholder: "テキストを入力",
            captionPlaceholder: "キャプションを入力",
        },
    },    
    delimiter: {
        class: Delimiter,
        shortcut: "CMD+SHIFT+D",
    },
    table: {
        class: Table,
        inlineToolbar: true,
        shortcut: "CMD+SHIFT+P",
        config: {
            rows: 2,
            cols: 3,
        },
    },
    code: {
        class: Code,
        placeholder: "code",
        shortcut: "CMD+SHIFT+U"
    },
    warning: {
        class: Warning,
        inlineToolbar: true,
        shortcut: 'CMD+SHIFT+W',
        config: {
            titlePlaceholder: '注釈タイトル',
            messagePlaceholder: '説明',
        },

    },
    inlineCode: {
        class: inlineCode,
        shortcut: 'CMD+U',
    },
    marker: {
        class: Marker,
        shortcut: "CMD+M",
    },
    // image: {
    //     class: SimpleImage,
    // }
//   linkTool: {
//     class: LinkTool,
//     config: {
//       endpoint: fetchRoutes.fetchLinkMeta,
//     },
//   },
//   image: {
//     class: ImageTool,
//     config: {
//       uploader: {
//         uploadByFile(file: File) {
//           const form: UploadFileForm = { image: file };
//           return editorService.uploadFile(form).then((res) => res.data);
//         },
//         // only work when url has extensions like .jpg
//         uploadByUrl(url: string) {
//           const form: UploadUrlForm = { url };
//           return editorService.uploadFileByUrl(form);
//         },
//       },
//     },
//   },
    // embed: {
    //     class: Embed,
    //     config: {
    //         services: {
    //             youtube: true,
    //             twitter: true,
    //         },
    //     },
    // },
};

export const i18n = {
    messages: {
        ui: {
            blockTunes: {
                toggler: {
                    "Click to tune": "クリックして調整",
                    "or drag to move": "ドラッグして移動",
                },
                "deleteTune": {
                    "Delete": "削除",
                },
                moveUpTune: {
                    "Move up": "上へ",
                },
                moveDownTune: {
                    "Move down": "下へ",
                },
            },
            inlineToolbar: {
                converter: {
                    "Convert to": "変換",
                },
            },
            toolbar: {
                toolbox: {
                    Add: "追加",
                },
            },
        },
        toolNames: {
            Text: "テキスト",
            Heading: "見出し",
            List: "リスト",
            Quote: "引用",
            Delimiter: "区切り",
            Table: "テーブル",
            Code: "コード",
            Warning: "注釈",
            InlineCode: "インライン・コード",
            Italic: "斜体",
            Bold: "太字",
            Marker: "マーカー",
            Link: "リンク",
            // Image: "画像",
        },
        tools: {
            "header": {
                "Heading 1": "大きさ 1 ",
                "Heading 2": "大きさ 2 ",
                "Heading 3": "大きさ 3 ",
                "Heading 4": "大きさ 4 ",
                "Heading 5": "大きさ 5 ",
                "Heading 6": "大きさ 6 ",
            },
            "list": {
                "Unordered": "箇条書きリスト",
                "Ordered": "ナンバーリスト"
            },
            "quote": {
                "Align Left": "左寄せ",
                "Align Center": "中央寄せ"
            },
            "table": {
                "With headings": "タイトル付きテーブル",
                "Without headings": "タイトルなしテーブル",
                "Add row above": "上に行を追加する",
                "Add row below": "下に行を追加する",
                "Delete row": "行を削除する",
                "Add column to left": "左に列を追加する",
                "Add column to right": "右に列を追加する",
                "Delete column": "列を削除する",
            }
        },
        blockTunes: {
            "delete": {
                "Delete": "削除",
                "Click to delete": "完全に削除"
            },
            "moveUp": {
                "Move up": "上に移動する"
            },
            "moveDown": {
                "Move down": "下に移動する"
            }

        }
    },
};
