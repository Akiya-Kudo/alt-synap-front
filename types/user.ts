// export interface Inputs {
//     email: string;
//     password: string;
// }

export type User = {
    firebase_id: string;
    user_name: string;
    photo_url: string;
    comment: string;
    followee_num: number;
    follower_num: number;
}

export type UserStateType = 'isUser' | 'guest' | 'loading';