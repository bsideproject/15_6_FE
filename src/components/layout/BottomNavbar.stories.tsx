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
    return (
        <div className="w-[360px] h-[640px] relative border">
            <BottomNavbar {...args}>
                <div style={{ width: `calc(100%/${navCount})` }} onClick={() => setIsState(0)}>
                    {isState === 0 ? <HomeSolid className="w-full" /> : <HomeOutline className="w-full" />}
                </div>
                <div style={{ width: `calc(100%/${navCount})` }} onClick={() => setIsState(1)}>
                    {isState === 1 ? <ListSolid className="w-full" /> : <ListOutline className="w-full" />}
                </div>
                <div style={{ width: `calc(100%/${navCount})` }} onClick={() => setIsState(2)}>
                    {isState === 2 ? <BadgeSolid className="w-full" /> : <BadgeOutline className="w-full" />}
                </div>
                <div style={{ width: `calc(100%/${navCount})` }} onClick={() => setIsState(3)}>
                    {isState === 3 ? <UserSolid className="w-full" /> : <UserOutline className="w-full" />}
                </div>
            </BottomNavbar>
        </div>
    );
};

Base.args = {
    height: 48,
};
