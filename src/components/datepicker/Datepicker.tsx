import { useState, useEffect } from 'react';
import { getMonthDayList, getWeekOfMonth, getWeekDayList } from '@/utils/datepicker';
import { ReactComponent as Arrow } from '@/assets/img/icn_arrow.svg';
import { ReactComponent as ArrowActive } from '@/assets/img/icn_arrow_active.svg';

export interface DatePickerProps {
    selected: Date;
    onChange: (date: Date) => void;
}

export const DatePicker = (props: DatePickerProps) => {
    const { selected, onChange } = props;

    const weeks = ['일', '월', '화', '수', '목', '금', '토'];
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
    const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth() + 1);
    const [currentWeek, setCurrentWeek] = useState<number>(1);
    const [today] = useState<Date>(new Date());
    const [dayList, setDayList] = useState<string[]>([]);
    const [isWeek] = useState<boolean>(false);
    const [arrowState, setArrowState] = useState<'left' | 'right' | null>(null);

    useEffect(() => {
        const { year, month, week } = getWeekOfMonth(currentDate);
        // console.log('current date', currentDate, year, month, week)
        if (isWeek) {
            setCurrentWeek(week);
            setCurrentYear(year);
            setCurrentMonth(month);
            setDayList(getWeekDayList(currentDate));
        }
    }, [currentDate]);

    useEffect(() => {
        if (!isWeek) setDayList(getMonthDayList(currentYear, currentMonth));
    }, [currentYear, currentMonth]);

    useEffect(() => {
        if (isWeek) {
            const tempDate = new Date(currentDate);
            const firstDate = new Date(tempDate.getFullYear(), tempDate.getMonth(), 1);
            const isFirstWeek = firstDate.getDay() < 4;
            if (isFirstWeek) {
                setDayList(getWeekDayList(firstDate));
                setCurrentWeekValue(firstDate);
                setCurrentDate(firstDate);
            } else {
                const newDate = new Date(firstDate.setDate(firstDate.getDate() + 7 - firstDate.getDay()));
                setDayList(getWeekDayList(newDate));
                setCurrentWeekValue(newDate);
                setCurrentDate(newDate);
            }
        } else setDayList(getMonthDayList(currentYear, currentMonth));
    }, [isWeek]);

    const moveLeft = () => {
        setCurrentDate(new Date(currentYear, currentMonth - 2, 1));
        setArrowState('left');
        if (currentMonth === 1) {
            setCurrentMonth(12);
            setCurrentYear((prev) => prev - 1);
        } else {
            setCurrentMonth((prev) => prev - 1);
        }
    };

    const moveRight = () => {
        setCurrentDate(new Date(currentYear, currentMonth, 1));
        setArrowState('right');
        if (currentMonth === 12) {
            setCurrentMonth(1);
            setCurrentYear((prev) => prev + 1);
        } else {
            setCurrentMonth((prev) => prev + 1);
        }
    };

    const moveWeekLeft = () => {
        const newDate = new Date(currentDate);
        const prevWeek = new Date(newDate.setDate(newDate.getDate() - 7));
        setCurrentDate(prevWeek);
    };

    const moveWeekRight = () => {
        const newDate = new Date(currentDate);
        const nextWeek = new Date(newDate.setDate(newDate.getDate() + 7));
        setCurrentDate(nextWeek);
    };

    // const changeMode = () => {
    //     setIsWeek(!isWeek);
    // };

    const setCurrentWeekValue = (date: Date) => {
        const { year, month, week } = getWeekOfMonth(date);
        setCurrentWeek(week);
        setCurrentMonth(month);
        setCurrentYear(year);
    };

    const selectedDate = (day: string) => {
        const newDate = new Date(currentYear, currentMonth - 1, parseInt(day));
        onChange(newDate);
    };

    const isEqualDate = (selectedDate: Date, day: string) => {
        const selectedYear = selectedDate.getFullYear();
        const selectedMonth = selectedDate.getMonth() + 1;
        const selectedDay = selectedDate.getDate();
        if (selectedYear === currentYear && selectedMonth === currentMonth && parseInt(day) === selectedDay) {
            return true;
        } else {
            return false;
        }
    };

    const renderDay = () => {
        return dayList.map((day: string, index: number) => {
            let disabled = false;
            if (index < 7 && parseInt(day) > 20) {
                disabled = true;
            } else if (index > 20 && parseInt(day) < 10) {
                disabled = true;
            }
            return (
                <div
                    key={index}
                    className={`w-[calc((100%/7))] 
                    h-11 py-[2.5px] rounded-full inline-flex text-lg font-bold ${
                        isEqualDate(today, day) ? (isEqualDate(selected, day) ? 'text-black' : 'text-primary') : ''
                    }`}
                    onClick={!disabled ? () => selectedDate(day) : () => null}
                >
                    <div
                        className={`w-full h-full rounded-full flex justify-center items-center
						${isEqualDate(selected, day) && !disabled ? 'bg-primary' : ''}
						${disabled ? 'text-gray-100' : ''}`}
                    >
                        <span className="mt-1">{day}</span>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="wrapper w-[320px] h-auto pt-[15px] pr-[20.5px] pb-[18px] pl-[19.5px] m-auto rounded-lg shadow-normal">
            <div className="header w-full">
                <div className="control flex justify-between items-center">
                    <div>
                        <span className="body2 ml-[7.5px]">
                            {currentYear}년 {currentMonth}월 {isWeek ? `${currentWeek}주차` : ''}
                        </span>
                    </div>
                    <div className="flex gap-[33px]">
                        <div
                            onClick={isWeek ? moveWeekLeft : moveLeft}
                            className="w-[20px] h-[20px] flex justify-center items-center"
                        >
                            {arrowState === 'left' ? <ArrowActive className="rotate-180" /> : <Arrow />}
                        </div>
                        <div
                            onClick={isWeek ? moveWeekRight : moveRight}
                            className="w-[20px] h-[20px] flex justify-center items-center"
                        >
                            {arrowState === 'right' ? <ArrowActive /> : <Arrow className="rotate-180" />}
                        </div>
                    </div>
                    {/* <div className='w-12 flex justify-center items-center border rounded bg-slate-100 hover:bg-slate-200 cursor-pointer' onClick={changeMode}>
                        {isWeek ? '주간' : '월간'}
                    </div> */}
                </div>
                <div className="week w-full h-[40px] flex items-center">
                    {weeks.map((week: string) => (
                        <div key={week} className="w-[calc(100%/7)] text-center text-gray-500 title3">
                            {week}
                        </div>
                    ))}
                </div>
            </div>
            <div className="body w-full">{renderDay()}</div>
        </div>
    );
};

DatePicker.defaultProps = {};
