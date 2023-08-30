import type { Meta } from '@storybook/react';
import Carousel from './Carousel';

const meta: Meta<typeof Carousel> = {
    title: 'NotToDo/Components/Carousel',
    component: Carousel,
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

export const Primary = {
    render: () => (
        <Carousel
            onActive={(index) => {
                console.log('active', index);
            }}
            onHalfActive={() => null}
        >
            <Carousel.ItemContainer>
                <Carousel.Item index={0}>
                    <div className="inline-flex w-full h-[200px] bg-gray-300 items-center justify-center">Page 1</div>
                </Carousel.Item>
                <Carousel.Item index={1}>
                    <div className="inline-flex w-full h-[200px] bg-gray-300 items-center justify-center">Page 2</div>
                </Carousel.Item>
                <Carousel.Item index={2}>
                    <div className="inline-flex w-full h-[200px] bg-gray-300 items-center justify-center">Page 3</div>
                </Carousel.Item>
            </Carousel.ItemContainer>
            <Carousel.Pagination
                bulletClass="mx-1 inline-block w-2 h-2 rounded-full bg-gray-900/30"
                activeBulletClass="mx-1 inline-block w-2 h-2 rounded-full bg-gray-900"
                wrapperClass="w-full inline-flex absolute top-5 justify-center"
            />
        </Carousel>
    ),
};
