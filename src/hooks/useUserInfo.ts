import { getUserInfo } from '@/api/login';
import { userInfoState, userInfoType } from '@/recoil/user/atom';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useLogIn } from './useLogin';

export const useUserInfo = () => {
    const { isLoggedIn, logOut, setAutoLogin } = useLogIn();
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);

    useEffect(() => {
        if (isLoggedIn && !userInfo) {
            getUserInfo()
                .then((data) => {
                    setUserInfo({
                        email: data.loginId,
                        nickName: data.nickname,
                        profileImgUrl: data.profileImgUrl,
                        isAgreed: data.tosYn,
                        isAutoLogin: data.autoLoginYn,
                    });
                    setAutoLogin(data.autoLoginYn);
                })
                .catch((e) => {
                    console.log('사용자 정보 조회 실패', e);
                    logOut();
                });
        }
    }, [isLoggedIn, userInfo]);

    function updateUserInfo<K extends keyof userInfoType>(key: K, value: userInfoType[K]) {
        setUserInfo((userInfo) => {
            if (!userInfo) return userInfo;

            return {
                ...(userInfo as userInfoType),
                [key]: value,
            };
        });
    }

    const updateAutoLogin = (isAutoLogin: boolean) => {
        updateUserInfo('isAutoLogin', isAutoLogin);
        setAutoLogin(isAutoLogin);
    };

    return {
        updateAutoLogin,
        updateUserInfo,
        userInfo,
    };
};
