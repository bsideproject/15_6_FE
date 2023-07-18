import { createBrowserRouter, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

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
                children: [
                    {
                        path: '',
                        element: <BadgePage />,
                    },
                    {
                        path: ':badgeId',
                        element: <BadgeDetail />,
                        loader: ({ params }) => {
                            return {
                                key: params.badgeId,
                                name: '뱃지명',
                                description: '뱃지 설명',
                                count: 3,
                                acquiredAt: ['2023.07.14', '2023.07.15'],
                            };
                        },
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
