import badgeIcon from '@/assets/img/badge_toast_example.png';

export type BadgeToastProps = {
    visible: boolean;
    badgeName: string;
};

const BadgeToast = ({ visible, badgeName }: BadgeToastProps) => {
    return (
        <div
            className={`${
                visible ? 'animate-enter' : 'animate-leave'
            } flex items-center justify-center bg-gray-900 w-auto px-4 py-2 bottom-[116px] rounded-xl text-white text-xs`}
        >
            <img className="w-[34px] h-[34px] mr-2 my-1" src={badgeIcon} />
            <div>
                <div>
                    <span className="text-primary">{badgeName} </span>
                    <span>뱃지 획득! 🏅</span>
                </div>
                <div>획득한 뱃지를 확인해보세요.</div>
            </div>
        </div>
    );
};

export default BadgeToast;
