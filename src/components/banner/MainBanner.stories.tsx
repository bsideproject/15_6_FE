import type { Meta } from '@storybook/react';
import { MainBanner } from './MainBanner';

const meta: Meta<typeof MainBanner> = {
    title: 'NotToDo/Components/MainBanner',
    component: MainBanner,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            description: '버튼 타입',
        },
        disabled: {
            description: '버튼 활성화 여부',
        },
    },
    decorators: [
        (Story) => (
            <div style={{ width: '400px', height: '600px', border: '1px solid black', position: 'relative' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;

export const Primary = {
    render: () => <MainBanner></MainBanner>,
};
