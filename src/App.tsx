import '@/styles/global.scss';
import { Routes } from '@/routes';
import { useIsLayout } from '@/utils/location';
import DefaultLayout from '@/components/layout/DefaultLayout';

function App() {
    const isLayout = useIsLayout();
    return (
        <>
            {isLayout ? <DefaultLayout /> : null}
            <Routes />
        </>
    );
}

export default App;
