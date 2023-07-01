import { useState } from 'react';
import { Card } from '@/components/card/Card';
import { FloatingButton } from '@/components/buttons/floating/FloatingButton';
import { DashedButton } from '@/components/buttons/dashed/DashedButton';
import { Tabs } from '@/components/tab/Tabs';
import { Tab } from '@/components/tab/Tab';
import { BottomPopup } from '@/components/popup/BottomPopup';
import { DeleteTitlePopup } from '@/components/popup/PopupGroup';
import { Toast as toast } from '@/components/toast/Toast';

import { ReactComponent as ArrowDown } from '@/assets/img/icn_arrow_down.svg';
import { ReactComponent as Radio } from '@/assets/img/icn_radio.svg';
import { ReactComponent as RadioActive } from '@/assets/img/icn_radio_active.svg';

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
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isSortOpen, setIsSortOpen] = useState<boolean>(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<number>(0);

    const handleTabs = (idx: number) => {
        setActiveTab(idx);
    };

    const handleSort = (bool: boolean) => {
        setIsDesc(bool);
    };

    const handleDeletePopupOpen = () => {
        setIsMenuOpen(false);
        setIsDeletePopupOpen(true);
    };

    const handleDelete = () => {
        // TODO 낫투두 삭제하는 api 연결
        toast('낫투두 삭제가 완료되었어요.');
    };

    return (
        <div className="flex flex-col min-h-[calc((100vh-60px)-56px)] bg-gray-50">
            <div className="sticky top-0">
                {/* TODO filtering */}
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
            <div className="flex justify-end px-[20px] my-[12px]" onClick={() => setIsSortOpen(true)}>
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
                    openMenu={() => setIsMenuOpen(true)}
                />
            ))}
            {/* TODO 라우터로 낫투두 생성 페이지 */}
            {fakeData.length < 3 ? (
                <div className="px-[20px] mt-[24px]">
                    <DashedButton onClick={() => null}>
                        <span>+ 낫투두 추가하기</span>
                    </DashedButton>
                </div>
            ) : (
                <FloatingButton onClick={() => null} />
            )}
            {/* TODO 라우터로 수정 페이지 타게 하고 삭제는 팝업 띄워서 로직 진행 */}
            <BottomPopup isOpen={isMenuOpen} setIsOpen={setIsMenuOpen}>
                <div className="body1 w-full" onClick={() => null}>
                    낫투두 수정
                </div>
                <div className="h-[24px]" />
                <div className="body1 w-full text-negative" onClick={handleDeletePopupOpen}>
                    낫투두 삭제
                </div>
            </BottomPopup>
            {/* TODO 정렬 기능 */}
            <BottomPopup title="정렬" isOpen={isSortOpen} setIsOpen={setIsSortOpen}>
                <div className="body1 flex w-full items-center cursor-pointer" onClick={() => handleSort(true)}>
                    {isDesc ? <RadioActive /> : <Radio />}
                    <span className="ml-3">도전 마감일 최신순</span>
                </div>
                <div className="h-[24px]" />
                <div className="body1 flex w-full items-center cursor-pointer" onClick={() => handleSort(false)}>
                    {!isDesc ? <RadioActive /> : <Radio />}
                    <span className="ml-3">도전 마감일 오래된순</span>
                </div>
            </BottomPopup>
            <DeleteTitlePopup
                title="낫투두 삭제"
                isOpen={isDeletePopupOpen}
                setIsOpen={setIsDeletePopupOpen}
                onClick={handleDelete}
                message={
                    <div className="flex flex-col">
                        <span>절제 기록을 포함한 모든 내용이 사라져요.</span>
                        <span>정말 삭제하시겠어요?</span>
                    </div>
                }
            />
        </div>
    );
}
