import BaseLoginButton from './BaseLoginButton';
import { ReactComponent as KakaoIcon } from '@/assets/img/icn_kakao.svg';

const KakaoLoginButton = () => {
    return (
        <BaseLoginButton
            styleObj={{
                color: '#000000',
                backgroundColor: '#FEE500',
            }}
            handleClick={() => {
                console.log('clcik');
            }}
        >
            <KakaoIcon />
            <span className="ml-2">카카오로 시작하기</span>
        </BaseLoginButton>
    );
};

export default KakaoLoginButton;
