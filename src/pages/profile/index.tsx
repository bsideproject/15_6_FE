import { useNavigate } from 'react-router-dom';

import { Avatar } from '@/components/avatar/Avatar';
import { useLogIn } from '@/hooks/useLogin';
import { userInfoState } from '@/recoil/user/atom';
import { useRecoilValue } from 'recoil';

import { ReactComponent as Google } from '@/assets/img/icn_google.svg';
import { ReactComponent as Kakao } from '@/assets/img/icn_kakao.svg';
import { ReactComponent as Apple } from '@/assets/img/icn_apple.svg';
import { ReactComponent as Arrow } from '@/assets/img/icn_arrow_right_s.svg';
import { ReactComponent as MenuArrow } from '@/assets/img/icn_menu_arrow.svg';
import { ReactComponent as Notice } from '@/assets/img/icn_notice.svg';
import { ReactComponent as Megaphone } from '@/assets/img/icn_megaphone.svg';
import { ReactComponent as Keyhole } from '@/assets/img/icn_keyhole.svg';
import { ReactComponent as Textfile } from '@/assets/img/icn_textfile.svg';
import { ReactComponent as Message } from '@/assets/img/icn_message.svg';
import { ReactComponent as Logout } from '@/assets/img/icn_logout.svg';
import { ReactComponent as DefaultProfile } from '@/assets/img/icn_profile.svg';

export default function ProfilePage() {
    const { logOut } = useLogIn();
    const router = useNavigate();
    const userInfo = useRecoilValue(userInfoState);
    const menuTitleList = ['알림 설정', '공지사항', '개인정보 처리방침', '서비스 이용약관', '문의 / 건의하기'];
    const menuIconList = [<Notice />, <Megaphone />, <Keyhole />, <Textfile />, <Message />];
    const menuRouterList = [
        '/profile/alarm',
        '/profile/notice',
        '/profile/policy',
        '/profile/terms',
        '/profile/contact',
    ];
    const menu = (svg: React.ReactNode, title: string, index: number, isArrow: boolean) => {
        const handleRouter = (idx: number) => {
            router(menuRouterList[idx]);
        };
        return (
            <div
                key={'menu' + index}
                className="flex w-full h-14 items-center gap-3"
                onClick={() => handleRouter(index)}
            >
                {svg}
                <span className="body1 text-gray-900">{title}</span>
                {isArrow ? <MenuArrow className="ml-auto" /> : null}
            </div>
        );
    };
    const handleLogout = () => {
        logOut();
    };

    return (
        <div className="px-5 pt-[60px]">
            <div className="w-full flex flex-col items-center">
                {/* TODO 이미지 변경 */}
                <Avatar size="md" src={userInfo?.profileImgUrl ? userInfo.profileImgUrl : <DefaultProfile />} />
                <div className="h-3"></div>
                <div className="text-center title1">{userInfo ? userInfo.nickName : 'unknown'}님</div>
                <div className="flex items-center gap-1">
                    <div className="text-center text-gray-500 body2">{userInfo?.email}</div>
                    <Kakao className="w-3 h-3" />
                </div>
                <div className="h-4"></div>
                <div
                    className="w-[104px] h-[25px] px-2 title3 bg-primary rounded-xl flex justify-center items-center gap-1"
                    onClick={() => router('/profile/edit')}
                >
                    내 정보 수정
                    <Arrow className="w-4 h-4" />
                </div>
                <div className="h-[60px]"></div>
                <div className="w-full h-[1px] bg-gray-100"></div>
                <div className="h-[27px]"></div>
                <div className="w-full flex flex-col gap-1">
                    {menuTitleList.map((title, index) => menu(menuIconList[index], title, index, true))}
                </div>
                <div className="h-4"></div>
                <div className="w-full h-[1px] bg-gray-100"></div>
                <div className="w-full flex w-full h-14 items-center gap-3" onClick={handleLogout}>
                    <Logout />
                    <span className="body1 text-gray-900">로그아웃</span>
                </div>
            </div>
        </div>
    );
}
