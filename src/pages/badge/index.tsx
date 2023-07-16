import { useNavigate } from 'react-router-dom';
import BadgeList from './components/BadgeList';
import exampleImg from '@/assets/img/badge_example.png';

export default function BadgePage() {
    const navigate = useNavigate();

    const fakeBadgeList = Array.from({ length: 20 }).map((_, idx) => ({
        name: '완벽한 출발',
        imgSrc: exampleImg,
        key: idx,
        locked: idx % 2 ? true : false,
        count: 3,
    }));

    const routeToBadgeDetail = (key: number) => {
        const badge = fakeBadgeList.find((badge) => badge.key === key);

        if (!badge?.locked) {
            navigate(`/badge/${key}`);
        }
    };

    return (
        <div>
            <BadgeList badgeList={fakeBadgeList} clickHandler={routeToBadgeDetail} />
        </div>
    );
}
