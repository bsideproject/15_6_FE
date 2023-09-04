import { ReactComponent as LockIcon } from '@/assets/img/icn_lock.svg';
import BadgeCount from './BadgeCount';
import type { badge } from '@/api/badge';

type BadgeListProps = {
    badgeList: badge[];
    clickHandler: (id: string, badgeList: badge[]) => void;
};

const BadgeList = ({ badgeList, clickHandler }: BadgeListProps) => {
    return (
        <ul className="mt-5 mb-10 grid gap-x-3 gap-y-10 justify-center grid-cols-auto-fill">
            {badgeList.map((badge) => (
                <li className="flex-none" key={badge.badgeId} onClick={() => clickHandler(badge.badgeId, badgeList)}>
                    <BadgeItem badge={badge} />
                </li>
            ))}
        </ul>
    );
};

const BadgeItem = ({ badge }: { badge: badge }) => {
    const isLock = badge.gainYn === 'N';
    return (
        <div className="flex flex-col justify-center items-center ">
            <div className="relative">
                <div className="w-[100px] h-[100px]">
                    <img
                        className={`${isLock ? 'grayscale' : ''} object-contain w-full h-full`}
                        src={import.meta.env.VITE_STORAGE_URL + badge.badgeId + '.png'}
                    />
                </div>
                {isLock && (
                    <div className="w-full h-full absolute bg-white/90 top-0 flex justify-center items-center">
                        <LockIcon />
                    </div>
                )}
                {badge.badgeCnt > 1 && <BadgeCount count={badge.badgeCnt} />}
            </div>
            <span className={`${isLock ? 'text-gray-300' : 'text-gray-900'} mt-[11px]`}>{badge.badgeName}</span>
        </div>
    );
};

export default BadgeList;
