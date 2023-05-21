import { OutputData } from "@editorjs/editorjs";

export type UserStateStringType = 'isUser' | 'guest' | 'loading' | undefined; 

export interface User {
    uid?: string,
    uuid_uid?: string,
    comment?: string,
    lang_type?: number,
    follewer_num?: number,
    follewee_num?: number,
}

export interface Post {
    uuid_pid?: string,
    uuid_uid?: string,
    title?: string,
    top_image?: string,
    top_link?: string,
    content_type?: number,
    likes_num?: number,
    deleted?: boolean,
    publish?: boolean,
    timestamp?: Date,
}

export interface ArticleContent {
    uuid_pid?: string,
    content?: OutputData,
}

export interface SourceContent {
    uuid_pid?: string,
    source_type?: number,
    source_link?: string,
    desctiption?: OutputData,
}

export interface PostTag {
    tid?: number,
    uuid_pid?: string,
    timestamp?: Date,
}

export interface Tag {
    tid?: number,
    tag_name?: string,
    tag_content_num?: number,
}

export interface Like  {
    uuid_uid?: string,
    uuid_pid?: string,
    timestamp?: Date,
}

// export type EditingPostType {

// }

export interface EditingPostType {
    uuid_pid: string,
    uuid_uid?: string,
    title?: string,
    top_image_file?: any,
    top_image?: null | string, 
    top_link?: null | string,
    content_type?: number,
    likes_num?: number,
    update_time?: Date,
    publish?: boolean,
    deleted?: boolean,
    tag_names: Array<string>,
}

export interface ArticlePostData extends EditingPostType{
    content: OutputData,
}