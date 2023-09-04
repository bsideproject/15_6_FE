import { get } from './core';

export interface badgeDate {
    regDtm: string;
}
export interface badge {
    badgeId: string;
    badgeName: string;
    badgeCnt: number;
    imageUrl: string;
    explanation: string;
    qualification: string;
    gainDate: badgeDate[];
    gainYn: 'Y' | 'N';
}
export const getBadges = async (): Promise<badge[]> => {
    return await get('/badge/list');
};
