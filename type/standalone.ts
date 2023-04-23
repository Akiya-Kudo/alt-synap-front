import { ArticlePostData } from "./page";

export interface ArticlePostFormProps {
    // formRef?: React.RefObject<any>,
    register: any,
    errors: any,
    formState?: any,
    stateValue: ArticlePostData,
    handleChange_title: any,
    handleChange_top_link: any,
    handleChange_top_image: any,
}