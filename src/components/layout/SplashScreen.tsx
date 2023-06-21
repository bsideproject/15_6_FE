import { useEffect, useRef, useState } from 'react';
import { ReactComponent as Splash } from '@/assets/img/img_splash.svg';
export const SplashScreen = () => {
    const splashRef = useRef<HTMLDivElement>(null);
    const [marginTop, setMarginTop] = useState<string>('');

    useEffect(() => {
        if (splashRef.current?.clientHeight) {
            setMarginTop('mt-[' + splashRef.current.clientHeight * 0.3125 + 'px]');
        }
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-screen flex justify-center bg-gray-0">
            <div className={`h-full ${marginTop}`} ref={splashRef}>
                <Splash></Splash>
            </div>
        </div>
    );
};
