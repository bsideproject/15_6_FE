import '@/styles/global.scss';
import { router } from '@/routes';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

declare global {
    let Kakao: any;
}

function App() {
    return (
        <div className="select-none">
            <RouterProvider router={router} />
            <Toaster position="bottom-center" containerStyle={{ bottom: 56 + 12 }} />
        </div>
    );
}

export default App;
