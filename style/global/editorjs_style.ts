export const editorjs_styles = {
// Editorの全体レイアウト
//親コンポーネント(ArticleEditor)のsizeにより完全に影響を受ける
    ".codex-editor": {
        margin: "10px 15px",
        fontSize: "1rem",
        "@media (min-width: 480px)": {
            margin: "20px 30px",
        },
        "@media (min-width: 1200px)": {
            margin: "20px 70px",
        },
    },
    ".ce-block__content": {
        margin: 0,
        maxWidth: "890px"
    },
    ".ce-toolbar__content": {
        margin: "3px 0px",
    },



//tools要素の装飾
    //table
    //テーブルbox
    ".tc-wrap .tc-table": {
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
    //table row&column-add hover
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
    //table seting button
    ".tc-toolbox":{},
    ".tc-toolbox .tc-toolbox__toggler":{
        color: "text_normal",
        // border: "1px solid",
        // borderColor: "text_normal",
        border: "0px",
        w: 4,
        h: 4,
        m: 1,
        borderRadius: 5,
        _hover: {
            bg: "bg_transparent_reverse_light",
            color: "text_normal",
            border: 0,
        }
    },
    ".tc-toolbox__toggler svg rect":{
        fill: "transparent",
    },
    //table popover
    ".tc-toolbox .tc-popover":{
        bg: "mock_glass_bg_switch",
        border: 0,
    },
    ".tc-popover__item":{},
    ".tc-popover .tc-popover__item:hover": {
        background: "bg_editorjs_menu_hover"
    },
    ".tc-popover__item .tc-popover__item-icon":{
        bg: "transparent",
        color: "text_normal",
        border: "1px solid",
        borderColor: "text_normal"
    },
    ".tc-popover__item-label":{},

    //code
    ".ce-code": {
    },
    ".ce-code .ce-code__textarea": {
        minHeight: "60px",
        height: "200px",
        bg: "mock_glass_bg_switch",
        border: "0px solid",
        borderRadius: 10,
        color: "text_normal",
        fontSize: "15px"
    },

    //warning
    ".cdx-warning": {
    },
    "div.cdx-warning::before": {
        top: "13px",
        backgroundImage: `url('data:image/svg+xml;charset=utf8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="lightcoral"%3E%3Cpath d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" /%3E%3C/svg%3E')`
    },
    ".cdx-warning__title": {
        fontWeight: "bold"
    },
    ".cdx-warning__message": {
        fontSize: "0.9em"
    },

    //inline-code
    "code.inline-code": {
        bg: "mock_glass_bg_switch",
        color: "red_switch"
    },

    // marker
    "mark.cdx-marker": {
        background: "bg_marked",
        color: "text_normal"
    },



//toolber
    ".ce-toolbar__actions": {},
    ".ce-toolbar__plus": {
        color: "text_light",
        "@media screen and (max-width: 650px)": {
            bg: "bg_editorjs_button",
            color: "text_normal",
            border: "0px",
        }
    },
    ".ce-toolbar__plus:hover": {
        bg: "bg_transparent_reverse_light",
        "@media screen and (max-width: 650px)": {
            bg: "mock_glass_bg_switch",
        }
    },
    ".ce-toolbar__settings-btn": {
        color: "text_light",
        "@media screen and (max-width: 650px)": {
            bg: "bg_editorjs_button",
            color: "text_normal",
            border: "0px",
        }
    },
    ".ce-toolbar__settings-btn:hover": {
        bg: "bg_transparent_reverse_light",
        "@media screen and (max-width: 650px)": {
            bg: "mock_glass_bg_switch",
        }
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
    ".ce-popover__items .ce-popover__item:hover": {
        background: "bg_editorjs_menu_hover"
    },
    ".ce-popover__items .ce-popover__item--active": {
        background: "bg_editorjs_menu_hover",
        color: "text_normal"
    },
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

//inline-toolbar
    ".ce-inline-toolbar": {
        bg: "mock_glass_bg_switch",
        border: 0,
    },
    ".ce-inline-toolbar__toggler-and-button-wrapper": {},
    //inline-toolbar left-content
    ".ce-inline-toolbar__dropdown": {
        _hover:{
            bg: "bg_transparent_reverse",
            borderLeftRadius: 5,
        },
    },
    ".ce-inline-toolbar__dropdown-content": {
    },
    ".ce-inline-toolbar__dropdown-arrow": {},
    //inline-toolbar right-content
    ".ce-inline-toolbar__buttons": {},
    ".ce-inline-tool:hover": {
        bg: "bg_editorjs_menu_hover"
    },
    //inline-toolbar link-input
    ".ce-inline-toolbar__actions": {
        borderBottomRadius: 5,
    },
    ".ce-inline-tool-input": {
        borderBottomRadius: 5,
        bg: "bg_transparent_reverse_light",
        color: "text_normal",
        _placeholder: {color: "text_light"}
    },
    //inline-toolbar drop-down
    ".ce-inline-toolbar__dropdown:hover": {
        bg: "bg_editorjs_menu_hover"
    },
    ".ce-conversion-toolbar": {
        bg: "mock_glass_bg_switch",
        border: 0,
    },
    ".ce-conversion-toolbar__label": {
        color: "text_normal",
    },
    ".ce-conversion-toolbar__tools": {},
    ".ce-conversion-tool:hover": {
        bg: "bg_editorjs_menu_hover",
    },
    ".ce-conversion-tool__icon": {
        bg: "transparent",
    },

// setting選択時のboxのselectedのスタイル
    ".ce-block--selected .ce-block__content": {
        bg: "bg_selection",
        color: "text_normal",
        borderRadius: 5,
        my: "2px",
    },
}