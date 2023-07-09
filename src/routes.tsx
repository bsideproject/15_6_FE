import { createBrowserRouter, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

//pages
import HomePage from '@/pages/home';
import LoginPage from '@/pages/login';
import NotTodoPage from '@/pages/nottodo';
import NotTodoCreatePage from './pages/nottodo/NotTodoCreatePage';
import BadgePage from '@/pages/badge';
import ProfilePage from '@/pages/profile';
import AgreementPage from '@/pages/agreement';
import LoginRedirect from '@/pages/login/LoginRedirect';
import DefaultLayout from './components/layout/DefaultLayout';

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <DefaultLayout>
                <Outlet />
                <Toaster position="bottom-center" containerStyle={{ bottom: 56 + 12 }} />
            </DefaultLayout>
        ),
        children: [
            {
                path: '',
                element: <HomePage />,
            },
            {
                path: 'nottodo',
                children: [
                    {
                        path: '',
                        element: <NotTodoPage />,
                    },
                    {
                        path: 'create',
                        element: <NotTodoCreatePage />,
                    },
                    {
                        path: 'edit/:id',
                        element: <NotTodoCreatePage />,
                    },
                ],
            },
            {
                path: 'badge',
                element: <BadgePage />,
            },
            {
                path: 'profile',
                element: <ProfilePage />,
            },
        ],
    },
    {
        path: '/login',
        children: [
            {
                path: '',
                element: <LoginPage />,
            },
            {
                path: ':type',
                element: <LoginRedirect />,
            },
        ],
    },
    {
        path: '/agreement',
        element: <AgreementPage />,
    },
]);
