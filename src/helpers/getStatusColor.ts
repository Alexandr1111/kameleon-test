import {Status} from "../api/api";

export const getStatusColor = (status: Status): string => {
    const result = {
        [Status.DRAFT]: '#5C5C5C',
        [Status.ONLINE]: '#1BDA9D',
        [Status.PAUSED]: '#FF8346',
        [Status.STOPPED]: '#FE4848',
    };

    return result[status];
}