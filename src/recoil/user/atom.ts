import { atom, selector } from 'recoil';

export type userInfoType = {
    nickName: string;
    email: string;
    profileImgUrl: string;
    tosYn: 'Y' | 'N';
};

export const userInfoState = atom<userInfoType | null>({
    key: 'userInfo',
    default: null,
});

export const userAgreedState = selector({
    key: 'userAgreed',
    get: ({ get }) => {
        const userInfo = get(userInfoState);
        return userInfo?.tosYn === 'Y';
    },
});
