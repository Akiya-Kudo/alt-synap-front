import { ArticlePostData } from "./global";

export interface ArticlePostFormProps {
    // formRef?: React.RefObject<any>,
    register: any,
    errors: any,
    formState?: any,
    stateValue: ArticlePostData,
    setStateValue: React.Dispatch<React.SetStateAction<ArticlePostData>>, 
}

export enum LinkGenre {
    SearchEngine,
    Shopping,
    Media,
    Sns,
    Engineering,
    Other

}

export const LinkGenreNames = {
    [LinkGenre.SearchEngine]: '検索エンジン',
    [LinkGenre.Shopping]: 'ショッピング',
    [LinkGenre.Media]: 'メディア',
    [LinkGenre.Sns]: 'SNS',
    [LinkGenre.Engineering]: 'エンジニアリング',
    [LinkGenre.Other]: 'その他'
};