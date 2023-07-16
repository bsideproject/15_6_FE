import toast from 'react-hot-toast';

export type BadgeToastProps = {
    badgeName: string;
    badgeIcon: string;
};

export const BadgeToast = ({ badgeName, badgeIcon }: BadgeToastProps) => {
    toast.custom((t) => (
        <div
            className={`${
                t.visible ? 'animate-enter' : 'animate-leave'
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
    ));
};
