export const getCookie = (key: string) => {
    return document.cookie
        .split('; ')
        .find((cookieString) => cookieString.startsWith(key))
        ?.split('=')[1];
};
