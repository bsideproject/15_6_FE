import BaseLoginButton from './BaseLoginButton';
import { ReactComponent as GoogleIcon } from '@/assets/img/icn_google.svg';

const GoogleLoginButton = () => {
    return (
        <BaseLoginButton
            styleObj={{
                color: '#090909',
                backgroundColor: '#FFFFFF',
                border: '1px solid #D5D5D5',
            }}
            handleClick={() => {
                console.log('clcik');
            }}
        >
            <GoogleIcon />
            <span className="ml-2">Google로 시작하기</span>
        </BaseLoginButton>
    );
};

export default GoogleLoginButton;
