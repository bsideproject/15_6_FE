import '@/styles/global.scss';
import { Routes } from '@/routes';
import DefaultLayout from '@/components/layout/DefaultLayout';

function App() {
    return (
        <div className="select-none">
            <DefaultLayout>
                <Routes />
            </DefaultLayout>
        </div>
    );
}

export default App;
