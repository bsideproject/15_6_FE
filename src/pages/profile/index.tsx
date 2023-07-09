import { useLogIn } from '@/hooks/useLogin';
import { userInfoState } from '@/recoil/user/atom';
import { useRecoilValue } from 'recoil';

export default function ProfilePage() {
    const { logOut, withdraw } = useLogIn();
    const userInfo = useRecoilValue(userInfoState);

    return (
        <div>
            <div>{userInfo?.email}</div>
            <div>{userInfo?.nickName}</div>
            <br />
            <br />
            <button onClick={logOut}>로그아웃</button>
            <br />
            <br />
            <button onClick={withdraw}>탈퇴</button>
        </div>
    );
}
