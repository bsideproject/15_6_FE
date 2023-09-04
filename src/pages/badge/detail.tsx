import BadgeCount from './components/BadgeCount';
import { useLocation } from 'react-router-dom';
import { badgeDate } from '@/api/badge';
import { parsingDotDate } from '@/utils/date';

export default function BadgeDetail() {
    const props = useLocation().state;
    return (
        <div className="flex flex-col justify-center items-center gap-9">
            <div className="relative">
                <div className="w-[200px] h-[200px]">
                    <img src={props.imgUrl} className="w-full h-full object-contain" />
                </div>
                <BadgeCount count={props.count ?? 0} />
            </div>
            <div className="flex flex-col items-center">
                <span className="text-gray-900 font-bold text-base mb-2">{props.name}</span>
                {props &&
                    props.dates.map((date: badgeDate, idx: number) => (
                        <div key={idx} className="text-base text-gray-600">
                            획득일: {parsingDotDate(date.regDtm)}
                        </div>
                    ))}
            </div>
        </div>
    );
}
