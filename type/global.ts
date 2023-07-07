import { OutputData } from "@editorjs/editorjs";

export type UserStateStringType = 'isUser' | 'guest' | 'loading' | undefined; 

export interface User {
    uid?: string | null | undefined,
    uuid_uid?: string,
    comment?: string,
    lang_type?: number,
    follewer_num?: number,
    follewee_num?: number,
    user_name?: string,
    user_image?: string,
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
    tid: number,
    tag_name: string,
    tag_content_num?: number,
    display_name: string,
    tag_image?: string
}

export interface TagEditing {
    tid?: number,
    tag_name: string,
    tag_content_num?: number,
    display_name?: string,
    tag_image?: string
}

export interface Like  {
    uuid_uid?: string,
    uuid_pid?: string,
    timestamp?: Date,
}

export interface Post {
    uuid_pid?: string | null,
    uuid_uid?: string,
    title?: string,
    top_image?: null | string,
    top_link?: null | string,
    content_type?: number,
    likes_num?: number,
    deleted?: boolean,
    publish?: boolean,
    timestamp?: Date,
}
export interface Post_with_imageFile {
    top_image_file?: any
}

export interface PostCard extends Post {
    uuid_pid: string,
    uuid_uid: string,
    title: string,
    top_link: string,
    top_image?: string,
    likes_num: number,
    timestamp: Date,
    content_type: number,
    user: User,
    tags: Tag[]
}

export interface EditingPostType extends Post {
    uuid_pid?: string,
    title: string,
    top_image: null | string, 
    top_link: null | string,
    content_type: number,
    likes_num?: number,
    update_time?: Date,
    publish?: boolean,
    deleted?: boolean,
    tags: Tag[] | TagEditing[] 
    top_image_file: File | null | "DELETE",
}
export interface ArticlePostData extends EditingPostType {
    articleContent: {
        content: OutputData,
    },

}
export interface SourcePostrData extends EditingPostType {
    sourceContent?: SourceContent,
}
