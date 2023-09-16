import { Tag } from '@/components/tag/Tag';
import { ReactComponent as More } from '@/assets/img/icn_more.svg';

interface CardProps {
    title: string;
    goal?: string;
    startDate: Date;
    endDate: Date;
    openMenu?: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement> | undefined;
    onClick?: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement> | undefined;
    className?: string;
}

export const Card = (props: CardProps) => {
    const { title, goal, openMenu, onClick, startDate, endDate, className } = props;

    const handleOpenMenu = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        if (openMenu) openMenu(event);
    };

    return (
        <div
            className={`card w-full min-h-[128px] flex flex-col jusitfy-center px-[20px] py-[24px] bg-white ${className}`}
            onClick={onClick}
        >
            <div className="flex justify-between mb-[8px]">
                <Tag startDate={startDate} endDate={endDate} />
                <div onClick={handleOpenMenu}>
                    <More />
                </div>
            </div>
            <div className="title2 mb-[2px] line-clamp-2">{title}</div>
            <div className="body2 text-gray-600 line-clamp-1">{goal}</div>
        </div>
    );
};
