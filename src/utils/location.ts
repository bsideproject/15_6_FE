import { useLocation } from 'react-router-dom';

export const useIsBack = () => {
    const location = useLocation();
    const isBack = location.pathname.split('/').length > 2;
    return isBack;
};

export const useIsLayout = () => {
    const location = useLocation();
    const expectList = ['login', 'register'];
    const isLayout = expectList.some((path) => !location.pathname.includes(path));

    return isLayout;
};
