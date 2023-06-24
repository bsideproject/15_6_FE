import { useEffect, useRef } from 'react';
import { ReactComponent as Splash } from '@/assets/img/img_splash.svg';
export const SplashScreen = () => {
    const splashRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (splashRef.current?.clientHeight) {
            splashRef.current.style.marginTop = splashRef.current.clientHeight * 0.3125 + 'px';
        }
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-screen flex justify-center bg-gray-0">
            <div className="h-full" ref={splashRef}>
                <Splash></Splash>
            </div>
        </div>
    );
};
