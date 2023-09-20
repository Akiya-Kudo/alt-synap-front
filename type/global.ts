import { OutputData } from "@editorjs/editorjs";

export type UserStateStringType = 'isUser' | 'guest' | 'loading' | undefined; 

export type LinkDisplaySwitchType = "公開中" | "履歴" | "作成済み"

export interface User {
    uid?: string | null | undefined,
    uuid_uid?: string,
    comment?: string,
    lang_type?: number,
    follower_num?: number,
    followee_num?: number,
    user_name?: string,
    user_image?: string,
    top_collection?: number,
    links?: Link[],
    collections?: Collection[],
    follows_follows_followee_uuidTousers?: Follow[],
    follows_follows_follower_uuidTousers?: Follow[],
    folders?: Folder[],
    user_tags?: UserTag[]
}

export interface EditingUser {
    uuid_uid?: string,
    user_name?: string,
    user_image?: string,
    comment?: string,
    image_file?: File ,
    new_image_url?: string, 
}

export interface Follow {
    follower_uuid: string,
    followee_uuid: string,
    users_follows_followee_uuidTousers?: User,
    users_follows_follower_uuidTousers?: User
}

export interface Link {
    lid: number,
    uuid_uid: string,
    link_name: string,
    image_path: string,
    explanation: string,
    url_scheme: string,
    query: string,
    joint: string,
    other_queries: string,
    genre: 0 | 1 | 2 | 3 | 4 | 5,
    is_path_search: boolean,
    publish: boolean,
    timestamp: Date,
    users?: User,
    link_collections?: LinkCollection[],
}

export interface Collection {
    cid: number,
    uuid_uid?: string,
    collection_name: string,
    deleted?: boolean,
    users?: User,
    link_collections?: LinkCollection[],
}

export interface LinkCollection {
    lid: number, 
    cid: number,
    uuid_uid?: string,
    deleted?: boolean,
    users?: User,
    links: Link,
    collections?: Collection
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
    tags?: Tag,
    posts?: Post
}

export interface Tag {
    tid: number,
    tag_name?: string,
    tag_content_num?: number,
    display_name: string,
    tag_image?: string,
    post_tags?: PostTag[],
    user_tags?: UserTag[]
}

export interface TagEditing {
    tid?: number,
    tag_name: string,
    tag_content_num?: number,
    display_name?: string,
    tag_image?: string
}

export interface Like  {
    uuid_uid: string,
    uuid_pid: string,
    timestamp?: Date,
}

export interface Folder {
    fid: number,
    title: string,
    top_image?: string,
    timestamp?: Date,
    uuid_uid?: string,
    folder_posts?: FolderPost,
    users?: User
}

export interface EditingFolder {
    fid?: number,
    title?: string,
    top_image?: string,
    image_file?: File ,
    new_image_url?: string, 
}

export interface FolderPost {
    fid: number,
    uuid_pid: string,
    uuid_uid: string,
    timestamp?: Date,
    folders?: Folder,
    posts?:Post,
}

export interface UserTag {
    uuid_uid: string,
    tid: number,
    timestamp?: Date,
    tags?: Tag,
    users?: User
}

export interface Post {
    uuid_pid: string,
    uuid_uid: string,
    title: string,
    top_image?: string,
    top_link?: string,
    content_type: number,
    likes_num: number,
    deleted: boolean,
    publish: boolean,
    timestamp: Date,
    users: User,
    post_tags: PostTag[],
    likes: Like[],
    folder_posts?: FolderPost[]
}
export interface ArticlePost extends Post {
    article_contents: {
        uuid_pid: string,
        content: OutputData,
    },
}
export interface Post_with_imageFile {
    top_image_file?: any
}

export interface EditingPostType {
    uuid_pid?: string,
    title: string,
    top_image: null | string, 
    top_link: null | string,
    content_type: number,
    likes_num?: number,
    update_time?: Date,
    publish: boolean,
    deleted?: boolean,
    tags: Tag[] | TagEditing[] 
    top_image_file: File | null | "DELETE",
}
export interface ArticlePostData extends EditingPostType {
    articleContent: {
        content: OutputData,
    },
}
export interface LinkPostData extends EditingPostType {
    top_image: never, 
    top_link: string,
    publish: boolean,
    deleted?: boolean,
    tags: never, 
    top_image_file: never,
}

export type SortType = "人気順" | "新着順"

export interface EditingLinkType {
    url_all: string,
    link_name: string,
    image_path: string,
    explanation: string,
    url_scheme: string,
    query: string | null,
    joint: string,
    other_queries: string | null,
    other_queries_array: string[] | null,
    genre: 0 | 1 | 2 | 3 | 4 | 5,
    is_path_search: boolean,
    publish: boolean,
}
export interface PostRef {
    __ref: string
}
export interface FolderPostRef {
    __ref: string
}