export const routeTitle = [
    { path: '/', en: 'home', ko: '홈', img: false },
    { path: '/nottodo', en: 'LIST', ko: 'LIST', img: true },
    { path: '/nottodo/create', en: 'add', ko: 'add', img: true },
    { path: '/nottodo/edit', en: 'edit', ko: '낫투두 수정', img: false },
    { path: '/profile', en: 'profile', ko: '프로필', img: false },
    { path: '/profile/edit', en: 'profile edit', ko: '내 정보 수정', img: false },
    { path: '/profile/alarm', en: 'Alarm', ko: '알림 설정', img: false },
    { path: '/profile/notice', en: 'Notice', ko: '공지사항', img: false },
    { path: '/profile/policy', en: 'Policy', ko: '개인정보 처리방침', img: false },
    { path: '/profile/terms', en: 'Terms', ko: '서비스 이용약관', img: false },
    { path: '/profile/contact', en: 'Contact Us', ko: '문의/건의하기', img: false },
    { path: '/badge', en: 'badge', ko: '뱃지', img: false },
];
export const completeJson = {
    path: '/nottodo/edit/state',
    en: 'complete',
    ko: '종료된 낫투두',
    img: false,
};

export const headerHiddenPaths = ['/login', '/profile', '/'];
export const headerBackPaths = [
    '/nottodo/edit',
    '/profile/edit',
    '/profile/alarm',
    '/profile/contact',
    '/profile/terms',
    '/profile/policy',
    '/profile/notice',
];
export const headerClosePaths = ['/nottodo/create'];
export const bottomNavBarHiddenPaths = ['login', 'agreement', '/nottodo/create', '/nottodo/edit'];
