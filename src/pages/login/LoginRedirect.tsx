import { LoginType, postLogin } from '@/api/login';
import { useLogIn } from '@/hooks/useLogin';
import { isProductionMode } from '@/utils/env';
import { useEffect } from 'react';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';

const redirectUri = isProductionMode()
    ? 'https://www.nottodoclub.store/login/kakao'
    : 'http://localhost:8080/login/kakao';

const LoginRedirectPage = () => {
    const [searchParams] = useSearchParams();
    const { type } = useParams();
    const navigate = useNavigate();
    const { isLoggedIn, logIn } = useLogIn();

    useEffect(() => {
        const code = searchParams.get('code');
        if (type && code) {
            postLogin(type as LoginType, { code, redirectUri })
                .then((data) => {
                    logIn(data.appAccessToken);
                })
                .catch((e) => {
                    console.log('로그인 실패', e);
                    navigate('/login');
                });
        }
    }, [type]);

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn]);

    return <div></div>;
};

export default LoginRedirectPage;
