import type { Meta, StoryObj } from '@storybook/react';
import { BottomButton, BottomButtonProps } from './BottomButton';

const meta: Meta<typeof BottomButton> = {
    title: 'NotToDo/Components/BottomButton',
    component: BottomButton,
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

type Story = StoryObj<BottomButtonProps>;

export const Primary: Story = {
    render: () => (
        <BottomButton variant={'primary'} clickHandler={() => {}}>
            Primary
        </BottomButton>
    ),
};

export const PrimaryDisabled: Story = {
    render: () => (
        <BottomButton variant={'primary'} disabled clickHandler={() => {}}>
            Primary
        </BottomButton>
    ),
};

export const Secondary: Story = {
    render: () => (
        <BottomButton variant={'secondary'} clickHandler={() => {}}>
            Secondary
        </BottomButton>
    ),
};

export const SecondaryDisabled: Story = {
    render: () => (
        <BottomButton variant={'secondary'} disabled clickHandler={() => {}}>
            Secondary
        </BottomButton>
    ),
};
