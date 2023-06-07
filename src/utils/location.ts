import { useLocation } from 'react-router-dom';
import { layoutHiddenPaths, routeTitle } from '@/constant/route';

export const useIsBack = () => {
    const location = useLocation();
    const isBack = location.pathname.split('/').length > 2;
    return isBack;
};

export const useIsLayout = () => {
    const location = useLocation();
    return !layoutHiddenPaths.some((path) => location.pathname.includes(path));
};

export const useTitle = (lang: 'en' | 'ko') => {
    const location = useLocation();
    const result = routeTitle.find((route) => route.path === location.pathname);
    if (result) {
        if (lang === 'ko') {
            return result.ko;
        } else {
            return result.en;
        }
    }
    return '';
};
