export type PostProcessType = "postTypeSelect" | "postTopForm" | "contentForm"
export type PostTopInfoType = {
    title: string,
    topLink: string,
    topImage: any,
    isShowLink: boolean,
    isShowImage: boolean,
}
export type PostType = "blog" | "slide" | "linkOnly" | null