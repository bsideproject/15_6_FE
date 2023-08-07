import { deleteUser } from '@/api/login';
import { useState } from 'react';
import { useCookies } from 'react-cookie';

export const useLogIn = () => {
    const tokenKey = 'token';
    const oneMonthInSeconds = 60 * 60 * 24 * 30;
    const defaultPath = '/';
    const [cookies, setCookie, removeCookie] = useCookies([tokenKey]);

    const isLoggedIn = !!cookies.token;
    const [tokenMaxAge, setTokenMaxAge] = useState<number | undefined>(oneMonthInSeconds);

    const logIn = (token: string) => {
        setCookie(tokenKey, token, {
            path: defaultPath,
            maxAge: tokenMaxAge,
        });
    };

    const logOut = () => {
        removeCookie(tokenKey, {
            path: defaultPath,
            maxAge: tokenMaxAge,
        });
    };

    const withdraw = () => {
        return deleteUser().then(() => {
            logOut();
        });
    };

    const setAutoLogin = (isAutoLogin: boolean) => {
        const maxAge = isAutoLogin ? oneMonthInSeconds : undefined;
        setTokenMaxAge(maxAge);
        setCookie(tokenKey, cookies.token, {
            path: defaultPath,
            maxAge: maxAge,
        });
    };

    return {
        isLoggedIn,
        logIn,
        logOut,
        withdraw,
        setAutoLogin,
    };
};
