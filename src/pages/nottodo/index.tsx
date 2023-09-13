import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/card/Card';
import { FloatingButton } from '@/components/buttons/floating/FloatingButton';
import { DashedButton } from '@/components/buttons/dashed/DashedButton';
import { Tabs } from '@/components/tab/Tabs';
import { Tab } from '@/components/tab/Tab';
import { BottomPopup } from '@/components/popup/BottomPopup';
import { DeleteTitlePopup } from '@/components/popup/PopupGroup';
import { Toast as toast } from '@/components/toast/Toast';
import { deleteNottodo, getNottodoList, orderBy } from '@/api/nottodo';

import { ReactComponent as ArrowDown } from '@/assets/img/icn_arrow_down.svg';
import { ReactComponent as Radio } from '@/assets/img/icn_radio.svg';
import { ReactComponent as RadioActive } from '@/assets/img/icn_radio_active.svg';
import { useRecoilState } from 'recoil';
import { currentNottodoState, nottodoProps, progressState } from '@/recoil/nottodo/atom';

export default function NotTodoPage() {
    const router = useNavigate();
    const [nottodoList, setNottodoList] = useState<nottodoProps[]>([]);
    const [currentNottodo, setCurrentNottodo] = useRecoilState<nottodoProps | null>(currentNottodoState);
    const [isDesc, setIsDesc] = useState<boolean>(true);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isSortOpen, setIsSortOpen] = useState<boolean>(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<number>(0);
    const [progressState, setProgressState] = useState<progressState>('');

    useEffect(() => {
        getNottodos(isDesc ? 'in_close' : 'in_distant');
    }, [isDesc]);

    const getNottodos = async (orderby: orderBy) => {
        const data = await getNottodoList(orderby);
        setNottodoList(data);
    };

    const handleTabs = (idx: number) => {
        setActiveTab(idx);
        if (idx === 1) {
            setProgressState('IN_PROGRESS');
        } else if (idx === 2) {
            setProgressState('BEFORE_START');
        } else if (idx === 3) {
            setProgressState('COMPLETE');
        } else {
            setProgressState('');
        }
    };

    const handleSort = (desc: boolean) => {
        setIsDesc(desc);
        setIsSortOpen(false);
    };

    const handleDeletePopupOpen = () => {
        setIsMenuOpen(false);
        setIsDeletePopupOpen(true);
    };

    const handleDelete = () => {
        if (currentNottodo) {
            deleteNottodo(currentNottodo?.notToDoId.toString()).then(() => {
                toast('낫투두 삭제가 완료되었어요.');
                getNottodos(isDesc ? 'in_close' : 'in_distant');
                setCurrentNottodo(null);
            });
        }
    };

    const handleOpenMenu = (nottodo: nottodoProps) => {
        setCurrentNottodo(nottodo);
        setIsMenuOpen(true);
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
                <div
                    className="w-auto h-[36px] rounded-full border bg-white flex justify-center items-center px-[8px] cursor-pointer"
                    onClick={() => setIsSortOpen(true)}
                >
                    <div className="w-[16px] h-[16px] flex justify-center items-center mr-[4px]">
                        <ArrowDown />
                    </div>
                    <span className="mt-0.5 pr-1">{isDesc ? '마감 최신순' : '마감 오래된순'}</span>
                </div>
            </div>
            {nottodoList
                .filter((v) => (progressState !== '' ? v.progressState === progressState : true))
                .map((v, index) => (
                    <Card
                        key={'card' + index}
                        className="mb-[8px]"
                        title={v.notToDoText}
                        startDate={new Date(v.startDate)}
                        endDate={new Date(v.endDate)}
                        goal={v.goal}
                        openMenu={() => handleOpenMenu(v)}
                    />
                ))}
            {nottodoList.filter((v) => (progressState !== '' ? v.progressState === progressState : true)).length < 3 ? (
                <div className="px-[20px] mt-[24px]">
                    <DashedButton onClick={() => router('/nottodo/create')}>
                        <span>+ 낫투두 추가하기</span>
                    </DashedButton>
                </div>
            ) : (
                <FloatingButton onClick={() => router('/nottodo/create')} />
            )}
            <BottomPopup isOpen={isMenuOpen} setIsOpen={setIsMenuOpen}>
                {currentNottodo?.progressState !== 'COMPLETE' && (
                    <>
                        <div
                            className="body1 w-full"
                            onClick={() => router(`/nottodo/edit/${currentNottodo?.notToDoId}`)}
                        >
                            낫투두 수정
                        </div>
                        <div className="h-[24px]" />
                    </>
                )}
                <div className="body1 w-full text-negative" onClick={handleDeletePopupOpen}>
                    낫투두 삭제
                </div>
            </BottomPopup>
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
