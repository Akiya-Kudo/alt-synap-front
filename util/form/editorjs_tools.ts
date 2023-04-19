import Header from '@editorjs/header';
import List from '@editorjs/list'; 
import Paragraph from '@editorjs/paragraph'; 

const EDITOR_JS_TOOLS = {
    // NOTE: Paragraph is default tool. Declare only when you want to change paragraph option.
    list: List,
    header: Header,
}

export default EDITOR_JS_TOOLS;