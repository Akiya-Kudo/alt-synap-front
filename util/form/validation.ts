import { useFormContext } from "react-hook-form";
import { Tag, TagEditing } from "../../type/global";

export const Validation_username = {
    required: "ユーザネームは必須です | User Name is required",
    maxLength: { value: 50, message: '50文字以下で入力してください | Please make User Name less than 50 words' },
    minLength: { value: 2, message: "2文字以上で入力してください | Please make User Name more than 2 words" }
}

export const Validation_email = {
    required: "メールアドレスは必須です | password required",
    pattern: {
        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "メールアドレス形式で入力してください | email required",
    },
}

export const Validation_password = {
    required: "パスワードは必須です | password required",
    pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,24}$/,
        message: "8文字以上で大文字・小文字アルファベット、数字を含めてください | At least 8 characters, upper & lower case letter & number",
    },
}


export const Validation_password_re = (password: string) => {
    return (
        {
            required: "パスワード確認は必須です | Password confirmation is required",
            validate: (value: any) => {
                return (
                    value === password || "パスワードが一致しません | password do not match"
                );
            }
        }
    )
}

export const Validation_post_title = {
    required: "タイトルは必須です | Title is required",
    maxLength: { value: 100, message: '100文字以下で入力してください | Please make User Name less than 100 words' },
    minLength: { value: 2, message: "2文字以上で入力してください | Please make User Name more than 2 words" },
}

export const Validation_url = {
    pattern: {
        value: /^https?:\/\/[\w!?/+\-_~;.,*&@#$%()'\[\]]+/,
        message: "有効なURLの形式に一致しません"
    }
}

export const Validation_word = (tags: Array<Tag> | Array<TagEditing>) => {
    const tag_names = tags.map((tag)=> tag.tag_name)
    return (
        {
            pattern: {
                value: /^[a-zA-Z0-9\u3040-\u309F\u30A0-\u30FF\uAC00-\uD7A3\u4E00-\u9FFF.]+$/,
                message: "'記号''空白''全角数字' は使用できません。 複合語は単語は続けて入力してください"
            },
            maxLength: { value: 30, message: '30文字以下で入力してください | Please make User Name less than 30 words' },
            minLength: { value: 2, message: "2文字以上で入力してください | Please make User Name more than 2 words" },
            validate: (value: string) => {
                return (
                    !tag_names.includes(value) || "既に追加済みのタグは登録できません"
                );
            },
        }
    )
}

export const Validation_collection_name = {
    required: "名前を入力してください | Name is required",
    maxLength: { value: 50, message: '50文字以下で入力してください | Please make Name less than 50 words' },
    minLength: { value: 2, message: "2文字以上で入力してください | Please make Name more than 2 words" },
}

export const Validation_link_name = {
    required: "名前は必須です | Name is required",
    maxLength: { value: 50, message: '50文字以下で入力してください | Please make Name less than 50 words' },
    minLength: { value: 2, message: "2文字以上で入力してください | Please make Name more than 2 words" },
}

export const Validation_url_required = {
    required: "URLは必須です | URL is required",
    pattern: {
        value: /^https?:\/\/[\w!?/+\-_~;.,*&@#$%()'\[\]]+/,
        message: "有効なURLの形式に一致しません"
    }
}

export const Validation_linkname = {
    required: "名前は必須です | Name is required",
    maxLength: { value: 50, message: '50文字以下で入力してください | Please make Name less than 50 words' },
    minLength: { value: 2, message: "2文字以上で入力してください | Please make Name more than 2 words" }
}

// export const Validation_word = {
//     pattern: {
//         value: /^[a-zA-Z0-9\u3040-\u309F\u30A0-\u30FF\uAC00-\uD7A3\u4E00-\u9FFF.]+$/,
//         message: "記号・空白・全角数字は入力できません。二語以上からなる単語は続けて入力してください"
//     },
//     maxLength: { value: 30, message: '30文字以下で入力してください | Please make User Name less than 30 words' },
//     minLength: { value: 2, message: "2文字以上で入力してください | Please make User Name more than 2 words" },
// }

