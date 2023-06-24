import type { Meta, StoryObj } from '@storybook/react';
import { ReactComponent as HomeOutline } from '@/assets/img/icn_home_outline.svg';
import { ReactComponent as ListOutline } from '@/assets/img/icn_list_outline.svg';
import { ReactComponent as BadgeOutline } from '@/assets/img/icn_badge_outline.svg';
import { ReactComponent as UserOutline } from '@/assets/img/icn_user_outline.svg';
import { ReactComponent as HomeSolid } from '@/assets/img/icn_home_solid.svg';
import { ReactComponent as ListSolid } from '@/assets/img/icn_list_solid.svg';
import { ReactComponent as BadgeSolid } from '@/assets/img/icn_badge_solid.svg';
import { ReactComponent as UserSolid } from '@/assets/img/icn_user_solid.svg';

import { BottomNavbar, BottomNavbarProps } from './BottomNavbar';
import { useState } from 'react';
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: 'NotToDo/Layout/BottomNavbar',
    component: BottomNavbar,
    tags: ['autodocs'],
    argTypes: {
        height: {
            type: 'number',
            description: '바텀 네비바의 높이',
            defaultValue: 40,
        },
    },
} satisfies Meta<typeof BottomNavbar>;

export default meta;
type Story = StoryObj<BottomNavbarProps>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Base: Story = (args: any) => {
    const navCount = 4;
    const [isState, setIsState] = useState<number>(0);
    const bottomMenuItem = (
        menuName: string,
        path: number,
        defaultImg: React.ReactNode,
        activeImg: React.ReactNode,
    ) => {
        return (
            <div
                className={`flex flex-col justify-center items-center gap-1 ${
                    isState === path ? 'text-primary' : 'text-gray-500'
                }`}
                style={{ width: `calc(100%/${navCount})` }}
                onClick={() => setIsState(path)}
            >
                {isState === path ? activeImg : defaultImg}
                <span>{menuName}</span>
            </div>
        );
    };
    return (
        <div className="w-[360px] h-[640px] relative border">
            <BottomNavbar {...args}>
                {bottomMenuItem('홈', 0, <HomeOutline className="w-full" />, <HomeSolid className="w-full" />)}
                {bottomMenuItem('리스트', 1, <ListOutline className="w-full" />, <ListSolid className="w-full" />)}
                {bottomMenuItem('뱃지', 2, <BadgeOutline className="w-full" />, <BadgeSolid className="w-full" />)}
                {bottomMenuItem('마이페이지', 3, <UserOutline className="w-full" />, <UserSolid className="w-full" />)}
            </BottomNavbar>
        </div>
    );
};

Base.args = {
    height: 56,
};
