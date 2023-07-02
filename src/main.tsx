import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/styles/reset.css';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';

declare global {
    interface Window {
        Kakao: any;
    }
}

window.Kakao.init('998580566d5e913c0107f31723601874');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <RecoilRoot>
            <App />
        </RecoilRoot>
    </BrowserRouter>,
);
