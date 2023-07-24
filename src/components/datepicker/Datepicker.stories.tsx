import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { DatePicker, DatePickerProps } from './Datepicker';
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: 'NotToDo/Components/DatePicker',
    component: DatePicker,
    tags: ['autodocs'],
    argTypes: {
        selected: {
            // options: ['sm', 'md', 'lg'],
            control: {
                type: 'input',
            },
            type: 'string',
            defaultValue: new Date(),
            description: '컨트롤 할 날짜 변수',
        },
        startDate: {
            control: false,
            defaultValue: new Date(),
            description: '시작날짜 범위 설정 시 사용하는 변수',
        },
        endDate: {
            control: false,
            defaultValue: new Date(),
            description: '마지막 날짜 범위 설정 시 사용하는 변수',
        },
        onChange: {
            type: 'function',
            description: '날짜 바뀔 때 실행할 함수 (SetAction)',
        },
        isModal: {
            defaultValue: false,
            description: '달력 컴포넌트를 모달 형태로 사용할지 여부 (일부 기능이 제한됨)',
        },
        markerDateObj: {
            control: false,
            defaultValue: {},
            description: '달력 일자에 일정이 있으면 마스킹 해줄 때 사용할 오브젝트',
        },
    },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<DatePickerProps>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Base: Story = (args: any) => {
    const [today, setToday] = useState<Date>(new Date());

    return <DatePicker {...args} selected={today} onChange={setToday} />;
};

Base.args = {
    isModal: false,
};

export const MarkerDatePicker: Story = (args: any) => {
    const [today, setToday] = useState<Date>(new Date());

    return <DatePicker {...args} selected={today} onChange={setToday} />;
};

MarkerDatePicker.args = {
    isModal: false,
    markerDateObj: {
        '2023-7-6': 'success',
        '2023-7-18': 'fail',
        '2023-7-19': 'warning',
    },
};

export const ModalDatePicker: Story = (args: any) => {
    const [today, setToday] = useState<Date>(new Date());
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className="flex flex-col items-center gap-2">
            <div
                className="w-[100px] h-[38px] flex justify-center items-center title2 hover:bg-gray-100 cursor-pointer rounded-lg bg-gray-300"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? '달력 닫기' : '달력 열기'}
            </div>
            <div className={`${isOpen ? '' : 'hidden'}`}>
                <DatePicker {...args} selected={today} onChange={setToday} />
            </div>
        </div>
    );
};

ModalDatePicker.args = {
    isModal: true,
};
