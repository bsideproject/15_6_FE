import type { Meta } from '@storybook/react';
import { MainBanner } from './MainBanner';

const meta: Meta<typeof MainBanner> = {
    title: 'NotToDo/Components/MainBanner',
    component: MainBanner,
    tags: ['autodocs'],
    argTypes: {},
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
    render: () => <MainBanner onChange={() => null} banners={[]}></MainBanner>,
};
