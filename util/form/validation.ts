export const Validation_username = {
    required: "this is required to fill",
    maxLength: { value: 50, message: 'Please make User Name less than 50 words' },
    minLength: { value: 2, message: "Please make User Name more than 2 words" }
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
        message: "8文字以上、大文字アルファベット、小文字アルファベット、数字を一文字以上含めてください | At least 8 characters, upper & lower case letter & number",
    },
}
