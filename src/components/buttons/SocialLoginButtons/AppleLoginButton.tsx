import BaseLoginButton from './BaseLoginButton';
import { ReactComponent as AppleIcon } from '@/assets/img/icn_apple.svg';

const AppleLoginButton = () => {
    return (
        <BaseLoginButton
            styleObj={{
                color: '#FFFFFF',
                backgroundColor: '#050708',
            }}
            handleClick={() => {
                console.log('clcik');
            }}
        >
            <AppleIcon />
            <span className="ml-2">Apple로 시작하기</span>
        </BaseLoginButton>
    );
};

export default AppleLoginButton;
