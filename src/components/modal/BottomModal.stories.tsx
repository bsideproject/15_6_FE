import type { Meta, StoryObj } from '@storybook/react';
import { BottomModal, BottomModalProps } from './BottomModal';

const meta: Meta<typeof BottomModal> = {
    title: 'NotToDo/Components/BottomModal',
    component: BottomModal,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ width: '400px', height: '600px', border: '1px solid black', position: 'relative' }}>
                <div style={{ width: '400px', height: '600px', position: 'relative' }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit totam ipsa perferendis voluptates?
                    Eius vitae provident, impedit distinctio cum at pariatur suscipit magni sit numquam dolor velit
                    officia nihil voluptatibus.
                </div>
                <Story />
            </div>
        ),
    ],
};

export default meta;

type Story = StoryObj<BottomModalProps>;

export const Primary: Story = {
    render: () => (
        <BottomModal
            show
            onClose={() => {
                console.log('close');
            }}
        >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit totam ipsa perferendis voluptates? Eius vitae
            provident, impedit distinctio cum at pariatur suscipit magni sit numquam dolor velit officia nihil
            voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit totam ipsa perferendis
            voluptates? Eius vitae provident, impedit distinctio cum at pariatur suscipit magni sit numquam dolor velit
            officia nihil voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit totam ipsa
            perferendis voluptates? Eius vitae provident, impedit distinctio cum at pariatur suscipit magni sit numquam
            dolor velit officia nihil voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit totam
            ipsa perferendis voluptates? Eius vitae provident, impedit distinctio cum at pariatur suscipit magni sit
            numquam dolor velit officia nihil voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Fugit totam ipsa perferendis voluptates? Eius vitae provident, impedit distinctio cum at pariatur suscipit
            magni sit numquam dolor velit officia nihil voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Fugit totam ipsa perferendis voluptates? Eius vitae provident, impedit distinctio cum at pariatur
            suscipit magni sit numquam dolor velit officia nihil voluptatibus. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Fugit totam ipsa perferendis voluptates? Eius vitae provident, impedit distinctio cum at
            pariatur suscipit magni sit numquam dolor velit officia nihil voluptatibus. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Fugit totam ipsa perferendis voluptates? Eius vitae provident, impedit
            distinctio cum at pariatur suscipit magni sit numquam dolor velit officia nihil voluptatibus.
        </BottomModal>
    ),
};
