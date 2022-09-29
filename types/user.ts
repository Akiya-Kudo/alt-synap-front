
// export interface Inputs {
//     email: string;
//     password: string;
// }

export type User = {
    id: string;
    // name: string;
    // photoURL: string;
    email: string;
    // createdAt: number;
};

export type userStateType = 'isUser' | 'guest' | 'loading';