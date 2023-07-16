import type { Meta, StoryObj } from '@storybook/react';
import BadgeToast, { BadgeToastProps } from './BadgeToast';
import { toast } from 'react-hot-toast';

const meta: Meta<typeof BadgeToast> = {
    title: 'NotToDo/Components/BadgeToast',
    component: BadgeToast,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ width: '400px', height: '600px', border: '1px solid black', position: 'relative' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;

type Story = StoryObj<BadgeToastProps>;

export const Primary: Story = {
    render: () => <div>
        <button
    </div>
};
