export const setCookie = (key: string, value: string, expireTime?: Date) => {
    let expires = '';

    if (expireTime) {
        expires = `; expires=${expireTime.toUTCString()}`;
    }
    document.cookie = `${key}=${value}${expires}`;
};

export const getCookie = (key: string) => {
    return document.cookie
        .split('; ')
        .find((row) => row.startsWith(key))
        ?.split('=')[1];
};
