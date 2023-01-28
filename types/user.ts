// export interface Inputs {
//     email: string;
//     password: string;
// }

export type User = {
    firebase_id: string;
    user_name: string;
    photo_url: string;
    comment: string;
    pinterest_user_id: string;
}

export type userStateType = 'isUser' | 'guest' | 'loading';