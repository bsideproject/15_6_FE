import { useEffect, useState } from 'react';
import { FloatingMenuButton } from '@/components/buttons/floating/FloatingMenuButton';
import { DatePicker } from '@/components/datepicker/Datepicker';
import { BottomPopup } from '@/components/popup/BottomPopup';
import { Input } from '@/components/common/input/Input';
import { ConfirmPopup } from '@/components/popup/PopupGroup';
import { Toast } from '@/components/toast/Toast';

import { ReactComponent as Plus } from '@/assets/img/icn_plus.svg';
import { ReactComponent as Good } from '@/assets/img/icn_thumb_up.svg';
import { ReactComponent as Bad } from '@/assets/img/icn_thumb_down.svg';
import { ReactComponent as Empty } from '@/assets/img/icn_empty.svg';

import { MainBanner, NotToDoBannerItemProps } from '@/components/banner/MainBanner';
import { getNottodoList } from '@/api/nottodo';
import { nottodoWithIdProps } from '@/recoil/nottodo/atom';
import { diffDay } from '@/utils/datepicker';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);
    const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = useState<boolean>(false);
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
    const [isOpenCreatePopup, setIsOpenCreatePopup] = useState<boolean>(false);
    const [isOpenDetailPopup, setIsDetailPopup] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [inputWarning, setInputWarning] = useState<boolean>(false);
    const [formattedNotToDoList, setFormattedNotToDoList] = useState<NotToDoBannerItemProps[]>([]);

    useEffect(() => {
        const getNottodos = async () => {
            const data = await getNottodoList('in_close');
            setFormattedNotToDoList(
                data
                    .filter((item: nottodoWithIdProps) => item.progressState === 'IN_PROGRESS')
                    .map((item: nottodoWithIdProps) => ({
                        id: item.notToDoId,
                        title: item.goal,
                        description: item.notToDoText,
                        totalDate: diffDay(item.endDate, item.startDate),
                        success: diffDay(new Date(), item.startDate),
                    })),
            );
        };

        getNottodos();
        // 절제기록 목록 api
    }, []);

    const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        if (e.target.value.length > 4) {
            setInputWarning(false);
        }
    };

    const handleOpenBottomPopup = (success: boolean) => {
        setIsOpenMenu(false);
        setIsOpenCreatePopup(true);
        setIsSuccess(success);
    };

    const handleCreateRecord = () => {
        if (inputValue.length < 4) {
            setInputWarning(true);
        }
        // TODO 등록 api 실행
        setIsOpenCreatePopup(false);
        setInputValue('');
        Toast(
            isSuccess ? (
                '성공 기록 완료! 👍'
            ) : (
                <div className="flex flex-col items-center">
                    <span>실패도 경험이죠!</span>
                    <span>다음엔 꼭 성공해주실거죠? 😉</span>
                </div>
            ),
        );
    };

    const handleDeleteRecord = () => {
        // TODO delete api
        setIsDetailPopup(false);
        Toast('절제 기록 삭제가 완료되었어요.');
    };

    const handleOpenEdit = () => {
        // TODO 디테일 팝업 열면서 얻은 message 가져오기
        setInputValue('');
        setIsOpenCreatePopup(true);
    };

    if (formattedNotToDoList.length === 0) {
        return <NoNotToDos />;
    }

    return (
        <div>
            <MainBanner banners={formattedNotToDoList} onChange={console.log} />
            <div className="px-5">
                <DatePicker selected={startDate} onChange={setStartDate} isWeekMode todayAfterDisabled />
                <div className="w-full h-[1px] bg-gray-50"></div>
                {/* 기록 없는 날 */}
                <div className="h-8"></div>
                <div className="w-full h-[120px] bg-gray-50 flex items-center justify-center rounded-lg">
                    <button
                        className="w-[140px] h-[48px] bg-gray-900 text-white rounded-lg"
                        onClick={() => handleOpenBottomPopup(true)}
                    >
                        기록 추가
                    </button>
                </div>

                {/* 기록 있는 날 */}
                <FloatingMenuButton isOpen={isOpenMenu} setIsOpen={setIsOpenMenu}>
                    <FloatingMenuButton.Trigger className="w-[52px] h-[52px]">
                        <div
                            className={`${
                                isOpenMenu ? 'bg-transparent' : 'bg-gray-900'
                            } w-full h-full flex justify-center items-center rounded-full`}
                            onClick={() => setIsOpenMenu(!isOpenMenu)}
                        >
                            <Plus className={`${isOpenMenu ? 'rotate-45' : 'rotate-0'} transition-all`} fill="white" />
                        </div>
                    </FloatingMenuButton.Trigger>
                    <FloatingMenuButton.Menu>
                        <div className="flex w-full h-full relative" onClick={() => handleOpenBottomPopup(true)}>
                            <span className="absolute w-[calc(100%*2)] right-full top-1/2 -translate-y-1/2 text-right mr-4 title2 text-gray-0">
                                성공 기록
                            </span>
                            <div className="w-[52px] h-[52px] rounded-full flex justify-center items-center bg-postive cursor-pointer">
                                <Good fill="white" />
                            </div>
                        </div>
                        <div className="flex w-full h-full relative" onClick={() => handleOpenBottomPopup(false)}>
                            <span className="absolute w-[calc(100%*2)] right-full top-1/2 -translate-y-1/2 text-right mr-4 title2 text-gray-0">
                                실패 기록
                            </span>
                            <div className="w-[52px] h-[52px] rounded-full flex justify-center items-center bg-negative cursor-pointer">
                                <Bad fill="white" />
                            </div>
                        </div>
                    </FloatingMenuButton.Menu>
                </FloatingMenuButton>
                <BottomPopup isOpen={isOpenCreatePopup} setIsOpen={setIsOpenCreatePopup}>
                    <div className="w-full h-auto flex justify-end mb-6" onClick={() => setIsOpenConfirm(true)}>
                        <Plus className="rotate-45" fill="#A2A2A2" />
                    </div>
                    <div className="w-full h-12 rounded-lg flex bg-gray-50 relative">
                        <div
                            className={`w-1/2 h-full absolute top-0 rounded-lg transition-all ${
                                isSuccess ? 'bg-postive left-0' : 'bg-negative left-1/2'
                            }`}
                        />
                        <button
                            className={`w-full z-10 ${isSuccess ? 'text-gray-900' : 'text-gray-500'}`}
                            onClick={() => setIsSuccess(true)}
                        >
                            성공 기록
                        </button>
                        <button
                            className={`w-full z-10 ${isSuccess ? 'text-gray-500' : 'text-gray-900'}`}
                            onClick={() => setIsSuccess(false)}
                        >
                            실패 기록
                        </button>
                    </div>
                    <div className="h-4"></div>
                    <Input
                        type="textarea"
                        value={inputValue}
                        setValue={setInputValue}
                        onChange={handleInputValue}
                        placeHolder="코멘트 입력 (최소 4자)"
                        isWarning={inputWarning}
                        helperText={inputWarning ? '4자 이상 입력해주세요.' : ''}
                        maxLength={400}
                        rows={3}
                        isScroll
                    />
                    <div className="h-10"></div>
                    {/* TODO api 연결 */}
                    <button className="w-full h-[48px] bg-gray-900 rounded-lg text-gray-0" onClick={handleCreateRecord}>
                        완료
                    </button>
                </BottomPopup>
                <BottomPopup isOpen={isOpenDetailPopup} setIsOpen={setIsDetailPopup}>
                    <div className="w-full h-auto flex justify-end mb-6" onClick={() => setIsDetailPopup(false)}>
                        <Plus className="rotate-45" fill="#A2A2A2" />
                    </div>
                    <div className="h-7"></div>
                    <div className="w-full flex justify-between">
                        {/* TODO 내용에 맞게 설정 */}
                        <div className="flex title2 gap-2">
                            <Good fill="#73EF5F" />
                            <span>성공 기록</span>
                        </div>
                        <span className="body2 text-gray-500">11:59 pm</span>
                    </div>
                    <div className="h-5"></div>
                    {/* TODO message 내용에 맞게 설정 */}
                    <div className="body1">message</div>
                    <div className="h-10"></div>
                    <div className="flex gap-2">
                        <button
                            className="w-full h-[48px] title2 bg-gray-50 rounded-lg text-negative"
                            onClick={() => setIsOpenDeleteConfirm(true)}
                        >
                            삭제
                        </button>
                        <button
                            className="w-full h-[48px] title2 bg-gray-50 rounded-lg text-gray-900"
                            onClick={handleOpenEdit}
                        >
                            수정
                        </button>
                    </div>
                </BottomPopup>
                <ConfirmPopup
                    isOpen={isOpenConfirm}
                    setIsOpen={setIsOpenConfirm}
                    onClick={() => setIsOpenCreatePopup(false)}
                    message={<span>등록을 종료하시겠습니까?</span>}
                />
                <ConfirmPopup
                    isOpen={isOpenDeleteConfirm}
                    setIsOpen={setIsOpenDeleteConfirm}
                    onClick={handleDeleteRecord}
                    message={<span>나의 절제 기록이 사라져요. 정말로 삭제하시겠어요?</span>}
                    confrimString="삭제"
                />
            </div>
        </div>
    );
}

const NoNotToDos = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center">
            <Empty className="mt-40 mb-1" />
            <span className="mb-10 flex flex-col items-center text-gray-500 text-base font-suit-bold">
                <p>아래 버튼을 눌러</p>
                <p>새로운 낫투두를 등록해주세요.</p>
            </span>
            <button
                className="w-[182px] py-3 px-10 bg-primary text-base font-suit-bold rounded-lg"
                onClick={() => navigate('/nottodo/create')}
            >
                낫투두 등록하기
            </button>
        </div>
    );
};
