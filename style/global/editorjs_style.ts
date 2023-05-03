export const editorjs_styles = {
    // Editor-jsのeditor全体スタイリング ・　ArticleEditorの親コンポーネントのsizeにより完全に影響を受ける
    ".codex-editor": {
        margin: "30px 70px",
    },
    ".ce-block__content": {
        margin: 0,
        maxWidth: "890px"
    },
    ".ce-toolbar__content": {
        margin: "3px 0px",
    },
    //editor要素の装飾
    ".ce-block--selected .ce-block__content": { // ce-toolbar__settings-btn押しているときのそのboxのスタイル
        bg: "bg_selection",
        color: "text_normal",
        borderRadius: 5,
        my: "2px",

    },
    ".tc-wrap .tc-table": {  //tableのborder の color-mode実装 と table　toolberのスタイル
        borderTop: "1.5px solid",
        borderColor: "bg_transparent_reverse_deep",
    },
    ".tc-wrap .tc-table .tc-row": {
        borderBottom: "1.5px solid",
        borderColor: "bg_transparent_reverse_deep",
    },
    ".tc-wrap .tc-table .tc-row--selected": {
        bg: "bg_transparent_reverse"
    },
    ".tc-wrap .tc-table .tc-row .tc-cell": {
        borderRight: "1.5px solid",
        borderColor: "bg_transparent_reverse_deep",
    },
    ".tc-wrap .tc-table .tc-row .tc-cell--selected": {
        bg: "bg_transparent_reverse"
    },
    ".tc-wrap .tc-table .tc-row::after": {
        borderBottom: "1.5px solid",
        borderColor: "bg_transparent_reverse_deep",
    },
    ".tc-wrap .tc-row--selected:after": {
        bg: "bg_transparent_reverse"
    },

    ".tc-toolbox":{},
    ".tc-toolbox .tc-toolbox__toggler":{
        color: "text_normal",
        border: "1px solid",
        borderColor: "text_normal",
        w: 4,
        h: 4,
        m: 1,
        borderRadius: 5,
        _hover: {
            bg: "text_normal",
            color: "bg_switch",
            border: 0,
        }
    },
    ".tc-toolbox__toggler svg rect":{
        fill: "transparent",
    },
    ".tc-toolbox .tc-popover":{
        bg: "mock_glass_bg_switch",
        border: 0,
    },
    ".tc-popover__item":{},
    ".tc-popover__item .tc-popover__item-icon":{
        bg: "transparent",
        color: "text_normal",
        border: "1px solid",
        borderColor: "text_normal"
    },
    ".tc-popover__item-label":{},
    ".tc-wrap .tc-add-column": {
        _hover: {
            bg: "bg_transparent_reverse"
        },
        borderTop: "1.5px solid",
        borderColor: "bg_transparent_reverse_deep",
        color: "text_light",
    },
    ".tc-wrap .tc-add-row": {
        _hover: {
            bg: "bg_transparent_reverse"
        },
        color: "text_light"
    },
    ".tc-wrap .tc-add-row:hover:before": {
        bg: "bg_transparent_reverse"
    },

    "mark.cdx-marker": { // markerの装飾
        background: "bg_marked",
        color: "text_normal"
    },
    
    //editorjs::toolber装飾
    ".ce-toolbar__actions": {},
    ".ce-toolbar__plus": {
        color: "text_light"
    },
    ".ce-toolbar__settings-btn": {
        color: "text_light"
    },

    //toolbar popover
    ".ce-popover": {
        bg: "mock_glass_bg_switch",
        border: 0,
    },
    ".cdx-search-field": {
        bg: "bg_transparent_reverse_light",
    },
    ".cdx-search-field__icon svg": {
        color: "text_light"
    },
    ".cdx-search-field__input": {
        color: "text_normal",
        _placeholder: {color: "text_light"}
    },
    ".ce-popover__items": {},
    ".ce-popover__item": {},
    ".ce-popover__item-icon": {
        bg: "transparent",
        color: "text_normal",
    },
    ".ce-popover__item-label": {},
    ".ce-popover__item-secondary-label": {
        color: "text_normal"
    },
    ".ce-popover__no-found": {
        color: "text_light"
    },
    //editorjs::inline-toolbar装飾
    ".ce-inline-toolbar": {
        bg: "mock_glass_bg_switch",
        border: 0,
    },
    ".ce-inline-toolbar__toggler-and-button-wrapper": {},
    //inline 左要素
    ".ce-inline-toolbar__dropdown": {
        _hover:{
            bg: "bg_transparent_reverse",
            borderLeftRadius: 5,
        },
    },
    ".ce-inline-toolbar__dropdown-content": {
    },
    ".ce-inline-toolbar__dropdown-arrow": {},
    //inline 右要素
    ".ce-inline-toolbar__buttons": {},
    //inline-tools-リンク入力
    ".ce-inline-toolbar__actions": {
        borderBottomRadius: 5,
    },
    ".ce-inline-tool-input": {
        borderBottomRadius: 5,
        bg: "bg_transparent_reverse_light",
        color: "text_normal",
        _placeholder: {color: "text_light"}
    },
    //inline-tools-ブロック変換セレクト
    ".ce-conversion-toolbar": {
        bg: "mock_glass_bg_switch",
        border: 0,
    },
    ".ce-conversion-toolbar__label": {
        color: "text_normal",
    },
    ".ce-conversion-toolbar__tools": {},
    ".ce-conversion-tool": {},
    ".ce-conversion-tool__icon": {
        bg: "mock_glass_bg_switch",
    },
}