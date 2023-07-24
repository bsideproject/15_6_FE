import { useState } from 'react';
import type { Meta } from '@storybook/react';

import { Popup } from './Popup';
import { AlertPopup, DeleteTitlePopup } from './PopupGroup';
import { BottomPopup as BPopup } from './BottomPopup';
import { Input } from '@/components/common/input/Input';
import { ReactComponent as Plus } from '@/assets/img/icn_plus.svg';
import { ReactComponent as Good } from '@/assets/img/icn_thumb_up.svg';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: 'NotToDo/Components/Popup',
    component: Popup,
    tags: ['autodocs'],
    argTypes: {
        isOpen: {
            type: 'boolean',
            defaultValue: false,
            description: '팝업창 오픈하기위한 변수',
        },
        setIsOpen: {
            description: '팝업창 컨트롤 함수',
        },
        children: {
            description: '팝업창 안에 들어갈 내용',
        },
    },
} satisfies Meta<typeof Popup>;

export default meta;
// type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const BasePopup = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleClose = () => {
        setIsOpen(false);
    };
    const handleOpen = () => {
        setIsOpen(true);
    };
    return (
        <>
            <button className="w-[100px] h-[30px] rounded-xl bg-primary-light" onClick={handleOpen}>
                기본 팝업
            </button>
            <Popup isOpen={isOpen} setIsOpen={setIsOpen}>
                <Popup.Body>
                    <span>문장을 넣어주세요.</span>
                </Popup.Body>
                <Popup.Footer>
                    <button className="w-full body1 text-gray-500" onClick={handleClose}>
                        취소
                    </button>
                    <button className="w-full title2 text-negative" onClick={handleClose}>
                        확인
                    </button>
                </Popup.Footer>
            </Popup>
        </>
    );
};

export const Alert = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOpen = () => {
        setIsOpen(true);
    };

    return (
        <>
            <button className="w-[100px] h-[30px] rounded-xl bg-primary-light" onClick={handleOpen}>
                알림 팝업
            </button>
            <AlertPopup isOpen={isOpen} setIsOpen={setIsOpen} message={<span>Alert 팝업 입니다.</span>} />
        </>
    );
};

export const TitlePopup = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOpen = () => {
        setIsOpen(true);
    };

    return (
        <>
            <button className="w-[100px] h-[30px] rounded-xl bg-primary-light" onClick={handleOpen}>
                타이틀 팝업
            </button>
            <DeleteTitlePopup
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                message={<span>타이틀 팝업 입니다.</span>}
                title="Title"
            />
        </>
    );
};

export const BottomPopup = () => {
    const [isSuccess, setIsSuccess] = useState<boolean>(true);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    return (
        <>
            <button className="w-[100px] h-[30px] rounded-xl bg-primary-light" onClick={handleOpen}>
                바텀 팝업
            </button>
            <BPopup isOpen={isOpen} setIsOpen={setIsOpen}>
                <div className="w-full h-auto flex justify-end mb-6">
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
                    onChange={handleChange}
                    placeHolder="코멘트 입력 (최소 4자)"
                    maxLength={400}
                    rows={3}
                    isScroll
                />
                <div className="h-10"></div>
                <button className="w-full h-[48px] bg-gray-900 rounded-lg text-gray-0">완료</button>
            </BPopup>
        </>
    );
};

export const BottomDetailPopup = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOpen = () => {
        setIsOpen(true);
    };

    return (
        <>
            <button className="w-[100px] h-[30px] rounded-xl bg-primary-light" onClick={handleOpen}>
                바텀 디테일 팝업
            </button>
            <BPopup isOpen={isOpen} setIsOpen={setIsOpen}>
                <div className="w-full h-auto flex justify-end mb-6">
                    <Plus className="rotate-45" fill="#A2A2A2" />
                </div>
                <div className="h-7"></div>
                <div className="w-full flex justify-between">
                    <div className="flex title2 gap-2">
                        <Good fill="#73EF5F" />
                        <span>성공 기록</span>
                    </div>
                    <span className="body2 text-gray-500">11:59 pm</span>
                </div>
                <div className="h-5"></div>
                <div className="body1">message</div>
                <div className="h-10"></div>
                <div className="flex gap-2">
                    <button className="w-full h-[48px] title2 bg-gray-50 rounded-lg text-negative">삭제</button>
                    <button className="w-full h-[48px] title2 bg-gray-50 rounded-lg text-gray-900">수정</button>
                </div>
            </BPopup>
        </>
    );
};
