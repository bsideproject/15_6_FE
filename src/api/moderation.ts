import { deleteApi, get, post, put } from './core';

export const getModeration = (recordId: string | number) => {
    return get(`/moderationRecord/${recordId}`);
};

export const deleteModeration = (recordId: string | number) => {
    return deleteApi(`/moderationRecord/${recordId}`);
};

type ModerationParamType = {
    content: string;
    recordType: 'success' | 'fail';
};

export const putModeration = (recordId: string | number, param: ModerationParamType) => {
    return put(`/moderationRecord/${recordId}`, param);
};

export const postModeration = (notToDoId: string | number, param: ModerationParamType) => {
    return post(`moderationRecord/ntdId/${notToDoId}`, param);
};

export type ModerationType = {
    content: string;
    recordType: 'success' | 'fail';
    notToDoText: string;
    useYn: string;
    regDtm: string;
    notToDoId: number;
    moderationId: number;
};

export const getModerationList = (fromDate: string, toDate: string): Promise<ModerationType[]> => {
    return get(`/moderationRecord/list/fromDate/${fromDate}/toDate/${toDate}`);
};
