import { useEffect, useState } from 'react';

interface TagProps {
    endDate: Date;
    startDate: Date;
}

export const Tag = (props: TagProps) => {
    const { endDate, startDate } = props;

    const [status, setStatus] = useState<string>('');
    const [isDanger, setIsDanger] = useState<boolean>(false);

    const convertDateToStatus = (sDate: Date, eDate: Date) => {
        const startDate = new Date(sDate);
        const endDate = new Date(eDate);
        const today = new Date();
        // 진행중...
        if (endDate > today && startDate <= today) {
            const dDay: number = endDate.getTime() - today.getTime();
            const day = Math.ceil(dDay / (1000 * 60 * 60 * 24));
            if (day < 4) setIsDanger(true);

            setStatus('D-' + day);
        } else if (startDate > today) {
            setStatus('예정');
        } else if (endDate < today) {
            setStatus('종료');
        }
    };

    const bgClass = () => {
        return isDanger ? 'bg-negative' : status === '종료' ? 'bg-gray-500' : 'bg-primary';
    };

    const textClass = () => {
        return !status.startsWith('D') ? 'text-white' : '';
    };

    useEffect(() => {
        convertDateToStatus(startDate, endDate);
    }, [startDate, endDate]);

    return (
        <div
            className={`inline-flex w-[48px] h-[25px] justify-center items-center title3 rounded-xl ${bgClass()} ${textClass()}`}
        >
            {status}
        </div>
    );
};
