import '@/styles/global.scss';
import { Routes } from '@/routes';
import DefaultLayout from '@/components/layout/DefaultLayout';
import { SplashScreen } from '@/components/layout/SplashScreen';
import { useEffect, useState } from 'react';

function App() {
    const [splashLoading, setSplashLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setSplashLoading(false);
        }, 1000);
    }, []);

    return (
        <>
            <DefaultLayout />
            {splashLoading ? <SplashScreen /> : null}
            <Routes />
        </>
    );
}

export default App;
