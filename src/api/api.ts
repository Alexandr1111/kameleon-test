import axios from "axios";

export const instance = axios.create({
    baseURL: `http://localhost:3100/`,
})

export enum Type {
    CLASSIC = "CLASSIC",
    SERVER_SIDE = "SERVER_SIDE",
    MVT = "MVT"
}

export enum Status {
    DRAFT = "DRAFT",
    ONLINE = "ONLINE",
    PAUSED = "PAUSED",
    STOPPED = "STOPPED",
}

export interface Site {
    id: number;
    url: string;
}

export interface Test {
    id: number;
    name: string;
    type: Type;
    status: Status;
    siteId: number;
}

export const api = {
    getSites() {
        return instance
            .get<Site[]>(`sites`)
            .then(res => res.data);
    },
    getSiteById(id: number) {
        return instance
            .get<Site>(`sites/${id}`)
            .then(res => res.data);
    },
    getTests() {
        return instance
            .get<Test[]>(`tests`)
            .then(res => res.data);
    },
    getTestById(id: number) {
        return instance
            .get<Test>(`tests/${id}`)
            .then(res => res.data);
    },
};