export const routeTitle = [
    { path: '/', en: 'home', ko: '홈', img: false },
    { path: '/nottodo', en: 'LIST', ko: 'LIST', img: true },
    { path: '/nottodo/create', en: 'add', ko: 'add', img: true },
    { path: '/nottodo/edit', en: 'edit', ko: '낫투두 수정', img: false },
    { path: '/profile', en: 'profile', ko: '프로필', img: false },
    { path: '/badge', en: 'badge', ko: '뱃지', img: false },
];

export const headerHiddenPaths = ['login'];
export const headerBackPaths = ['/nottodo/edit'];
export const headerClosePaths = ['/nottodo/create'];
export const bottomNavBarHiddenPaths = ['login', 'signup', '/nottodo/create', '/nottodo/edit'];
