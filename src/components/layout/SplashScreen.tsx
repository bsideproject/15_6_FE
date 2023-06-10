import { ReactComponent as Splash } from '@/assets/img/splash_logo.svg';
export const SplashScreen = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-gray-0">
            <Splash></Splash>
        </div>
    );
};
