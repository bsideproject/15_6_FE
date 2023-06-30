import { useState } from 'react';
import type { Meta } from '@storybook/react';

import { Popup } from './Popup';
import { AlertPopup, DeleteTitlePopup } from './PopupGroup';

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
