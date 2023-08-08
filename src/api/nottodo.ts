import { get, post, put, deleteApi } from './core';
import { nottodoProps } from '@/recoil/nottodo/atom';

export type orderBy = 'in_close' | 'in_distant';
export const getNottodoList = async (orderby?: orderBy) => {
    const params = orderby ? `?orderBy=${orderby}` : '';
    return await get('/nottodo/list' + params);
};

export const createNottodo = async (params: nottodoProps) => {
    return await post('/nottodo', params);
};

export const editNottodo = async (nottodoId: string, params: nottodoProps) => {
    return await put(`/nottodo/${nottodoId}`, params);
};

export const deleteNottodo = async (nottodoId: string) => {
    return await deleteApi(`/nottodo/${nottodoId}`);
};
