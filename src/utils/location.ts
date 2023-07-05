import { useLocation } from 'react-router-dom';
import {
    headerHiddenPaths,
    bottomNavBarHiddenPaths,
    routeTitle,
    headerBackPaths,
    headerClosePaths,
} from '@/constant/route';

export const useIsBack = () => {
    const location = useLocation();
    return headerBackPaths.some((path) => location.pathname.startsWith(path));
};

export const useIsClose = () => {
    const location = useLocation();
    return headerClosePaths.some((path) => location.pathname.startsWith(path));
};

export const useHasHeader = () => {
    const location = useLocation();
    return !headerHiddenPaths.some((path) => location.pathname.includes(path));
};

export const useHasBottomNavBar = () => {
    const location = useLocation();
    return !bottomNavBarHiddenPaths.some((path) => location.pathname.includes(path));
};

export const useTitle = (lang: 'en' | 'ko'): [string, boolean] => {
    const location = useLocation();

    const result = routeTitle.find((route) => {
        // 예외 사항
        if (location.pathname.startsWith('/nottodo/edit') && route.path === '/nottodo/edit') {
            return route;
        }
        return location.pathname === route.path;
    });

    if (result) {
        if (lang === 'ko') {
            return [result.ko, result.img];
        } else {
            return [result.en, result.img];
        }
    }
    return ['', false];
};
