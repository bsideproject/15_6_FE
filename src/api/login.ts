import { post, put, get, deleteApi } from './core';

export type LoginType = 'google' | 'apple' | 'kakao';

export const postLogin = (type: LoginType, data: { code: string; redirectUri: string }) => {
    return post(`/login/auth/${type}-callback`, data);
};

export const putAgreement = () => {
    return put('/login/tos');
};

export const getUserInfo = () => {
    return get('/user/info');
};

export const deleteUser = () => {
    return deleteApi('/user');
};

export const putNickname = (nickname: string) => {
    return put(`/user/nickname?nickname=${nickname}`);
};

export const putAutoLogin = (yn: boolean) => {
    return put(`/login/auto-login?yn=${yn}`);
};
