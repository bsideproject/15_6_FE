import { ModerationType } from '@/api/moderation';
import { dateToAmPmTimeFormat } from '@/utils/date';

type ModerationListProps = {
    moderations: ModerationType[];
    clickHandler: (index: number) => void;
};

export const ModerationList = ({ moderations, clickHandler }: ModerationListProps) => {
    return (
        <ul className="flex flex-col mt-6 mb-20">
            {moderations.map((item) => {
                return (
                    <ModerationListItem
                        key={item.moderationId}
                        content={item.content}
                        recordType={item.recordType}
                        date={new Date(item.regDtm)}
                        onClick={() => clickHandler(item.moderationId)}
                    />
                );
            })}
        </ul>
    );
};

type ModerationListItemProps = {
    recordType: 'success' | 'fail';
    content: string;
    date: Date;
    onClick: () => void;
};

export const ModerationListItem = ({ recordType, content, date, onClick }: ModerationListItemProps) => {
    const color = recordType === 'success' ? 'postive' : 'negative';
    const time = dateToAmPmTimeFormat(date);

    return (
        <li className="flex justify-between mb-3" onClick={onClick}>
            <span className="flex">
                <span className={`bg-${color} w-1.5 h-6 rounded-md mr-2`} />
                <span className="text-base">{content}</span>
            </span>
            <span className="text-sm leading-6 text-gray-500">{time}</span>
        </li>
    );
};
