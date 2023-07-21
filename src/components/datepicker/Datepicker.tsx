import { useState, useEffect } from 'react';
import { getMonthDayList, getWeekOfMonth, getWeekDayList, DateObj } from '@/utils/datepicker';
import { ReactComponent as Arrow } from '@/assets/img/icn_arrow.svg';
import { ReactComponent as ArrowActive } from '@/assets/img/icn_arrow_active.svg';
import { TextToggleButton } from '@/components/buttons/toggle/TextToggleButton';

type NottodoStatus = 'success' | 'fail' | 'warning';

interface MarkerDate {
    [date: string]: NottodoStatus;
}

export interface DatePickerProps {
    selected: Date;
    onChange: (date: Date) => void;
    startDate?: Date;
    endDate?: Date;
    isModal: boolean;
    markerDateObj?: MarkerDate;
}

export const DatePicker = (props: DatePickerProps) => {
    const { selected, onChange, startDate, endDate, isModal, markerDateObj } = props;

    const weeks = ['일', '월', '화', '수', '목', '금', '토'];
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
    const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth() + 1);
    const [currentWeek, setCurrentWeek] = useState<number>(1);
    const [today] = useState<Date>(new Date());
    const [dayList, setDayList] = useState<DateObj[]>([]);
    const [isWeek, setIsWeek] = useState<boolean>(false);
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
        setArrowState('left');
        setCurrentDate(prevWeek);
    };

    const moveWeekRight = () => {
        const newDate = new Date(currentDate);
        const nextWeek = new Date(newDate.setDate(newDate.getDate() + 7));
        setArrowState('right');
        setCurrentDate(nextWeek);
    };

    const changeMode = () => {
        setIsWeek(!isWeek);
    };

    const setCurrentWeekValue = (date: Date) => {
        const { year, month, week } = getWeekOfMonth(date);
        setCurrentWeek(week);
        setCurrentMonth(month);
        setCurrentYear(year);
    };

    const selectedDate = (date: DateObj) => {
        const newDate = new Date(date.year, date.month - 1, date.day);
        onChange(newDate);
    };

    const isEqualDate = (selectedDate: Date, date: DateObj) => {
        const selectedYear = selectedDate.getFullYear();
        const selectedMonth = selectedDate.getMonth() + 1;
        const selectedDay = selectedDate.getDate();
        if (selectedYear === date.year && selectedMonth === date.month && date.day === selectedDay) {
            return true;
        } else {
            return false;
        }
    };

    const renderDay = () => {
        return dayList.map((date: DateObj, index: number) => {
            const newDate = new Date(date.year, date.month - 1, date.day + 1);
            const markerDate = date.year + '-' + date.month + '-' + date.day;
            let disabled = false;

            if (isModal) {
                // 오늘 이전의 날은 전부 disable처리
                if (newDate < today) {
                    disabled = true;
                }
                // 시작 날짜(선택된 날짜) 기준으로 100일 이후는 disable처리
                if (startDate && endDate) {
                    const hundredDate = new Date(new Date(startDate).setDate(startDate.getDate() + 100));
                    if (newDate > hundredDate) {
                        disabled = true;
                    }
                }
            }
            if (!isWeek) {
                if (index < 7 && date.day > 20) {
                    disabled = true;
                } else if (index > 20 && date.day < 10) {
                    disabled = true;
                }
            }
            return (
                <div
                    key={index}
                    className={`w-[calc((100%/7))] 
                    h-11 py-[2.5px] rounded-full inline-flex text-lg font-bold ${
                        isEqualDate(today, date) ? (isEqualDate(selected, date) ? 'text-black' : 'text-primary') : ''
                    }`}
                    onClick={!disabled ? () => selectedDate(date) : () => null}
                >
                    <div
                        className={`w-full h-full rounded-full flex flex-col justify-center items-center relative
						${isEqualDate(selected, date) && !disabled ? 'bg-primary' : ''}
						${disabled ? 'text-gray-100' : ''}`}
                    >
                        {markerDateObj && !isEqualDate(selected, date) && (
                            <div className="flex gap-0.5 absolute top-0.5 left-1/2 -translate-x-1/2">
                                {markerDateObj[markerDate] && markerDateObj[markerDate] === 'success' ? (
                                    <div className="w-1.5 h-1.5 rounded-full bg-postive" />
                                ) : null}
                                {markerDateObj[markerDate] && markerDateObj[markerDate] === 'fail' ? (
                                    <div className="w-1.5 h-1.5 rounded-full bg-negative" />
                                ) : null}
                                {markerDateObj[markerDate] && markerDateObj[markerDate] === 'warning' ? (
                                    <div className="w-1.5 h-1.5 rounded-full bg-warning" />
                                ) : null}
                            </div>
                        )}
                        <span className="mt-0.5">{date.day}</span>
                    </div>
                </div>
            );
        });
    };

    return (
        <div
            className={`wrapper w-full min-w-[280px] h-auto pt-[15px] pr-[20.5px] pb-[18px] pl-[19.5px] m-auto rounded-lg ${
                isModal ? 'shadow-normal' : ''
            }`}
        >
            <div className="header w-full">
                <div
                    className={`control flex items-center mb-2 px-2 ${isModal ? 'justify-center' : 'justify-between'}`}
                >
                    <div className="flex gap-[20px]">
                        <div
                            onClick={isWeek ? moveWeekLeft : moveLeft}
                            className="w-[24px] h-[24px] flex justify-center items-center cursor-pointer"
                        >
                            {arrowState === 'left' ? <ArrowActive className="rotate-180" /> : <Arrow />}
                        </div>
                        <span className="title2">
                            {isWeek || !isModal ? '' : `${currentYear}년`} {currentMonth}월{' '}
                            {isWeek ? `${currentWeek}째주` : ''}
                        </span>
                        <div
                            onClick={isWeek ? moveWeekRight : moveRight}
                            className="w-[24px] h-[24px] flex justify-center items-center cursor-pointer"
                        >
                            {arrowState === 'right' ? <ArrowActive /> : <Arrow className="rotate-180" />}
                        </div>
                    </div>
                    {!isModal ? (
                        <TextToggleButton isToggle={isWeek} onClick={changeMode} activeMsg="월간" inactiveMsg="주간" />
                    ) : null}
                </div>
                <div className="week w-full h-[40px] flex items-center">
                    {weeks.map((week: string) => (
                        <div key={week} className="w-[calc(100%/7)] text-center text-gray-500 title3">
                            {week}
                        </div>
                    ))}
                </div>
            </div>
            <div className="title2 w-full">{renderDay()}</div>
        </div>
    );
};

DatePicker.defaultProps = {
    isModal: false,
};
