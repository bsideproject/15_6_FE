import { useEffect, useState, useRef } from 'react';

const apm = ['오전', '오후'];
const hour = Array.from(Array(12).keys());
const min = Array.from(Array(60).keys());

interface ScrollablePicker {
    time: string;
    setTime: React.Dispatch<React.SetStateAction<string>>;
}

export const ScrollablePicker = (props: ScrollablePicker) => {
    const { setTime } = props;
    const [_, setPosition] = useState(0);
    const [currentHourIndex, setCurrentHourIndex] = useState<number>(0);
    const [currentMinIndex, setCurrentMinIndex] = useState<number>(0);
    const [currentApmIndex, setCurrentApmIndex] = useState<number>(0);
    const hourRef = useRef<HTMLDivElement>(null);
    const minRef = useRef<HTMLDivElement>(null);
    const apmRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const itemHeight = 20;
        let timer: any = null;

        const apmStartScroll = () => {
            // 스크롤 위치 계산
            const scrollPosition = apmRef.current?.scrollTop || 0;
            setPosition(scrollPosition);

            // 가장 가까운 항목 계산
            const closestItemIndex = Math.round(scrollPosition / itemHeight);
            setCurrentApmIndex(closestItemIndex);

            // 이전에 설정한 타이머가 있다면 취소
            if (timer) {
                clearTimeout(timer);
            }
            // 스크롤 이벤트가 종료되었을 때 가장 가까운 항목으로 이동
            timer = setTimeout(() => {
                apmRef.current?.scrollTo({
                    top: closestItemIndex * itemHeight,
                    behavior: 'smooth',
                });
            }, 100); // 100ms 동안 스크롤이 없으면 스크롤 이벤트 종료로 간주
        };

        const hourStartScroll = () => {
            // 스크롤 위치 계산
            const scrollPosition = hourRef.current?.scrollTop || 0;
            setPosition(scrollPosition);

            // 가장 가까운 항목 계산
            const closestItemIndex = Math.round(scrollPosition / itemHeight);
            setCurrentHourIndex(closestItemIndex);

            // 이전에 설정한 타이머가 있다면 취소
            if (timer) {
                clearTimeout(timer);
            }
            // 스크롤 이벤트가 종료되었을 때 가장 가까운 항목으로 이동
            timer = setTimeout(() => {
                hourRef.current?.scrollTo({
                    top: closestItemIndex * itemHeight,
                    behavior: 'smooth',
                });
            }, 100); // 100ms 동안 스크롤이 없으면 스크롤 이벤트 종료로 간주
        };

        const minStartScroll = () => {
            // 스크롤 위치 계산
            const scrollPosition = minRef.current?.scrollTop || 0;
            setPosition(scrollPosition);

            // 가장 가까운 항목 계산
            const closestItemIndex = Math.round(scrollPosition / itemHeight);
            setCurrentMinIndex(closestItemIndex);

            // 이전에 설정한 타이머가 있다면 취소
            if (timer) {
                clearTimeout(timer);
            }
            // 스크롤 이벤트가 종료되었을 때 가장 가까운 항목으로 이동
            timer = setTimeout(() => {
                minRef.current?.scrollTo({
                    top: closestItemIndex * itemHeight,
                    behavior: 'smooth',
                });
            }, 100); // 100ms 동안 스크롤이 없으면 스크롤 이벤트 종료로 간주
        };

        apmRef.current?.addEventListener('scroll', apmStartScroll);
        hourRef.current?.addEventListener('scroll', hourStartScroll);
        minRef.current?.addEventListener('scroll', minStartScroll);
        return () => {
            apmRef.current?.addEventListener('scroll', apmStartScroll);
            hourRef.current?.addEventListener('scroll', hourStartScroll);
            minRef.current?.addEventListener('scroll', minStartScroll);
        };
    }, []);

    useEffect(() => {
        const Hour = hour[currentHourIndex] + 1;
        const time = apm[currentApmIndex] + ' ' + Hour + '시' + ' ' + min[currentMinIndex] + '분';
        setTime(time);
    }, [currentApmIndex, currentHourIndex, currentMinIndex]);

    const rotateClass = (divIndex: number, curIndex: number) => {
        const index = divIndex - curIndex;
        switch (index) {
            // case -3:
            //     return 'rotate-up-1';
            case -2:
                return 'rotate-up-1';
            case -1:
                return 'rotate-up-2';
            case 1:
                return 'rotate-down-1';
            case 2:
                return 'rotate-down-2';
            // case 3:
            //     return 'rotate-down-3';
            default:
                break;
        }
    };

    return (
        <div className="wrapper w-full h-[100px] overflow-hidden relative body1">
            {/* <div className="divider absolute top-1/3 w-full h-[1px] bg-black"></div>
            <div className="divider absolute top-2/3 w-full h-[1px] bg-black"></div> */}
            <div className="viewer w-full h-full flex px-12">
                <div ref={apmRef} className="apm flex flex-col w-1/3 items-center overflow-y-scroll hide-scroll">
                    <div className="h-[20px] shrink-0 flex justify-center items-center" />
                    <div className="h-[20px] shrink-0 flex justify-center items-center" />
                    {apm.map((v, index) => (
                        <div
                            key={'apm' + index}
                            className={`h-[20px] shrink-0 flex justify-center items-center ${
                                currentApmIndex !== index ? 'text-gray-300' : ''
                            } ${rotateClass(index, currentApmIndex)}`}
                        >
                            {v}
                        </div>
                    ))}
                    <div className="h-[20px] shrink-0 flex justify-center items-center" />
                    <div className="h-[20px] shrink-0 flex justify-center items-center" />
                </div>
                <div ref={hourRef} className="hour flex flex-col w-1/3 items-center overflow-y-scroll hide-scroll">
                    <div className="h-[20px] shrink-0 flex justify-center items-center" />
                    <div className="h-[20px] shrink-0 flex justify-center items-center" />
                    {hour.map((v, index) => (
                        <div
                            key={'hour' + index}
                            className={`h-[20px] shrink-0 flex justify-center items-center ${
                                currentHourIndex !== index ? 'text-gray-300' : ''
                            } ${rotateClass(index, currentHourIndex)}`}
                        >
                            {v + 1}
                        </div>
                    ))}
                    <div className="h-[20px] shrink-0 flex justify-center items-center" />
                    <div className="h-[20px] shrink-0 flex justify-center items-center" />
                </div>
                <div ref={minRef} className="hour flex flex-col w-1/3 items-center overflow-y-scroll hide-scroll">
                    <div className="h-[20px] shrink-0 flex justify-center items-center" />
                    <div className="h-[20px] shrink-0 flex justify-center items-center" />
                    {min.map((v, index) => (
                        <div
                            key={'min' + index}
                            className={`h-[20px] shrink-0 flex justify-center items-center ${
                                currentMinIndex !== index ? 'text-gray-300' : ''
                            } ${rotateClass(index, currentMinIndex)}`}
                        >
                            {index < 10 ? '0' + v : v}
                        </div>
                    ))}
                    <div className="h-[20px] shrink-0 flex justify-center items-center" />
                    <div className="h-[20px] shrink-0 flex justify-center items-center" />
                </div>
            </div>
            <div className="divider absolute top-[35%] left-0 w-full h-[30px] bg-gray-50 rounded-lg -z-10"></div>
        </div>
    );
};
