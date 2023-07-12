import BaseLoginButton from './BaseLoginButton';
import { ReactComponent as KakaoIcon } from '@/assets/img/icn_kakao.svg';

const KakaoLoginButton = () => {
    const redirectUri = import.meta.env.PROD
        ? 'https://www.nottodoclub.store/login/kakao'
        : 'http://localhost:8080/login/kakao';

    return (
        <BaseLoginButton
            styleObj={{
                color: '#000000',
                backgroundColor: '#FEE500',
            }}
            handleClick={() => {
                Kakao.Auth.authorize({
                    redirectUri,
                });
            }}
        >
            <KakaoIcon />
            <span className="ml-2">카카오로 시작하기</span>
        </BaseLoginButton>
    );
};

export default KakaoLoginButton;
