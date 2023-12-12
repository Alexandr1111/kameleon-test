import axios from "axios";
import {UserType} from "../types/types";

export const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        "API-KEY": "97f1d028-7518-43ef-85bd-dd2bcb1ec8e1"
    }
})

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {    // надо уточнить, как Array<массив чего>
    data: D
    resultCode: RC
    messages: Array<string>
}