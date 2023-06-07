import KakaoLoginButton from '@/components/buttons/SocialLoginButtons/KakaoLoginButton';
import AppleLoginButton from '@/components/buttons/SocialLoginButtons/AppleLoginButton';
import GoogleLoginButton from '@/components/buttons/SocialLoginButtons/GoogleLoginButton';
import { ReactComponent as LoginContent } from '@/assets/img/icn_login_content.svg';
import { getUserOS } from '@/utils/userAgent';

export default function LoginPage() {
    const userAgent = getUserOS();

    return (
        <div className="h-screen flex flex-col justify-center">
            <LoginContent className="mx-auto mb-5" />
            <KakaoLoginButton />
            {userAgent === 'iOS' && <AppleLoginButton />}
            <GoogleLoginButton />
        </div>
    );
}
