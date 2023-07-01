import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ReactComponent as Kakao } from '@/assets/img/icn_kakao.svg';

import { Input, InputProps } from './Input';
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: 'NotToDo/Components/Input',
    component: Input,
    tags: ['autodocs'],
    argTypes: {
        value: {
            defaultValue: '',
            description: 'input value',
        },
        label: {
            defaultValue: null,
            description: '라벨 영역에 들어갈 값',
        },
        placeHolder: {
            defaultValue: '',
            description: 'input placeholder',
        },
        helperText: {
            defaultValue: '',
            description: '경고, 알림 문자를 input 밑에 표시',
        },
        isWarning: {
            defaultValue: false,
            description: 'input의 값이 유효한지 여부',
        },
        disabled: {
            defaultValue: false,
            description: '비활성화 여부',
        },
        icon: {
            defaultValue: '',
            description: 'input 오른쪽에 나타낼 아이콘 `string | ReactNode`',
            control: false,
        },
        setValue: {
            type: 'function',
            defaultValue: () => null,
            description: 'input value 세팅 함수 `React.Dispatch<React.SetStateAction<string>>`',
            control: false,
        },
        onChange: {
            type: 'function',
            defaultValue: () => null,
            description: 'input 이벤트 함수 `React.ChangeEventHandler<HTMLInputElement> | undefined`',
            control: false,
        },
    },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<InputProps>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Base: Story = (args: any) => {
    const [value, setValue] = useState<string>('');
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };
    return <Input {...args} value={value} setValue={setValue} onChange={handleOnChange} />;
};

Base.args = {
    label: '',
    placeHolder: 'placeholder',
    helperText: '',
    isWarning: false,
    disabled: false,
    icon: '',
};

export const IconInput: Story = (args: any) => {
    const [value, setValue] = useState<string>('');
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };
    return <Input {...args} value={value} setValue={setValue} onChange={handleOnChange} />;
};

IconInput.args = {
    label: '',
    placeHolder: 'with icon',
    helperText: '',
    isWarning: false,
    disabled: false,
    icon: <Kakao />,
};
