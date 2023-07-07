// import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

export const useLogIn = () => {
    const tokenKey = 'token';
    const oneMonthInSeconds = 60 * 60 * 24 * 30;
    const defaultPath = '/';
    const [cookies, setCookie, removeCookie] = useCookies([tokenKey]);

    const isLoggedIn = !!cookies.token;

    const logIn = (token: string) => {
        setCookie(tokenKey, token, {
            path: defaultPath,
            maxAge: oneMonthInSeconds,
        });
    };

    const logOut = () => {
        removeCookie(tokenKey, {
            path: defaultPath,
            maxAge: oneMonthInSeconds,
        });
    };

    const withdraw = () => {
        // 탈퇴 api 호출
        // then
        logOut();
    };

    return { isLoggedIn, logIn, logOut, withdraw };
};
