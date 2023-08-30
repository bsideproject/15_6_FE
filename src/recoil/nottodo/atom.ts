import { atom } from 'recoil';

export type progressState = 'BEFORE_START' | 'IN_PROGRESS' | 'COMPLETE' | '';
export interface cheerupMessage {
    uesrId: number;
    cheerUpMsgId: number;
    content: string;
    useYn: string;
    dspOrder: number;
}
export interface nottodoProps {
    notToDoId: number;
    notToDoText: string;
    goal: string;
    progressState: progressState;
    startDate: string;
    endDate: string;
    useYn: string;
    cheerUpMessageList: cheerupMessage[];
}
export interface nottodoPostProps {
    notToDoText: string;
    startDate: string;
    endDate: string;
    goal?: string;
    cheerUpMsg1?: string;
    cheerUpMsg2?: string;
    cheerUpMsg3?: string;
}

export const currentNottodoState = atom<nottodoProps | null>({
    key: 'currentNottodoState',
    default: null,
});
