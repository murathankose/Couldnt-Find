import { ACCESS_TOKEN } from '@internship/shared/types';

export const setAccessToken = (token: string) => window.localStorage.setItem(ACCESS_TOKEN, token);

export const getAccessToken = (): string => window.localStorage.getItem(ACCESS_TOKEN);

export const removeAccessToken = () => window.localStorage.removeItem(ACCESS_TOKEN);
