import {Test} from "../api/api";

export type TestWithUrl = Test & {url: string};

export type TSort = null | 'ASC' | 'DESC';