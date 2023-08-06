import { atom } from 'recoil';

export type progressState = 'BEFORE_START' | 'IN_PROGRESS' | 'COMPLETE' | '';
export interface nottodoProps {
    notToDoText: string;
    startDate: string;
    endDate: string;
    goal?: string;
    cheerUpMsg1?: string;
    cheerUpMsg2?: string;
    cheerUpMsg3?: string;
}
export interface nottodoWithIdProps extends nottodoProps {
    notToDoId: string;
    progressState: progressState;
}

export const currentNottodoState = atom<nottodoWithIdProps | null>({
    key: 'currentNottodoState',
    default: null,
});
