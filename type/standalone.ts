import { ArticlePostData } from "./page";

export interface ArticlePostFormProps {
    // formRef?: React.RefObject<any>,
    register: any,
    errors: any,
    formState?: any,
    stateValue: ArticlePostData,
    setStateValue: React.Dispatch<React.SetStateAction<ArticlePostData>>, 
}