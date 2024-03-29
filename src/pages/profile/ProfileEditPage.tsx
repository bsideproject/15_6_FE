import { useEffect, useState } from 'react';
import { useLogIn } from '@/hooks/useLogin';

import { Avatar } from '@/components/avatar/Avatar';
import { Input } from '@/components/common/input/Input';
import { ToggleButton } from '@/components/buttons/toggle/ToggleButton';
import { Toast } from '@/components/toast/Toast';
import { ConfirmPopup } from '@/components/popup/PopupGroup';

// import { ReactComponent as Google } from '@/assets/img/icn_google.svg';
import { ReactComponent as Kakao } from '@/assets/img/icn_kakao.svg';
// import { ReactComponent as Apple } from '@/assets/img/icn_apple.svg';
import { ReactComponent as DefaultProfile } from '@/assets/img/icn_profile.svg';
import { putAutoLogin, putNickname } from '@/api/login';
import { useUserInfo } from '@/hooks/useUserInfo';

export default function ProfileEditPage() {
    const { withdraw } = useLogIn();
    // TODO user 정보 세팅
    const { userInfo, updateUserInfo, updateAutoLogin } = useUserInfo();
    const [userName, setUserName] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');
    const [userImage, setUserImage] = useState<string>('');
    const [isAutoLogin, setIsAutoLogin] = useState<boolean>(false);
    const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);

    useEffect(() => {
        if (userInfo) {
            setUserName(userInfo.nickName);
            setUserEmail(userInfo.email);
            setUserImage(userInfo.profileImgUrl);
            setIsAutoLogin(userInfo.isAutoLogin);
        }
    }, [userInfo]);

    const handleAutoLogin = () => {
        const newAutoLogin = !isAutoLogin;

        setIsAutoLogin(newAutoLogin);
        putAutoLogin(newAutoLogin)
            .then((data) => {
                updateAutoLogin(data.autoLoginYn);
            })
            .catch((e) => {
                console.log('자동 로그인 토글 실패', e);
            });
    };

    const handleUserName = () => {
        putNickname(userName)
            .then((data) => {
                updateUserInfo('nickName', data.nickname);
            })
            .then(() => {
                Toast('닉네임 변경이 완료되었어요.');
            })
            .catch(() => {
                Toast('에러가 발생했습니다.');
            });
    };

    const handleDeleteAccount = () => {
        withdraw().then(() => {
            Toast('탈퇴가 완료되었습니다.');
        });
    };

    return (
        <div className="w-full px-5">
            <div className="w-full flex flex-col items-center">
                <div className="h-[60px]"></div>
                {/* TODO 자신의 이미지로 변경 */}
                <Avatar size="lg" src={userImage ? userImage : <DefaultProfile />} />
                <div className="h-[40px]"></div>
                <div className="w-full flex items-end gap-2">
                    <div className="w-[232px]">
                        <Input
                            type="text"
                            label="닉네임"
                            value={userName}
                            setValue={setUserName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <button
                        className={`w-[80px] h-[48px] rounded-lg text-white ${
                            userName.length === 0 ? 'bg-gray-300' : 'bg-gray-900'
                        }`}
                        disabled={userName.length === 0}
                        // TODO 닉네임 변경 api 로직 추가
                        onClick={handleUserName}
                    >
                        변경
                    </button>
                </div>
                <div className="h-5"></div>
                <div className="w-full">
                    <Input
                        type="text"
                        label="이메일"
                        disabled
                        value={userEmail}
                        setValue={setUserEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        // TODO 가입한 소셜에 따라서 아이콘 변경
                        icon={<Kakao />}
                    />
                </div>
                <div className="h-2"></div>
                <div className="w-full h-[56px] flex items-center justify-between body1 text-gray-600">
                    <span>자동 로그인</span>
                    <ToggleButton isToggle={isAutoLogin} onClick={handleAutoLogin} />
                </div>
                <div className="h-[60px]"></div>
                <div className="w-full h-[1px] bg-gray-50"></div>
                <div className="w-full h-[56px] flex items-center body1 text-gray-600">
                    <span onClick={() => setIsOpenPopup(true)}>회원 탈퇴</span>
                </div>
            </div>
            <ConfirmPopup
                isOpen={isOpenPopup}
                setIsOpen={setIsOpenPopup}
                message={
                    <span>
                        회원 탈퇴 시 등록한 낫투두와 절제 기록 모두가 삭제되고 복구할 수 없어요. 정말로 탈퇴하시겠어요?
                    </span>
                }
                confrimString="탈퇴"
                onClick={handleDeleteAccount}
            />
        </div>
    );
}
