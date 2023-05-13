import { OutputData } from "@editorjs/editorjs";
export interface EditingPostType {
    pid?: number,
    pid_uuid?: string,
    uid?: string,
    title?: string,
    top_image_file?: any,
    top_link?: string,
    content_type?: number,
    likes_num?: number,
    update_time?: Date,
    publish?: boolean,
    deleted?: boolean,
    tags: Array<string>,
}

export interface ArticlePostData extends EditingPostType{
    content: OutputData,
}