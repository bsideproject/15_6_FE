import { Routes as Switch, Route } from 'react-router-dom';

//pages
import HomePage from '@/pages/home';
import LoginPage from '@/pages/login';
import NotTodoPage from '@/pages/nottodo';
import NotTodoCreatePage from './pages/nottodo/NotTodoCreatePage';
import BadgePage from '@/pages/badge';
import ProfilePage from '@/pages/profile';
import SignUpPage from './pages/signup';

export const Routes = () => {
    return (
        <Switch>
            <Route path={'/'} element={<HomePage />} />
            <Route path={'/login'} element={<LoginPage />} />
            <Route path={'/signup'} element={<SignUpPage />} />
            <Route path={'/nottodo'} element={<NotTodoPage />} />
            <Route path={'/nottodo/create'} element={<NotTodoCreatePage />} />
            <Route path={'/nottodo/edit/:id'} element={<NotTodoCreatePage />} />
            <Route path={'/badge'} element={<BadgePage />} />
            <Route path={'/profile'} element={<ProfilePage />} />
        </Switch>
    );
};
