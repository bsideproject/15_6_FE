import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BadgeList from './components/BadgeList';
import { getBadges, badge } from '@/api/badge';

export default function BadgePage() {
    const navigate = useNavigate();
    const [badges, setBadges] = useState<badge[]>([]);

    useEffect(() => {
        getBadgeList();
    }, []);

    const getBadgeList = async () => {
        const result = await getBadges();
        setBadges(result);
    };

    const routeToBadgeDetail = (id: string, badgeList: badge[]) => {
        const badge = badgeList.find((badge) => badge.badgeId === id);

        if (badge && badge.badgeCnt > 0) {
            navigate(`/badge/${badge.badgeId}`, {
                state: {
                    name: badge.badgeName,
                    count: badge.badgeCnt,
                    dates: badge.gainDate,
                    explanation: badge.explanation,
                    imgUrl: import.meta.env.VITE_STORAGE_URL + badge.badgeId + '.png',
                },
            });
        }
    };

    return (
        <div>
            <BadgeList badgeList={badges} clickHandler={routeToBadgeDetail} />
        </div>
    );
}
