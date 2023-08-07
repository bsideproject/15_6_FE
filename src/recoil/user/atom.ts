import { atom, selector } from 'recoil';

export type userInfoType = {
    nickName: string;
    email: string;
    profileImgUrl: string;
    isAgreed: boolean;
    isAutoLogin: boolean;
};

export const userInfoState = atom<userInfoType | null>({
    key: 'userInfo',
    default: null,
});

export const userAgreedState = selector({
    key: 'userAgreed',
    get: ({ get }) => {
        const userInfo = get(userInfoState);
        return userInfo?.isAgreed;
    },
});
