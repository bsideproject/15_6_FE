import '@/styles/global.scss';
import { router } from '@/routes';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import badgeIcon from '@/assets/img/badge_toast_example.png';
import { useEffect } from 'react';
import { BadgeToast } from './components/toast/BadgeToast';

declare global {
    let Kakao: any;
}

function App() {
    useEffect(() => {
        BadgeToast({ badgeIcon, badgeName: '첫 번째 목표' });
    }, []);

    return (
        <div className="select-none">
            <RouterProvider router={router} />
            <Toaster position="bottom-center" containerStyle={{ bottom: 56 + 12 }} />
        </div>
    );
}

export default App;
