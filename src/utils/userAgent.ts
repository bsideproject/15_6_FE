export enum OSType {
    ANDROID = 'Android',
    IOS = 'iOS',
    UNKNOWN = 'Unknown',
}

export const getUserOS = (): OSType => {
    const userAgent = navigator.userAgent;

    if (/android/i.test(userAgent)) {
        return OSType.ANDROID;
    } else if (/iPad|iPhone|iPod/.test(userAgent)) {
        return OSType.IOS;
    } else {
        return OSType.UNKNOWN;
    }
};
