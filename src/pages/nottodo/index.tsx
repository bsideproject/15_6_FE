import { useState } from 'react';
import { Card } from '@/components/card/Card';
import { FloatingButton } from '@/components/buttons/floating/FloatingButton';
import { ReactComponent as ArrowDown } from '@/assets/img/icn_arrow_down.svg';
import { DashedButton } from '@/components/buttons/dashed/DashedButton';
import { Tabs } from '@/components/tab/Tabs';
import { Tab } from '@/components/tab/Tab';

// TODO get nottodo list
const fakeData = [
    {
        title: '긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트 긴글 테스트',
        goals: '',
        startDate: new Date('2023-06-25'),
        endDate: new Date('2023-07-15'),
    },
    // {
    //     title: 'title2',
    //     goals: '목표 입니다. 목표 입니다. 목표 입니다. 목표 입니다. 목표 입니다. 목표 입니다. 목표 입니다. 목표 입니다. 목표 입니다.',
    //     startDate: new Date('2023-06-25'),
    //     endDate: new Date('2023-07-01'),
    // },
    // { title: 'title3', goals: '', startDate: new Date('2023-06-01'), endDate: new Date('2023-06-15') },
    // { title: 'title3', goals: '', startDate: new Date('2023-06-01'), endDate: new Date('2023-06-15') },
    // { title: 'title3', goals: '', startDate: new Date('2023-06-01'), endDate: new Date('2023-06-15') },
    // { title: 'title3', goals: '', startDate: new Date('2023-06-01'), endDate: new Date('2023-06-15') },
];

export default function NotTodoPage() {
    const [isDesc, setIsDesc] = useState<boolean>(true);
    const [activeTab, setActiveTab] = useState<number>(0);
    const handleTabs = (idx: number) => {
        setActiveTab(idx);
    };

    return (
        <div className="flex flex-col min-h-[calc((100vh-60px)-56px)] bg-gray-50">
            <div className="sticky top-0">
                <Tabs>
                    <Tab active={activeTab} currentIdx={0} onClick={() => handleTabs(0)}>
                        <span>전체</span>
                    </Tab>
                    <Tab active={activeTab} currentIdx={1} onClick={() => handleTabs(1)}>
                        <span>진행중</span>
                    </Tab>
                    <Tab active={activeTab} currentIdx={2} onClick={() => handleTabs(2)}>
                        <span>진행 예정</span>
                    </Tab>
                    <Tab active={activeTab} currentIdx={3} onClick={() => handleTabs(3)}>
                        <span>종료</span>
                    </Tab>
                </Tabs>
            </div>
            <div className="flex justify-end px-[20px] my-[12px]">
                <div className="w-auto h-[36px] rounded-full border bg-white flex justify-center items-center px-[8px] cursor-pointer">
                    <div className="w-[16px] h-[16px] flex justify-center items-center mr-[4px]">
                        <ArrowDown />
                    </div>
                    <span className="mt-0.5">{isDesc ? '마감 최신순' : '마감 오래된순'}</span>
                </div>
            </div>
            {fakeData.map((v) => (
                <Card
                    className="mb-[8px]"
                    title={v.title}
                    startDate={v.startDate}
                    endDate={v.endDate}
                    goals={v.goals}
                />
            ))}
            {fakeData.length < 3 ? (
                <div className="px-[20px] mt-[24px]">
                    <DashedButton onClick={() => null}>
                        <span>+ 낫투두 추가하기</span>
                    </DashedButton>
                </div>
            ) : (
                <FloatingButton onClick={() => null} />
            )}
        </div>
    );
}
