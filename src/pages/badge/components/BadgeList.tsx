import { ReactComponent as LockIcon } from '@/assets/img/icn_lock.svg';
import BadgeCount from './BadgeCount';

type Badge = {
    imgSrc: string;
    name: string;
    key: number;
    count: number;
    locked: boolean;
};

type BadgeListProps = {
    badgeList: Badge[];
    clickHandler: (key: number) => void;
};

const BadgeList = ({ badgeList, clickHandler }: BadgeListProps) => {
    return (
        <ul className="mt-5 mb-10 grid gap-x-3 gap-y-10 justify-center grid-cols-auto-fill">
            {badgeList.map((badge) => (
                <li className="flex-none" key={badge.key} onClick={() => clickHandler(badge.key)}>
                    <BadgeItem badge={badge} />
                </li>
            ))}
        </ul>
    );
};

type BadgeItemProps = {
    badge: Badge;
};

const BadgeItem = ({ badge }: BadgeItemProps) => {
    return (
        <div className="flex flex-col justify-center items-center ">
            <div className="relative">
                <img className={`${badge.locked ? 'grayscale' : ''} object-none`} src={badge.imgSrc} />
                {badge.locked && (
                    <div className="w-full h-full absolute bg-white/90 top-0 flex justify-center items-center">
                        <LockIcon />
                    </div>
                )}
                {badge.count > 1 && <BadgeCount count={badge.count} />}
            </div>
            <span className={`${badge.locked ? 'text-gray-300' : 'text-gray-900'} mt-[11px]`}>{badge.name}</span>
        </div>
    );
};

export default BadgeList;
