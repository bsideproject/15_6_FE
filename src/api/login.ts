import { post, put } from './core';

export type LoginType = 'google' | 'apple' | 'kakao';

export const postLogin = (type: LoginType, data: { code: string }) => {
    return post(`/login/auth/${type}-callback`, data);
};

export const putAgreement = () => {
    return put('/login/tos');
};

export const getUserInfo = () => {
    return post('/user/info');
};
