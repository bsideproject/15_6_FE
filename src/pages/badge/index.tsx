import { useNavigate } from 'react-router-dom';
import BadgeList from './components/BadgeList';
import exampleImg from '@/assets/img/badge_example.png';

export default function BadgePage() {
    const navigate = useNavigate();

    const badgeList = Array.from({ length: 20 }).map((_, idx) => ({
        name: '완벽한 출발',
        imgSrc: exampleImg,
        key: idx,
        locked: idx % 2 ? true : false,
        count: 3,
    }));

    const routeToBadgeDetail = (key: number) => {
        navigate(`/badge/${key}`);
    };

    return (
        <div>
            <BadgeList badgeList={badgeList} clickHandler={routeToBadgeDetail} />
        </div>
    );
}
