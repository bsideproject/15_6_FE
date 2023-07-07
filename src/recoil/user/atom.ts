import { atom } from 'recoil';

export type userInfoType = {
    nickName: string;
    email: string;
} | null;

export const userInfoState = atom<userInfoType>({
    key: 'userInfo',
    default: null,
});

// 사용자 이용약관 동의 여부
export const userAgreedState = atom<boolean>({
    key: 'userAgreed',
    default: true,
});
