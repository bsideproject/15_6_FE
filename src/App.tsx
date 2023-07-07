import '@/styles/global.scss';
import { router } from '@/routes';
import { RouterProvider } from 'react-router-dom';

function App() {
    return (
        <div className="select-none">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
