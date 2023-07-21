import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { ToggleButton, ToggleButtonProps } from './ToggleButton';
import { TextToggleButton } from './TextToggleButton';
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: 'NotToDo/Components/ToggleButton',
    component: ToggleButton,
    tags: ['autodocs'],
    argTypes: {
        size: {
            options: ['sm', 'md', 'lg'],
            control: {
                type: 'select',
            },
            defaultValue: 'md',
            description: '토글 버튼 사이즈',
        },
        isToggle: {
            control: {
                type: 'boolean',
            },
            description: '토글 온오프 변수',
            defaultValue: false,
        },
        onClick: {
            control: false,
            description: '토글 클릭 시 실행할 함수',
        },
    },
} satisfies Meta<typeof ToggleButton>;

export default meta;
type Story = StoryObj<ToggleButtonProps>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Base: Story = (args: any) => {
    const [isToggle, setIsToggle] = useState<boolean>(false);
    const handleToggle = () => {
        setIsToggle(!isToggle);
    };
    return <ToggleButton {...args} isToggle={isToggle} onClick={handleToggle} />;
};

Base.args = {
    size: 'md',
    isToggle: false,
    onClick: () => null,
};

export const Size = () => {
    const [isToggle, setIsToggle] = useState<boolean>(false);
    const handleToggle = () => {
        setIsToggle(!isToggle);
    };
    return (
        <div className="flex gap-2">
            <ToggleButton size="sm" isToggle={isToggle} onClick={handleToggle} />
            <ToggleButton isToggle={isToggle} onClick={handleToggle} />
            <ToggleButton size="lg" isToggle={isToggle} onClick={handleToggle} />
        </div>
    );
};

export const TextToggle = () => {
    const [isToggle, setIsToggle] = useState<boolean>(false);
    const handleToggle = () => {
        setIsToggle(!isToggle);
    };
    return <TextToggleButton isToggle={isToggle} onClick={handleToggle} activeMsg="월간" inactiveMsg="주간" />;
};
