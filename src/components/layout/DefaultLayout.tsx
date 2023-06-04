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
import { useIsBack } from '@/utils/location';

export default function DefaultLayout() {
    const router = useNavigate();
    const location = useLocation();
    const isBack = useIsBack();
    const navCount = 4;

    return (
        <>
            <Header height={60}>
                <Header.Leading>
                    {isBack ? <ArrowBack onClick={() => router(-1)} /> : <Logo className="mt-[3px]" />}
                </Header.Leading>
                {/* <Header.Actions>
                    <AiOutlineMenu className="text-xl" />
                </Header.Actions> */}
            </Header>
            <BottomNavbar height={48}>
                <div style={{ width: `calc(100%/${navCount})` }} onClick={() => router('/')}>
                    {location.pathname === '/' ? <HomeSolid className="w-full" /> : <HomeOutline className="w-full" />}
                </div>
                <div style={{ width: `calc(100%/${navCount})` }} onClick={() => router('/nottodo')}>
                    {location.pathname.startsWith('/nottodo') ? (
                        <ListSolid className="w-full" />
                    ) : (
                        <ListOutline className="w-full" />
                    )}
                </div>
                <div style={{ width: `calc(100%/${navCount})` }} onClick={() => router('/badge')}>
                    {location.pathname.startsWith('/badge') ? (
                        <BadgeSolid className="w-full" />
                    ) : (
                        <BadgeOutline className="w-full" />
                    )}
                </div>
                <div style={{ width: `calc(100%/${navCount})` }} onClick={() => router('/profile')}>
                    {location.pathname.startsWith('/profile') ? (
                        <UserSolid className="w-full" />
                    ) : (
                        <UserOutline className="w-full" />
                    )}
                </div>
            </BottomNavbar>
        </>
    );
}
