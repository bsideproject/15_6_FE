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
import { ReactComponent as Logo } from '@/assets/img/icn_logo.svg';
import { Header } from '@/components/layout/Header';
import { useIsBack, useHasBottomNavBar, useHasHeader } from '@/utils/location';

export default function DefaultLayout() {
    const router = useNavigate();
    const hasHeader = useHasHeader();
    const hasBottomNavBar = useHasBottomNavBar();
    const location = useLocation();
    const isBack = useIsBack();

    const navCount = 4;

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

    return (
        <>
            {hasHeader && (
                <Header height={60}>
                    <Header.Leading>
                        {isBack ? <ArrowBack onClick={() => router(-1)} /> : <Logo className="mt-[3px]" />}
                    </Header.Leading>
                    {/* <Header.Actions>
                    <AiOutlineMenu className="text-xl" />
                </Header.Actions> */}
                </Header>
            )}
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
        </>
    );
}
