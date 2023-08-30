import { Link as LinkType } from '../../type/global';

export const useLinkSearch = (link: LinkType, saerch_text: string) => {
    const joined_words = saerch_text.toLowerCase().replace(/　/g, ' ').replace(' ', link.joint)
    let link_path = link.url_scheme
    if (link.is_path_search) {
        link_path = link_path + "/" + joined_words 
        if (link.other_queries) link_path = link_path + "?" + link.other_queries 
    } else {
        link_path = link_path + "?" + link.query + "=" + joined_words
        if (link.other_queries) link_path = link_path + "&" + link.other_queries
    }

    window.open(link_path, '_blank'); // 新しいタブでリンクを開く
}