import { ArticlePostData } from "./page";

export interface ArticlePostFormProps {
    // formRef?: React.RefObject<any>,
    register: any,
    errors: any,
    formState?: any,
    childFormRef:  React.RefObject<any>, 
    handleChange_title: any,
    handleChange_top_link: any,
    stateValue: ArticlePostData,
}