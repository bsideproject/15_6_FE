import { BottomNavbar } from './BottomNavbar';
import { useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as HomeOutline } from '@/assets/img/icn_home_outline.svg';
import { ReactComponent as ListOutline } from '@/assets/img/icn_list_outline.svg';
import { ReactComponent as BadgeOutline } from '@/assets/img/icn_badge_outline.svg';
import { ReactComponent as UserOutline } from '@/assets/img/icn_user_outline.svg';
import { ReactComponent as HomeSolid } from '@/assets/img/icn_home_solid.svg';
import { ReactComponent as ListSolid } from '@/assets/img/icn_list_solid.svg';
import { ReactComponent as BadgeSolid } from '@/assets/img/icn_badge_solid.svg';
import { ReactComponent as UserSolid } from '@/assets/img/icn_user_solid.svg';
import { ReactComponent as ArrowBack } from '@/assets/img/icn_back.svg';
import { ReactComponent as Close } from '@/assets/img/icn_close.svg';

import { Header } from '@/components/layout/Header';
import { ConfirmPopup } from '@/components/popup/PopupGroup';
import { useIsBack, useHasBottomNavBar, useHasHeader, useTitle, useIsClose } from '@/utils/location';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userAgreedState, userInfoState } from '@/recoil/user/atom';
import { useEffect } from 'react';
import { getUserInfo } from '@/api/login';
import { useLogIn } from '@/hooks/useLogin';

type DefaultLayoutProp = {
    children: React.ReactNode;
};

export default function DefaultLayout({ children }: DefaultLayoutProp) {
    const router = useNavigate();
    const hasHeader = useHasHeader();
    const hasBottomNavBar = useHasBottomNavBar();
    const [title, isImg] = useTitle('ko');
    const location = useLocation();
    const isBack = useIsBack();
    const isClose = useIsClose();

    const [isCreatePopup, setIsCreatePopup] = useState<boolean>(false);
    const [isEditPopup, setIsEditPopup] = useState<boolean>(false);

    const navCount = 4;

    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const userAgreed = useRecoilValue(userAgreedState);
    const navigate = useNavigate();
    const { isLoggedIn, logOut } = useLogIn();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        } else if (isLoggedIn && !userInfo) {
            getUserInfo()
                .then((data) => {
                    setUserInfo({
                        email: data.email,
                        nickName: data.nickname,
                        tosYn: data.tosYn,
                    });
                })
                .catch((e) => {
                    console.log('사용자 정보 조회 실패', e);
                    logOut();
                });
        } else if (isLoggedIn && userInfo && !userAgreed) {
            navigate('/agreement');
        }
    }, [isLoggedIn, userInfo, setUserInfo]);

    const bottomMenuItem = (
        menuName: string,
        path: string,
        defaultImg: React.ReactNode,
        activeImg: React.ReactNode,
    ) => {
        const isActive = () => {
            if (path === '/') return location.pathname === path;
            else return location.pathname.startsWith(path);
        };

        return (
            <div
                className={`flex flex-col justify-center items-center gap-1 ${
                    isActive() ? 'text-primary' : 'text-gray-500'
                }`}
                style={{ width: `calc(100%/${navCount})` }}
                onClick={() => router(path)}
            >
                {isActive() ? activeImg : defaultImg}
                <span>{menuName}</span>
            </div>
        );
    };

    const handleClose = () => {
        if (location.pathname === '/nottodo/create') {
            return setIsCreatePopup(true);
        } else {
            return () => null;
        }
    };

    const handleBack = () => {
        if (location.pathname.startsWith('/nottodo/edit')) {
            return setIsEditPopup(true);
        } else {
            return () => router(-1);
        }
    };

    return (
        <>
            {hasHeader && (
                <Header height={60} title={title} isTitleImg={isImg}>
                    <Header.Leading>{isBack ? <ArrowBack onClick={handleBack} /> : null}</Header.Leading>
                    <Header.Actions>
                        {isClose ? <Close className="text-xl" onClick={handleClose} /> : null}
                    </Header.Actions>
                </Header>
            )}
            {children}
            {hasBottomNavBar && (
                <BottomNavbar height={56}>
                    {bottomMenuItem('홈', '/', <HomeOutline className="w-full" />, <HomeSolid className="w-full" />)}
                    {bottomMenuItem(
                        '리스트',
                        '/nottodo',
                        <ListOutline className="w-full" />,
                        <ListSolid className="w-full" />,
                    )}
                    {bottomMenuItem(
                        '뱃지',
                        '/badge',
                        <BadgeOutline className="w-full" />,
                        <BadgeSolid className="w-full" />,
                    )}
                    {bottomMenuItem(
                        '마이페이지',
                        '/profile',
                        <UserOutline className="w-full" />,
                        <UserSolid className="w-full" />,
                    )}
                </BottomNavbar>
            )}
            <ConfirmPopup
                isOpen={isCreatePopup}
                setIsOpen={setIsCreatePopup}
                message={<span>등록을 종료하시겠습니까?</span>}
                onClick={() => router('/nottodo')}
            />
            <ConfirmPopup
                isOpen={isEditPopup}
                setIsOpen={setIsEditPopup}
                message={
                    <>
                        <span>수정을 종료하시겠습니까?</span>
                        <span>변경된 정보는 저장되지 않습니다.</span>
                    </>
                }
                onClick={() => router('/nottodo')}
            />
        </>
    );
}
