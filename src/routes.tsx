import { createBrowserRouter, Outlet } from 'react-router-dom';

//pages
import HomePage from '@/pages/home';
import LoginPage from '@/pages/login';
import NotTodoPage from '@/pages/nottodo';
import NotTodoCreatePage from './pages/nottodo/NotTodoCreatePage';
import BadgePage from '@/pages/badge';
import ProfilePage from '@/pages/profile';
import ProfileEditPage from '@/pages/profile/ProfileEditPage';
import AlarmPage from '@/pages/profile/AlarmPage';
import ContactPage from '@/pages/profile/ContactPage';
import TermsPage from '@/pages/profile/TermsPage';
import NoticePage from '@/pages/profile/NoticePage';
import PolicyPage from '@/pages/profile/PolicyPage';
import AgreementPage from '@/pages/agreement';
import LoginRedirect from '@/pages/login/LoginRedirect';
import DefaultLayout from './components/layout/DefaultLayout';
import BadgeDetail from './pages/badge/detail';

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <DefaultLayout>
                <Outlet />
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
                children: [
                    {
                        path: '',
                        element: <BadgePage />,
                    },
                    {
                        path: ':badgeId',
                        element: <BadgeDetail />,
                    },
                ],
            },
            {
                path: 'profile',
                children: [
                    {
                        path: '',
                        element: <ProfilePage />,
                    },
                    {
                        path: 'edit',
                        element: <ProfileEditPage />,
                    },
                    {
                        path: 'alarm',
                        element: <AlarmPage />,
                    },
                    {
                        path: 'contact',
                        element: <ContactPage />,
                    },
                    {
                        path: 'notice',
                        element: <NoticePage />,
                    },
                    {
                        path: 'terms',
                        element: <TermsPage />,
                    },
                    {
                        path: 'policy',
                        element: <PolicyPage />,
                    },
                ],
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
