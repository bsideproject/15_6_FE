import { LoginType, postLogin } from '@/api/login';
import { useLogIn } from '@/hooks/useLogin';
import { userAgreedState } from '@/recoil/user/atom';
import { useEffect } from 'react';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

const LoginRedirectPage = () => {
    const [searchParams] = useSearchParams();
    const { type } = useParams();
    const navigate = useNavigate();
    const { isLoggedIn, logIn } = useLogIn();
    const [userAgreed, setUserAgreed] = useRecoilState(userAgreedState);

    useEffect(() => {
        const code = searchParams.get('code');
        if (type && code) {
            postLogin(type as LoginType, { code })
                .then((data) => {
                    setUserAgreed(data.isNew !== 'Y');
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
            if (userAgreed) {
                navigate('/');
            } else {
                navigate('/agreement');
            }
        }
    }, [isLoggedIn, userAgreed]);

    return <div></div>;
};

export default LoginRedirectPage;
