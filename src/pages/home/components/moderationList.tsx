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
        <li className="flex mb-3 w-full" onClick={onClick}>
            <span className={`bg-${color} w-1.5 min-w-[0.375rem] h-6 rounded-md mr-2`} />
            <span className="block truncate text-base">{content}</span>
            <span className="ml-auto text-sm leading-6 text-gray-500 whitespace-nowrap">{time}</span>
        </li>
    );
};
