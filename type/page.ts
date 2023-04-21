import { OutputData } from "@editorjs/editorjs";

export interface PostData {
    pid?: number,
    pid_uuid?: string,
    uid?: string,
    title?: string,
    top_image?: string,
    top_link?: string,
    content_type?: number,
    likes_num?: number,
    update_time?: Date,
    publish?: boolean,
    deleted?: boolean,
}

export interface ArticlePostData extends PostData{
    content?: OutputData | string | {},
}