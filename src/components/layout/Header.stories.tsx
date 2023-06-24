import type { Meta, StoryObj } from '@storybook/react';

import { Header, HeaderProps } from './Header';
import { ReactComponent as Close } from '@/assets/img/icn_close.svg';
import { ReactComponent as ArrowBack } from '@/assets/img/icn_back.svg';
import { ReactComponent as Logo } from '@/assets/img/icn_logo.svg';
import { useState } from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: 'NotToDo/Layout/Header',
    component: Header,
    tags: ['autodocs'],
    argTypes: {
        height: {
            type: 'number',
            description: '헤더 레이아웃의 높이',
            defaultValue: 60,
        },
        title: {
            type: 'string',
            description: '헤더 레이아웃의 타이틀',
        },
    },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<HeaderProps>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Base: Story = (args: any) => {
    const [isLogo, setIsLogo] = useState<boolean>(false);
    const [isMenu, setIsMenu] = useState<boolean>(false);

    return (
        <div className="w-[360px] h-[640px] relative border">
            <Header {...args}>
                <Header.Leading>
                    {isLogo ? <Logo className="mt-[3px]" /> : <ArrowBack onClick={() => null} />}
                </Header.Leading>
                <Header.Actions>{isMenu ? <Close className="text-xl" /> : ''}</Header.Actions>
            </Header>
            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                <div
                    className="w-[100px] h-[30px] cursor-pointer rounded-xl bg-primary hover:bg-primary-light flex items-center justify-center"
                    onClick={() => setIsLogo(!isLogo)}
                >
                    {isLogo ? '로고로 변환' : '화살표로 변환'}
                </div>
                <div
                    className="w-[100px] h-[30px] cursor-pointer rounded-xl bg-primary hover:bg-primary-light flex items-center justify-center"
                    onClick={() => setIsMenu(!isMenu)}
                >
                    {isMenu ? '메뉴 지우기' : '오른쪽 메뉴'}
                </div>
            </div>
        </div>
    );
};

Base.args = {
    height: 60,
    title: 'Title',
};
