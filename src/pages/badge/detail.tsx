import { useLoaderData } from 'react-router-dom';
import exampleImg from '@/assets/img/badge_example_big.png';
import BadgeCount from './components/BadgeCount';

type BadgeInfo = {
    count: number;
    description: string;
    acquiredAt: string[];
};

export default function BadgeDetail() {
    const badgeInfo = useLoaderData() as BadgeInfo;

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="relative">
                <img src={exampleImg} />
                <BadgeCount count={badgeInfo.count} />
            </div>
            <div className="flex flex-col items-center">
                <span className="text-gray-900 font-bold text-base mb-2">{badgeInfo.description}</span>
                {badgeInfo.acquiredAt.map((acquired, idx) => (
                    <span key={idx} className="text-base text-gray-600">
                        획득일: {acquired}
                    </span>
                ))}
            </div>
        </div>
    );
}
