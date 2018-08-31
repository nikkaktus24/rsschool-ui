import axios from 'axios';

import { IEvent, IEventDocument } from '../models';

type EventPostResponse = IEventDocument;

type EventPatchResponse = {
    data: IEventDocument;
};

export function addEventApi(event: IEvent, route: string) {
    return axios.post<EventPostResponse>(`/api/${route}`, event).then(response => response.data);
}

export function updateEventApi(event: IEventDocument, route: string) {
    return axios.patch<EventPatchResponse>(`/api/${route}`, event).then(response => response.data.data);
}

export function deleteEventApi(id: string, route: string) {
    return axios.delete(`/api/${route}/${id}`);
}
