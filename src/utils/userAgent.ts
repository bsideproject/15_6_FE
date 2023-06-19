export const getUserOS = (): 'Android' | 'iOS' | 'Unknown' => {
    const userAgent = navigator.userAgent;

    if (/android/i.test(userAgent)) {
        return 'Android';
    } else if (/iPad|iPhone|iPod/.test(userAgent)) {
        return 'iOS';
    } else {
        return 'Unknown';
    }
};
