import '@/styles/global.scss';
import { Routes } from '@/routes';
import DefaultLayout from '@/components/layout/DefaultLayout';
import { Toaster } from 'react-hot-toast';

function App() {
    return (
        <div className="select-none">
            <DefaultLayout>
                <Routes />
                <Toaster position="bottom-center" containerStyle={{ bottom: 56 + 12 }} />
            </DefaultLayout>
        </div>
    );
}

export default App;
