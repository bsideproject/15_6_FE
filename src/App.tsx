import '@/styles/global.scss';
import { Routes } from '@/routes';
import { useIsLayout } from '@/utils/location';
import DefaultLayout from '@/components/layout/DefaultLayout';
import { SplashScreen } from '@/components/layout/SplashScreen';
import { useEffect, useState } from 'react';

function App() {
    const isLayout = useIsLayout();
    const [splashLoading, setSplashLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setSplashLoading(false);
        }, 1000);
    }, []);

    return (
        <>
            {isLayout ? <DefaultLayout /> : null}
            {splashLoading ? <SplashScreen /> : null}
            <Routes />
        </>
    );
}

export default App;
