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
        onChange: {
            type: 'function',
            description: '날짜 바뀔 때 실행할 함수 (SetAction)',
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

Base.args = {};
