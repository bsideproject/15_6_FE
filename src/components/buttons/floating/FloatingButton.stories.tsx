import type { Meta, StoryObj } from '@storybook/react';
import { ReactComponent as Plus } from '@/assets/img/icn_plus.svg';
import { ReactComponent as Good } from '@/assets/img/icn_thumb_up.svg';
import { ReactComponent as Bad } from '@/assets/img/icn_thumb_down.svg';

import { FloatingButton, FloatingButtonProps } from './FloatingButton';
import { FloatingMenuButton } from './FloatingMenuButton';
import { useState } from 'react';
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: 'NotToDo/Components/FloatingButton',
    component: FloatingButton,
    tags: ['autodocs'],
    argTypes: {
        onClick: {
            control: false,
        },
        className: {
            control: false,
        },
    },
} satisfies Meta<typeof FloatingButton>;

export default meta;
type Story = StoryObj<FloatingButtonProps>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Base: Story = (args: any) => {
    return (
        <div className="w-[360px] h-[640px] relative border">
            <FloatingButton {...args} className="absolute" />
            <div className="absolute bottom-0 border-t-2 w-full h-[56px] flex justify-center items-center">
                bottom nav
            </div>
        </div>
    );
};

Base.args = {};

export const MenuFloatingButton: Story = (args: any) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleOpen = () => {
        setIsOpen(!isOpen);
    };
    const handleClick = () => {
        console.log('click');
        setIsOpen(false);
    };
    return (
        <div className="w-[360px] h-[640px] relative border">
            <FloatingMenuButton className="absolute" isOpen={isOpen} setIsOpen={setIsOpen}>
                <FloatingMenuButton.Trigger className="w-[52px] h-[52px]">
                    <div
                        className={`${
                            isOpen ? 'bg-transparent' : 'bg-gray-900'
                        } w-full h-full flex justify-center items-center rounded-full`}
                        onClick={handleOpen}
                    >
                        <Plus className={`${isOpen ? 'rotate-45' : 'rotate-0'} transition-all`} />
                    </div>
                </FloatingMenuButton.Trigger>
                <FloatingMenuButton.Menu>
                    <div className="flex w-full h-full relative" onClick={handleClick}>
                        <span className="absolute w-[calc(100%*2)] right-full top-1/2 -translate-y-1/2 text-right mr-4 title2 text-gray-0">
                            성공 기록
                        </span>
                        <div className="w-[52px] h-[52px] rounded-full flex justify-center items-center bg-postive cursor-pointer">
                            <Good />
                        </div>
                    </div>
                    <div className="flex w-full h-full relative" onClick={handleClick}>
                        <span className="absolute w-[calc(100%*2)] right-full top-1/2 -translate-y-1/2 text-right mr-4 title2 text-gray-0">
                            실패 기록
                        </span>
                        <div className="w-[52px] h-[52px] rounded-full flex justify-center items-center bg-negative cursor-pointer">
                            <Bad />
                        </div>
                    </div>
                </FloatingMenuButton.Menu>
            </FloatingMenuButton>
            <div className="absolute bottom-0 border-t-2 w-full h-[56px] flex justify-center items-center">
                bottom nav
            </div>
        </div>
    );
};

MenuFloatingButton.args = {};
